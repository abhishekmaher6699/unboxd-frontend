import React, { useEffect, useRef, useState, memo, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress, faDownload } from '@fortawesome/free-solid-svg-icons';
import { createRoot } from 'react-dom/client';
import Flag from 'react-world-flags';
import { COUNTRYCODES } from '../../utils/objects';

const ChoroplethMap = memo(({ data, isFullscreen = false, setIsFullscreen, onCountrySelect }) => {
  const svgRef = useRef();
  const mapRef = useRef(null);
  const tooltipRef = useRef(null);
  const geoDataRef = useRef(null);
  
  const handleDownload = useCallback(() => {
    if (!svgRef.current) return;
    const svgElement = svgRef.current;
    const svgCopy = svgElement.cloneNode(true);
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      path { transition: stroke-width 0.2s; }
    `;
    svgCopy.insertBefore(styleSheet, svgCopy.firstChild);
    
    const svgData = new XMLSerializer().serializeToString(svgCopy);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'travel-map.svg';

    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  useEffect(() => {
    const initializeMap = async () => {
      if (mapRef.current) return;
      
      const dimensions = {
        width: 800,
        height: 500
      };

      const svg = d3.select(svgRef.current)
        .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
        .style("width", "100%")
        .style("height", "auto");

      const tooltip = d3.select("body")
        .append("div")
        .attr("class", "rating_tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("display", "none")
        .style("background", "#fff")
        .style("border", "1px solid #ccc")
        .style("border-radius", "4px")
        .style("padding", "5px")
        .style("pointer-events", "none");

      const projection = d3.geoNaturalEarth1()
        .scale(160)
        .translate([dimensions.width / 2, dimensions.height / 2]);

      const path = d3.geoPath().projection(projection);

      mapRef.current = {
        svg,
        tooltip,
        path,
        dimensions,
        mapGroup: svg.append("g")
      };

      tooltipRef.current = tooltip;

      try {
        const response = await fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
        const geoData = await response.json();
        geoDataRef.current = geoData;
        updateMap();
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    };

    initializeMap();

    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.remove();
      }
      if (mapRef.current) {
        mapRef.current.svg.selectAll("*").remove();
      }
      mapRef.current = null;
      geoDataRef.current = null;
    };
  }, [isFullscreen]); 

  const updateMap = useCallback(() => {
    if (!mapRef.current || !geoDataRef.current) return;

    const { svg, path, mapGroup } = mapRef.current;
    const tooltip = tooltipRef.current;

    mapGroup.selectAll("path").remove();

    const countryMovieCounts = data.flatMap(movie => movie.countries)
      .reduce((acc, country) => {
        const code = COUNTRYCODES[country];
        acc[code] = (acc[code] || 0) + 1;
        return acc;
      }, {});

    const movieCounts = Object.values(countryMovieCounts);
    const minCount = d3.min(movieCounts) || 0;
    const maxCount = d3.max(movieCounts) || 0;
    const thresholds = d3.range(1, 6).map(i => d3.quantile(movieCounts, i / 6) || 0);

    const colorScale = d3.scaleThreshold()
      .domain([minCount, ...thresholds, maxCount])
      .range(d3.schemeBlues[7]);

    mapGroup.selectAll("path")
      .data(geoDataRef.current.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", d => {
        const countryId = d.id;
        const movieCount = countryMovieCounts[countryId];
        return movieCount ? colorScale(movieCount) : "#ccc";
      })
      .attr("stroke", "#333")
      .attr("stroke-width", 0.5)
      .on("mouseover", function(event, d) {
        const countryId = d.id;
        const movieCount = countryMovieCounts[countryId];
        d3.select(this).attr("stroke-width", 1.5);
        
        tooltip
          .style("visibility", "visible")
          .style("display", "block")
          .style("opacity", 1)
          .html(`
            <div style="display: flex; align-items: center;">
              <strong style="margin-right: 8px;">${d.properties.name}</strong>
              <span id="flag-container"></span>
            </div>
            Number of Movies: ${movieCount || 0}
          `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");

        const container = document.getElementById('flag-container');
        const root = createRoot(container);
        root.render(<Flag code={d.id} width={32} />);
      })
      .on("mousemove", function(event) {
        tooltip
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).attr("stroke-width", 0.5);
        tooltip.style("opacity", 0);
      })
      .on("click", function(event, d) {
        onCountrySelect(d.properties.name);
      });
  }, [data, onCountrySelect]);

  useEffect(() => {
    updateMap();
  }, [updateMap]);

  useEffect(() => {
    document.body.style.overflow = isFullscreen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  return (
    <div
      className={`bg-gray-50 bg-opacity-50 rounded-lg shadow-lg relative p-3 md:p-6 ${isFullscreen ? 'h-full flex flex-col items-center lg:justify-center' : ''}`}
    >
      <div className='flex w-full items-center justify-between'>
        <h3 className='text-center ml-[40%] md:ml-[45%] font-oswald text-lg text-gray-700'>Your Travel Map</h3>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="text-gray-700 p-2 hover:text-gray-900 transition-colors"
            aria-label="Download map"
          >
            <FontAwesomeIcon icon={faDownload} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(!isFullscreen);
            }}
            className="text-gray-700 p-2 hover:text-gray-900 transition-colors"
            aria-label="Toggle fullscreen"
          >
            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
          </button>
        </div>
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
});

export default ChoroplethMap;