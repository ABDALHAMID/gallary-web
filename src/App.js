import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/searchBar';
import ImageGallery from './components/ImageGallery';
import WeatherInfo from './components/weatherinfo';
import axios from 'axios';

const App = () => {
  // Initialize the images state with the mock data
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('paris'); // Default search term
  
  useEffect(() => {
    fetchImages(query);
  }, [query]);


  const fetchImages = async (searchQuery) => {
    setQuery(searchQuery)
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: process.env.REACT_APP_PIXABAY_API_KEY,
          q: searchQuery,
          image_type: 'photo',
          per_page: 12
        }
      });
      setImages(response.data.hits);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value;
    setQuery(inputValue);
  };


  return ( 
    <Router> 
      <div> 
        <Header /> 
        <Routes> 
          <Route path="/" 
          element={ 
            <> 
              <SearchBar onSearch={fetchImages} /> 
              <ImageGallery images={images} loading={loading} city={query}/> 
            </> 
          } /> 
          <Route path="/weather/:city" element={<WeatherInfo />} /> 
        </Routes> 
      </div> 
    </Router> 
  );
};

export default App;
