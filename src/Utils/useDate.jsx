// useDate.js (Custom Hook)
import { useState, useEffect } from 'react';

export const useDate = (timezone) => {
  const [time, setTime] = useState("");

  useEffect(() => {

    const updateTime = () => {
    const date = new Date();
    const options = {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone,  
        timeZoneName: 'short',  
      };

      const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
      setTime(formattedTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId); 
  }, [timezone]);

  return { time };
};