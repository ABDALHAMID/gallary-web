import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';   
import WeatherForecast from './WeatherForecast';
import './style.css'

const WeatherInfo = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [city]);
  
  const fetchCityImages = async (city) => {
    try {
      const response = await axios.get(`https://pixabay.com/api/`, {
        params: {
          key: process.env.REACT_APP_PIXABAY_API_KEY,
          q: city,
          image_type: 'photo',
        },
      });
      return response.data.hits;
    } catch (error) {
      console.error('Error fetching city images:', error);
    }
  };

  const fetchWeatherForecast = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          q: city,
          appid: process.env.REACT_APP_WEATHER_API_KEY,
          units: 'metric',
        },
      });
      return response.data.list;
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: process.env.REACT_APP_WEATHER_API_KEY,
          units: 'metric',
        },
      });
      setWeather(weatherResponse.data);

      const forecastResponse = await fetchWeatherForecast(city);
      setForecast(forecastResponse);

      const imagesResponse = await fetchCityImages(city);
      setImages(imagesResponse);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          {weather ? (
            <>
              <Row>
                <Col>
                  <h2>Météo à {city}</h2>
                </Col>
                <Col>
                  <img 
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
                    className="weather-icon" 
                    alt="Icône météo" 
                    width={60} 
                    height={60} 
                  />
                </Col>
              </Row >
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>Température</td>
                    <td>{weather.main.temp}°C</td>
                  </tr>
                  <tr>
                    <td>Température ressentie</td>
                    <td>{weather.main.feels_like}°C</td>
                  </tr>
                  <tr>
                    <td>Météo</td>
                    <td>{weather.weather[0].description}</td>
                  </tr>
                  <tr>
                    <td>Humidité</td>
                    <td>{weather.main.humidity}%</td>
                  </tr>
                  <tr>
                    <td>Vitesse du vent</td>
                    <td>{weather.wind.speed} m/s</td>
                  </tr>
                  <tr>
                    <td>Nuageux</td>
                    <td>{weather.clouds.all}%</td>
                  </tr>
                  <tr>
                    <td>Visibilité</td>
                    <td>{weather.visibility} mètres</td>
                  </tr>
                  <tr>
                    <td>Pression</td>
                    <td>{weather.main.pressure} hPa</td>
                  </tr>
                  <tr>
                    <td>Lever du soleil</td>
                    <td>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</td>
                  </tr>
                  <tr>
                    <td>Coucher du soleil</td>
                    <td>{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</td>
                  </tr>
                  <tr>
                    <td>Latitude</td>
                    <td>{weather.coord.lat}°</td>
                  </tr>
                  <tr>
                    <td>Longitude</td>
                    <td>{weather.coord.lon}°</td>
                  </tr>
                </tbody>
              </Table>
            </>
          ) : (
            <p>Loading weather information...</p>
          )}
        </Col>
        <Col md={6}>
          <h3>Images de {city}</h3>
          <div className="carousel-container">
            <Carousel showArrows autoPlay infiniteLoop>
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image.webformatURL} alt={city} />
                </div>
              ))}
            </Carousel>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <WeatherForecast forecast={forecast} />
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherInfo;
