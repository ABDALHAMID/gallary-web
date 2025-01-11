import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WeatherForecastStyles.css'; // Import custom CSS for styling

const WeatherForecast = ({ forecast }) => {
  const [tooltip, setTooltip] = useState({ id: null, content: '', left: 0 });

  // Group the forecast by day
  const groupedForecast = forecast.reduce((acc, curr) => {
    const date = curr.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  const showTooltip = (id, content, left) => {
    setTooltip({ id, content, left });
  };

  const hideTooltip = () => {
    setTooltip({ id: null, content: '', left: 0 });
  };

  return (
    <div className="weather-forecast-container">
      <h3>Prévisions Météo</h3>
      {Object.entries(groupedForecast).map(([date, dailyForecast], index) => (
        <div key={index} className="day-forecast">
          <h4>{date}</h4>
          <div className="time-line">
            {dailyForecast.map((forecastItem, idx) => {
              const time = new Date(forecastItem.dt_txt).getHours();
              const id = `${date}-${time}-${idx}`;
              const tooltipContent = `
                Température : ${forecastItem.main.temp}°C<br/>
                Humidité : ${forecastItem.main.humidity}%<br/>
                Vitesse du vent : ${forecastItem.wind.speed} m/s
              `;
              return (
                <div
                  key={id}
                  className="time-slot"
                  style={{ left: `${(time / 24) * 100}%` }}
                  onMouseEnter={() => showTooltip(id, tooltipContent, (time / 24) * 100)}
                  onMouseLeave={hideTooltip}
                >
                  <img
                    src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`}
                    alt={forecastItem.weather[0].description}
                    className="forecast-icon"
                  />
                  <p className="time-label">{`${time}:00`}</p>
                  {tooltip.id === id && (
                    <div className="tooltip" style={{ left: `${tooltip.left}%`, visibility: 'visible' }}>
                      <div dangerouslySetInnerHTML={{ __html: tooltip.content }}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
