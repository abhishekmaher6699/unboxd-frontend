import React, { useState, useCallback } from 'react';

const achievements_to_svg = {
  'Traveller 1': { 
    src: '/assets/obscurity.svg', 
    color: 'bg-blue-600', 
    text: "You have explored more than 25 countries" 
  },
  'Traveller 2': { 
    src: '/assets/obscurity.svg', 
    color: 'bg-green-600', 
    text: "You have explored more than 50 countries" 
  },
  'Traveller 3': { 
    src: '/assets/obscurity.svg', 
    color: 'bg-red-600', 
    text: "You have explored more than 100 countries" 
  },
  'Linguist 1': { 
    src: '/assets/languages.svg', 
    color: 'bg-blue-600', 
    text: "You have explored more than 25 languages" 
  },
  'Linguist 2': { 
    src: '/assets/languages.svg', 
    color: 'bg-green-600', 
    text: "You have explored more than 50 languages" 
  },
  'Linguist 3': { 
    src: '/assets/languages.svg', 
    color: 'bg-red-600', 
    text: "You have explored more than 100 languages" 
  },
  'Time Traveller 1': { 
    src: '/assets/time_traveller.svg', 
    color: 'bg-blue-600', 
    text: "You have watched movies from more than 5 decades" 
  },
  'Time Traveller 2': { 
    src: '/assets/time_traveller.svg', 
    color: 'bg-green-600', 
    text: "You have watched movies from more than 8 decades" 
  },
  'Time Traveller 3': { 
    src: '/assets/time_traveller.svg', 
    color: 'bg-red-600', 
    text: "You have watched movies from more than 10 decades" 
  },
  'Theme Explorer 1': { 
    src: '/assets/lightbulb.svg', 
    color: 'bg-blue-600', 
    text: "You have explored more than 50 themes in movies" 
  },
  'Theme Explorer 2': { 
    src: '/assets/lightbulb.svg', 
    color: 'bg-green-600', 
    text: "You have explored more than 75 themes in movies" 
  },
  'Theme Explorer 3': { 
    src: '/assets/lightbulb.svg', 
    color: 'bg-red-600', 
    text: "You have explored more than 100 themes in movies" 
  },
  'Genre Master': { 
    src: '/assets/genres.svg', 
    color: 'bg-purple-600', 
    text: "You have watched all 20 genres" 
  },
  'Director Explorer 1': { 
    src: '/assets/director.svg', 
    color: 'bg-blue-600', 
    text: "You have explored more than 25 directors" 
  },
  'Director Explorer 2': { 
    src: '/assets/director.svg', 
    color: 'bg-green-600', 
    text: "You have explored more than 50 directors" 
  },
  'Director Explorer 3': { 
    src: '/assets/director.svg', 
    color: 'bg-red-600', 
    text: "You have explored more than 100 directors" 
  },
  'Reviewer 1': { 
    src: '/assets/reviewer.svg', 
    color: 'bg-blue-600', 
    text: "You have reviewed more than 50 movies" 
  },
  'Reviewer 2': { 
    src: '/assets/reviewer.svg', 
    color: 'bg-green-600', 
    text: "You have reviewed more than 100 movies" 
  },
  'Reviewer 3': { 
    src: '/assets/reviewer.svg', 
    color: 'bg-red-600', 
    text: "You have reviewed more than 200 movies" 
  },
  'Popular 1': { 
    src: '/assets/star.svg', 
    color: 'bg-blue-600', 
    text: "You have watched more than 50 movies from the Top 250 list" 
  },
  'Popular 2': { 
    src: '/assets/star.svg', 
    color: 'bg-green-600', 
    text: "You have watched more than 100 movies from the Top 250 list" 
  },
  'Popular 3': { 
    src: '/assets/star.svg', 
    color: 'bg-red-600', 
    text: "You have watched all 250 movies from the Top 250 list" 
  },
  'Obscure 1': { 
    src: '/assets/zoom_in.svg', 
    color: 'bg-blue-600', 
    text: "You have watched more than 25 movies with less than 1000 views" 
  },
  'Obscure 2': { 
    src: '/assets/zoom_in.svg', 
    color: 'bg-green-600', 
    text: "You have watched more than 50 movies with less than 1000 views" 
  },
  'Obscure 3': { 
    src: '/assets/zoom_in.svg', 
    color: 'bg-red-600', 
    text: "You have watched more than 100 movies with less than 1000 views" 
  },
  'Continent!': { 
    src: '/assets/traveller.svg', 
    color: 'bg-blue-600', 
    text: "You have traveled to all continents (except Antarctica)" 
  }
};

function Achievements({ achievements }) {
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
  const TOOLTIP_WIDTH = 250

  const calculateTooltipPosition = useCallback((event) => {
    const { pageX, pageY } = event;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const tooltipHeight = 40;

    let x = pageX + 10;
    let y = pageY + 10;

    if (x + TOOLTIP_WIDTH > viewportWidth) {
      x = pageX - TOOLTIP_WIDTH - 10;
    }

    if (y + tooltipHeight > viewportHeight) {
      y = pageY - tooltipHeight - 10;
    }

    if (x < 0) x = 10;

    if (y < 0) y = 10;

    return { x, y };
  }, []);

 const handleMouseEnter = useCallback((event, text) => {
    const position = calculateTooltipPosition(event);
    setTooltip({
      visible: true,
      content: text,
      x: position.x,
      y: position.y
    });
  }, [calculateTooltipPosition]);

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <>
      <div className='bg-slate-600 bg-opacity-30 px-5 md:px-8 pt-5 pb-5 w-full md:w-[80%] lg:w-[50%] rounded-md flex flex-col gap-4 md:gap-5'>
        <h2 className='text-white font-oswald text-lg text-xl'>Achievements</h2>

        <div className='flex gap-5 overflow-x-auto scrollbar-thin scrollbar-none relative'>
          {achievements.map((achievement, index) => {
            const { src, color, text } = achievements_to_svg[achievement] || {};
            return (
              src && (
                <div
                  key={index}
                  className='shrink-0 w-20 md:w-24 flex flex-col items-center group relative'
                  onMouseEnter={(e) => handleMouseEnter(e, text)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={`${color} p-3 rounded-full flex items-center justify-center hover:shadow-2xl`}>
                    <img
                      className='md:h-6 md:w-6'
                      src={src}
                      alt={achievement}
                    />
                  </div>
                  <span className='text-white text-sm md:text-md font-oswald mt-2 text-center'>
                    {achievement}
                  </span>
                </div>
              )
            );
          })}
        </div>
      </div>

 {tooltip.visible && (
        <div
          className='fixed text-white mt-2 px-4 py-2 text-sm bg-gray-800 rounded-lg shadow-lg pointer-events-none'
          style={{
            position: 'absolute',
            top: `${tooltip.y}px`,
            left: `${tooltip.x}px`,
            zIndex: 1000,
            width: `${TOOLTIP_WIDTH}px`,
          }}
        >
          <p className='break-words'>{tooltip.content}</p>
        </div>
      )}
    </>
  );
}

export default Achievements;