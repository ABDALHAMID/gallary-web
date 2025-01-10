import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/searchBar';
import ImageGallery from './components/ImageGallery';
import axios from 'axios';

const App = () => {
  // Initialize the images state with the mock data
  const [images, setImages] = useState([]);

  
  useEffect(() => {
    fetchImages();
  }, []);

  // Function to fetch images (you can leave it empty for now if you're testing mock data)
  const fetchImages = async (query) => {
    try {
      const response = await axios.get(`http://localhost:5000/images`, {
        params: {
          q: query
        }
      });
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };



  return (
    <div>
      <Header />
      <SearchBar onSearch={fetchImages} />
      <ImageGallery images={images} />
    </div>
  );
};

export default App;
