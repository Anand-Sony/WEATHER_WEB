import React, { useEffect, useState } from 'react';
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import storm from "../assets/icons/storm.png";
import snow from "../assets/icons/snow.png";
import wind from "../assets/icons/windy.png";

const MiniCard = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState(sun); 

  useEffect(() => {
    console.log("iconString:", iconString); 

    if (iconString) {
      const conditions = iconString.toLowerCase().split(','); 

      let selectedIcon = sun; 

      conditions.forEach((condition) => {
        if (condition.includes("cloud")) {
          selectedIcon = cloud;
        } else if (condition.includes("rain")) {
          selectedIcon = rain;
        } else if (condition.includes("clear") || condition.includes("sun")) {
          selectedIcon = sun;
        } else if (condition.includes("thunder") || condition.includes("storm")) {
          selectedIcon = storm;
        } else if (condition.includes("fog")) {
          selectedIcon = fog;
        } else if (condition.includes("snow")) {
          selectedIcon = snow;
        } else if (condition.includes("wind")) {
          selectedIcon = wind;
        }
      });

      setIcon(selectedIcon); 
    }
  }, [iconString]);

  return (
    <div className='glassCard w-[10rem] h-[10rem] p-4 flex flex-col'>
      <p className='text-center'>{new Date(time).toLocaleTimeString("en", { weekday: "long" })}</p>
      <hr />
      <div className='w-full flex justify-center items-center flex-1'>
        <img src={icon} alt="weather" className='w-[4rem] h-[4rem]' /> 
      </div>
      <p className='text-center'>{temp}&deg;C</p>
    </div>
  );
};

export default MiniCard;