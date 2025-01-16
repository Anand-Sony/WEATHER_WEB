import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context';

import Clear from "../assets/images/Clear.jpg";
import Cloudy from "../assets/images/Cloudy.jpg";
import Fog from "../assets/images/Fog.png";
import Rainy from "../assets/images/Rainy.jpg";
import Snow from "../assets/images/Snow.jpg";
import Stormy from "../assets/images/Stormy.jpg";
import Sunny from "../assets/images/Sunny.jpg";

const BackgroundLayout = () => {
  const { weather, place } = useStateContext();
  const [image, setImage] = useState(Sunny); 

  useEffect(() => {

    console.log("Place:", place);
    console.log("Weather Data:", weather);


    if (place && weather?.locations?.[place]?.currentConditions) {
      const currentConditions = weather.locations[place].currentConditions;
      console.log("Current weather conditions:", currentConditions); 


      let conditions = "sunny"; 

      if (currentConditions.preciptype) {
        if (currentConditions.preciptype.toLowerCase().includes("rain")) {
          conditions = "rain";
        } else if (currentConditions.preciptype.toLowerCase().includes("snow")) {
          conditions = "snow";
        }
      }

      if (currentConditions.wspd > 15) {
        conditions = "storm"; 
      } else if (currentConditions.visibility < 5) {
        conditions = "fog"; 
      }

      
      if (conditions.includes("clear") || conditions.includes("sunny")) {
        setImage(Clear);
      } else if (conditions.includes("cloudy")) {
        setImage(Cloudy);
      } else if (conditions.includes("rain")) {
        setImage(Rainy);
      } else if (conditions.includes("snow")) {
        setImage(Snow);
      } else if (conditions.includes("fog")) {
        setImage(Fog);
      } else if (conditions.includes("storm")) {
        setImage(Stormy);
      } else {
        setImage(Sunny); 
      }
    } else {
      console.log("Weather data or place not available.");
      setImage(Sunny); // Fallback to Sunny background if no weather data is available
    }
  }, [place, weather]); 

  return (
    <img
      src={image}
      alt="weather-background"
      className="h-screen w-full fixed left-0 top-0 -z-10 object-cover"
    />
  );
};

export default BackgroundLayout;
