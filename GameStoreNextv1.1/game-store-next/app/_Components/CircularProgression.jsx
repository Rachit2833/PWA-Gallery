import React, { useEffect, useState, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgression = ({ value, title }) => {
   const [percentage, setPercentage] = useState(0);
   const containerRef = useRef(null);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  const interval = setInterval(() => {
                     setPercentage((prev) => {
                        if (prev < value) {
                           return prev + 1;
                        }
                        clearInterval(interval);
                        return prev;
                     });
                  }, 10); // Adjust the interval timing as needed
               }
            });
         },
         { threshold: 0.5 } // Change the threshold value as per your requirements
      );

      if (containerRef.current) {
         observer.observe(containerRef.current);
      }

      return () => {
         if (containerRef.current) {
            observer.unobserve(containerRef.current);
         }
      };
   }, [value]);

   return (
      <div ref={containerRef} className="m-10">
         <div className="text-3xl mb-2">{title}</div>
         <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
               pathColor: ' #7380ec',
            })}
         />
      </div>
   );
};

export default CircularProgression;