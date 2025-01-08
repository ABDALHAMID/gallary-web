import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  const fetchWeather = async () => {
    const API_KEY = 'VOTRE_API_KEY_OPENWEATHER';
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}`;
    const response = await axios.get(url);
    setWeather(response.data);
  };

  return (
    <div>
      <h2>Météo</h2>
      <input
        type="text"
        placeholder="Ville"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Afficher la météo</button>
      {weather && (
        <div>
          <h3>Prévisions pour {weather.city.name}</h3>
          {weather.list.slice(0, 5).map((forecast, index) => (
            <div key={index}>
              <p>{forecast.dt_txt}</p>
              <p>{forecast.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
