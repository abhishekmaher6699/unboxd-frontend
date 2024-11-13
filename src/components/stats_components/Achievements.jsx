import React, {useEffect, useState} from 'react'


const achievements_to_svg = {
  'Traveller 1': { 
    src: "src/assets/obscurity.svg", 
    color: 'bg-blue-600', 
    text: "You have explored more than 25 countries" 
  },
  'Traveller 2': { 
    src: "src/assets/obscurity.svg", 
    color: 'bg-green-600', 
    text: "You have explored more than 50 countries" 
  },
  'Traveller 3': { 
    src: "src/assets/obscurity.svg", 
    color: 'bg-red-600', 
    text: "You have explored more than 100 countries" 
  },
  'Linguist 1': { 
    src: "src/assets/languages.svg", 
    color: 'bg-blue-600', 
    text: "You have explored more than 25 languages" 
  },
  'Linguist 2': { 
    src: "src/assets/languages.svg", 
    color: 'bg-green-600', 
    text: "You have explored more than 50 languages" 
  },
  'Linguist 3': { 
    src: "src/assets/languages.svg", 
    color: 'bg-red-600', 
    text: "You have explored more than 100 languages" 
  },
  'Time Traveller 1': { 
    src: "src/assets/time_traveller.svg", 
    color: 'bg-blue-600', 
    text: "You have watched movies from more than 5 decades" 
  },
  'Time Traveller 2': { 
    src: "src/assets/time_traveller.svg", 
    color: 'bg-green-600', 
    text: "You have watched movies from more than 8 decades" 
  },
  'Time Traveller 3': { 
    src: "src/assets/time_traveller.svg", 
    color: 'bg-red-600', 
    text: "You have watched movies from more than 10 decades" 
  },
  'Theme Explorer 1': { 
    src: "src/assets/lightbulb.svg", 
    color: 'bg-blue-600', 
    text: "You have explored more than 50 themes in movies" 
  },
  'Theme Explorer 2': { 
    src: "src/assets/lightbulb.svg", 
    color: 'bg-green-600', 
    text: "You have explored more than 75 themes in movies" 
  },
  'Theme Explorer 3': { 
    src: "src/assets/lightbulb.svg", 
    color: 'bg-red-600', 
    text: "You have explored more than 100 themes in movies" 
  },
  'Genre Master': { 
    src: "src/assets/genres.svg", 
    color: 'purple', 
    text: "You have watched all 20 genres" 
  },
  'Director Explorer 1': { 
    src: "src/assets/director.svg", 
    color: 'bg-blue-600', 
    text: "You have explored more than 25 directors" 
  },
  'Director Explorer 2': { 
    src: "src/assets/director.svg", 
    color: 'bg-green-600', 
    text: "You have explored more than 50 directors" 
  },
  'Director Explorer 3': { 
    src: "src/assets/director.svg", 
    color: 'bg-red-600', 
    text: "You have explored more than 100 directors" 
  },
  'Reviewer 1': { 
    src: "src/assets/reviewer.svg", 
    color: 'bg-blue-600', 
    text: "You have reviewed more than 50 movies" 
  },
  'Reviewer 2': { 
    src: "src/assets/reviewer.svg", 
    color: 'bg-green-600', 
    text: "You have reviewed more than 100 movies" 
  },
  'Reviewer 3': { 
    src: "src/assets/reviewer.svg", 
    color: 'bg-red-600', 
    text: "You have reviewed more than 200 movies" 
  },
  'Popular 1': { 
    src: "src/assets/star.svg", 
    color: 'bg-blue-600', 
    text: "You have watched more than 50 movies from the Top 250 Lb movies list" 
  },
  'Popular 2': { 
    src: "src/assets/star.svg", 
    color: 'bg-green-600', 
    text: "YYou have watched more than 100 movies from the Top 250 Lb movies list" 
  },
  'Popular 3': { 
    src: "src/assets/star.svg", 
    color: 'bg-red-600', 
    text: "You have watched all 250 movies from the Top 250 Lb movies list" 
  },
  'obscure 1': { 
    src: "src/assets/zoom_in.svg", 
    color: 'bg-blue-600', 
    text: "You have watched more than 25 movies with less than 1000 views" 
  },
  'obscure 2': { 
    src: "src/assets/zoom_in.svg", 
    color: 'bg-green-600', 
    text: "You have watched more than 25 movies with less than 1000 views" 
  },
  'obscure 3': { 
    src: "src/assets/zoom_in.svg", 
    color: 'bg-red-600', 
    text: "You have watched more than 25 movies with less than 1000 views" 
  },
  'Continent!': { 
    src: "src/assets/traveller.svg", 
    color: 'bg-blue-600', 
    text: "You have traveled to all continents!(except Antartica)" 
  }
};

function Achievements({ achievements }) {
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

  const handleMouseEnter = (event, text) => {
    const { pageX, pageY } = event;
    setTooltip({
      visible: true,
      content: text,
      x: pageX + 10, // Offset for better positioning
      y: pageY + 10
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

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
          className='text-white mt-2 px-4 py-2 text-sm bg-gray-800 rounded-lg shadow-lg whitespace-nowrap'
          style={{
            position: 'absolute',
            top: `${tooltip.y}px`,
            left: `${tooltip.x}px`,
            zIndex: 1000
          }}
        >
          {tooltip.content}
        </div>
      )}
    </>
  );
}

export default Achievements;