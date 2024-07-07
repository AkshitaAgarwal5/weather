import React, { useEffect} from 'react'
import TopButtons from './components/TopButtons'
import Inputss from './components/Inputss'
import TimeandLocation from './components/TimeandLocation'
import TempandDetails from './components/TempandDetails'
import Forecast from './components/Forecast'
import getWeatherData from './services/weatherServices'
import getFormattedWeatherData from './services/weatherServices'
import { useState } from 'react'


const App = () => {
  const[query,setQuery]=useState({q:"dehradun"});
  const[units,setUnits] =useState("metric");
  const[weather,setWeather]=useState(null);

  const getWeather=async()=>{
    await getFormattedWeatherData({...query,units}).then((data)=>{
      setWeather(data);
    });

  };
  useEffect(()=>{
    getWeather();
  },[query,units]);

  const formatBackground=()=>{
    if(!weather) return "from-cyan-600 to-blue-700";
    const threshold =units==="metric" ? 20:60;
    if(weather.temp<=threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  };

  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 
    from-cyan-600 to-blue-700 ${formatBackground()} `}>
      <TopButtons setQuery={setQuery}/>
      <Inputss setQuery={setQuery} setUnits={setUnits}/>
      {weather && (
        <>
        <TimeandLocation weather={weather}/>
      <TempandDetails weather={weather}/>
      <Forecast title="3 hour step forecast" data={weather.hourly}/>
      <Forecast title="daily forecast" data={weather.daily}/> 
      </>
      )}
      
    </div>
  );
};

export default App;
