import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';   
import './style.css'




const WeatherInfo = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
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
      //   setImages(response.data.hits)
      return response.data.hits;
    } catch (error) {
      console.error('Error fetching city images:', error);
    }
  };


  const fetchData = async () => {
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: process.env.REACT_APP_WEATHER_API_KEY,
          units: 'metric',
        },
      });
      console.log(weatherResponse.data); // Log the response data 
      setWeather(weatherResponse.data);

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
          <h2>Weather in {city}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather icon" />
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </Col>
        <Col md={6}>
          <h3>Images of {city}</h3>
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
    </Container>
  );
  
};

export default WeatherInfo;
