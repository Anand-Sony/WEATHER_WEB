import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("");

  const fetchWeather = async () => {
    const url =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast";
    try {
      const response = await axios.get(url, {
        params: {
          aggregateHours: "24",
          location: place || "jaipur",
          contentType: "json",
          unitGroup: "metric",
          shortColumnNames: 0,
          key: import.meta.env.VITE_API_KEY,
        },
      });
      setWeather(response.data);
      setValues(response.data.locations[place]?.values || []);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (place) fetchWeather();
  }, [place]);

  return (
    <StateContext.Provider value={{ weather, setPlace, values, place }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
