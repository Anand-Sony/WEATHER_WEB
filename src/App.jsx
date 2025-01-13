import { useState } from 'react';
import './App.css';

import search from "./assets/icons/search.svg";
import { useStateContext } from './context';
import { BackgroundLayout } from './Components';
import { WeatherCard, MiniCard } from './Components';

function App() {
  const [input, setInput] = useState("");
  const { weather, location, values, place, setPlace } = useStateContext(); 

  const handleSearch = () => {
    if (input.trim()) {
      setPlace(input); 
      setInput(""); 
    }
  };

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Weather</h1>

        <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
          <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />

          <input
            type="text"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSearch(); 
              }
            }}
            className='focus:outline-none w-full text-[#212121] text-lg'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </nav>

      <BackgroundLayout />

      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard 
          place={place}
          windspeed={weather?.locations?.[place]?.currentConditions?.wspd || "N/A"}
          humidity={weather?.locations?.[place]?.currentConditions?.humidity || "N/A"}
          temperature={weather?.locations?.[place]?.currentConditions?.temp || "N/A"}
          heatIndex={weather?.locations?.[place]?.currentConditions?.heatindex || "N/A"}
          iconString={weather?.locations?.[place]?.currentConditions?.icon || "N/A"}
          conditions={weather?.locations?.[place]?.currentConditions?.conditions || "N/A"}
        />

        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {values?.length > 0 ? (
            values.slice(1, 7).map((curr) => {
              return (
                <MiniCard
                  key={curr.datetimeStr}  
                  time={curr.datetimeStr}  
                  temp={curr.temp}          
                  iconString={curr.conditions}    
                />
              );
            })
          ) : (
            <p>No forecast data available.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
