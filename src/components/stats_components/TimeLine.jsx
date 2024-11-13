import React, { useState, useEffect } from 'react';
import { Chrono } from 'react-chrono';
import { Info } from 'lucide-react';

const Timeline = ({ monthlySummary, username }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [sortedSummary, setSortedSummary] = useState([]);

  useEffect(() => {
    if (monthlySummary && monthlySummary.length > 0) {
      const sorted = [...monthlySummary].sort((a, b) => new Date(a.time) - new Date(b.time));
      setSortedSummary(sorted);
    }
  }, [username, monthlySummary]);

  // useEffect(() => {
  //   console.log("Sorted Summary:", sortedSummary);
  // }, [sortedSummary]);

  const items = sortedSummary.map((entry) => {
    const {
      total_movies,
      most_watched_genre,
      most_watched_country,
      most_watched_director,
      most_watched_year,
      most_watched_theme,
      most_watched_language,
      most_watched_actor,
    } = entry.data;

    const cardDetailedText = `
      <ul>
        ${Object.keys(most_watched_genre).length ? `
          <li><b>Most Watched Genre</b>: 
            ${Object.entries(most_watched_genre)
              .map(([genre, count]) => `${genre} (${count})`)
              .join(', ')}
          </li>` : ''}
        
        ${Object.keys(most_watched_country).length ? `
          <li><b>Most Watched Country</b>: 
            ${Object.entries(most_watched_country)
              .map(([country, count]) => `${country} (${count})`)
              .join(', ')}
          </li>` : ''}
        
        ${Object.keys(most_watched_director).length ? `
          <li><b>Most Watched Director</b>: 
            ${Object.entries(most_watched_director)
              .map(([director, count]) => `${director} (${count})`)
              .join(', ')}
          </li>` : ''}
        
        ${Object.keys(most_watched_year).length ? `
          <li><b>Most Watched Year</b>: 
            ${Object.entries(most_watched_year)
              .map(([year, count]) => `${year} (${count})`)
              .join(', ')}
          </li>` : ''}
        
        ${Object.keys(most_watched_theme).length ? `
          <li><b>Most Watched Theme</b>: 
            ${Object.entries(most_watched_theme)
              .map(([theme, count]) => `${theme} (${count})`)
              .join(', ')}
          </li>` : ''}
        
        ${Object.keys(most_watched_language).length ? `
          <li><b>Most Watched Language</b>: 
            ${Object.entries(most_watched_language)
              .map(([lang, count]) => `${lang} (${count})`)
              .join(', ')}
          </li>` : ''}
        
        ${Object.keys(most_watched_actor).length ? `
          <li><b>Most Watched Actor</b>: 
            ${Object.entries(most_watched_actor)
              .map(([actor, count]) => `${actor} (${count})`)
              .join(', ')}
          </li>` : ''}
      </ul>
    `.trim();

    return {
      title: entry.time,
      cardTitle: `Summary for ${entry.time}`,
      cardSubtitle: `Total Movies Watched: ${total_movies}`,
      cardDetailedText: cardDetailedText,
    };
  });

  // If sortedSummary is empty, show a fallback message
  if (sortedSummary.length === 0) {
    return <div className="text-center text-gray-500">No data available</div>;
  }

  return (
    <div className='w-full flex flex-col gap-5 p-5 mt-5 bg-gray-50 bg-opacity-50 rounded-lg shadow-lg p-6'>
      <div className="relative flex justify-center items-center">
        <h3 className='font-oswald text-lg text-gray-700'>Your Monthly Watching Timeline</h3>
        <div className="absolute right-0 top-0">
          <button
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <Info className="w-4 h-4 text-gray-500" />
          </button>
          
          {showTooltip && (
            <div className="absolute z-50 right-0 top-full mt-2 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg whitespace-nowrap">
              Only rated movies are considered
              <div className="absolute top-0 right-4 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
            </div>
          )}
        </div>
      </div>

      <Chrono items={items} mode="HORIZONTAL" 
        fontSizes={{
          cardSubtitle: '0.75rem',
          cardText: '0.5rem',
          cardTitle: '0.8rem',
          title: '0.8rem',
        }}
        theme={{ primary: 'red', secondary: 'lightgray' }} 
        parseDetailsAsHTML 
        readMore={false} 
        enableOutline />
    </div>
  );
};

export default Timeline;
