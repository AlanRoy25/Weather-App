
import React from 'react';
import './WeatherApp.css'

import search_icon from "../assets/search-interface-symbol.png";
import cloud_icon from "../assets/cloudy.png";
import rainy_icon from "../assets/rainy.png";
import snow_icon from "../assets/snow.png";
import sunrise_icon from '../assets/sunrise.png';
import sunset_0icon from '../assets/sunset.png';
import thunderstorm_icon from '../assets/thunderstorm.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';



const WeatherApp = () => {
  
  const search = () => {
    const element = document.getElementsByClassName("cityinput");
    if(element[0].value===""){
      return alert("Enter the city name");
    }
    else{
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=c3ff9aa2a17b6a476a93c6d49d1d06e0`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName(humidity-percent);
    const wind = document.getElementsByClassName(Wind-rate);

  };


return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className='cityinput' placeholder="Enter city name"/>  
      <button className='search'onClick={()=>{search()}}> <img src={search_icon} alt="search" className='search-icon' /> </button>
    </div>
    <div className="weather-image">
      <img src={cloud_icon} alt='' className='cloud-icon' />
    </div>
    <div className="weather-temp"> 24°C</div>
    <div className="weather-location"> London </div>
    <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className='icon' />
          <div className="data">
            <div className="humidity-percent"> 64%</div>
            <div className="text"> Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className='icon' />
          <div className="data">
            <div className="Wind-rate"> 15km/hr</div>
            <div className="text"> Wind Speed </div>
          </div>
        </div>
      </div>
      </div>
     
      

  
  );
};

export default WeatherApp;
