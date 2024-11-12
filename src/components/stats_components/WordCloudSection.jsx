// MyWordCloud.js
import React, { useState, useEffect } from 'react';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';

const MyWordCloud = ({ data}) => {
  const [withRotation, setWithRotation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
      };

      handleResize(); // Check on mount
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const words = Object.entries(data).map(([word, weight]) => {
    return {
        text: word,
        value: weight
    };
});
 const dimensions = isMobile ? {width:300, height:300} :  {width:600, height:400} 
 const max_val = isMobile ? 50 : 100

  const fontScale = scaleLog({
    domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
    range: [10, max_val], 
  });

  const fontSizeSetter = (datum) => fontScale(datum.value);
  const fixedValueGenerator = () => 0.5;

  return (
    <div>
      <Wordcloud
        words={words}
        width={dimensions.width}
        height={dimensions.height}
        fontSize={fontSizeSetter}
        font={'Impact'}
        padding={2}
        spiral={'rectangular'}
        rotate={withRotation ? () => (Math.random() > 0.5 ? 60 : -60) : 0}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={w.text}
              fill={i % 2 === 0 ? '#00A8E8' : '#007EA7'} 
              textAnchor={'middle'}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
    </div>
  );
};

export default MyWordCloud;
