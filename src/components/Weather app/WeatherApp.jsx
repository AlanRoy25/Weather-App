import React, { useState, useEffect } from 'react';
import './WeatherApp.css';

import search_icon from "../assets/search-interface-symbol.png";
import default_icon from "../assets/cloud.png";
import cloudy_icon from "../assets/cloudy.png";
import rainy_icon from "../assets/rainy.png";
import snow_icon from "../assets/snow.png";
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
import drizzle_icon from '../assets/drizzle.png';
import thunderstorm_icon from '../assets/thunderstorm.png';

const WeatherApp = () => {
  const [wicon, setWicon] = useState('');

    const fetchData = async () => {
      const element = document.getElementsByClassName("cityinput");
      if (element[0].value === "") {
        alert("Enter the city name");
        return;
      }

      try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=c3ff9aa2a17b6a476a93c6d49d1d06e0`);

        let data = await response.json();

        displayWeatherData(data);
        displayWeatherIcon(data);
      } catch (error) {
        console.log("Error in fetching the data", error);
      }
    };

    const search = () => {
      fetchData();
    };
    useEffect(() => {
      fetchData();
    }, []);
 
  function displayWeatherData(data) {
    const humidity = document.getElementsByClassName('humidity-percent');
    const wind = document.getElementsByClassName('Wind-rate');
    const temperature = document.getElementsByClassName('weather-temp');
    const location = document.getElementsByClassName('weather-location');

    humidity[0].innerHTML = Math.floor(data.main.humidity) + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/Hr";
    location[0].innerHTML = data.name;

    const temperatureKelvin = data.main.temp;
    const temperatureCelsius = KelvintoCelsius(temperatureKelvin);
    temperature[0].innerHTML = Math.floor(temperatureCelsius.toFixed(2)) + " °C";

    console.log(`Temperature in celsius: ${temperatureCelsius.toFixed(2)}°C`);

    displayWeatherIcon(data, temperatureCelsius)
  }

    function displayWeatherIcon(data){
      const temperatureKelvin = data.main.temp;
      const temperatureCelsius = KelvintoCelsius(temperatureKelvin);

      if (temperatureCelsius <=10){
        setWicon(snow_icon);
      }
      else if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
        setWicon(cloudy_icon);
      } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
        setWicon(rainy_icon);
      } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
        setWicon(snow_icon);
      } else if (data.weather[0].icon === '11d' || data.weather[0].icon === '11n') {
        setWicon(thunderstorm_icon);
      } else {
        setWicon(default_icon);
      }
    } 
  

  function KelvintoCelsius(kelvin) {
    const celsius = kelvin - 273;
    return celsius;
  }

  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className='cityinput' placeholder="Enter city name" />
        <button className='search' onClick={() => {search()}}> <img src={search_icon} alt="search" className='search-icon' /> </button>
      </div>
      <div className="weather-image">
        <img src={wicon} alt='' className='cloud-icon' />
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
