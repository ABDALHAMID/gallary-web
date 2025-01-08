import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/searchBar';
import ImageGallery from './components/ImageGallery';

const App = () => {
  // Initialize the images state with the mock data
  const [images, setImages] = useState([
    {
      id: 1,
      webformatURL: "https://pixabay.com/get/1.jpg",
      tags: "louvre, pyramid, paris",
      imageWidth: 1600,
      imageHeight: 1066,
      pageURL: "https://pixabay.com/photos/louvre-pyramid-paris-1/"
    },
    {
      id: 2,
      webformatURL: "https://pixabay.com/get/2.jpg",
      tags: "paris, france, eiffel tower",
      imageWidth: 2200,
      imageHeight: 1094,
      pageURL: "https://pixabay.com/photos/paris-france-eiffel-tower-2/"
    },
    {
      id: 3,
      webformatURL: "https://pixabay.com/get/3.jpg",
      tags: "bicycle, building, city",
      imageWidth: 2859,
      imageHeight: 4096,
      pageURL: "https://pixabay.com/photos/bicycle-building-city-3/"
    },
    {
      id: 4,
      webformatURL: "https://pixabay.com/get/4.jpg",
      tags: "paris, eiffel tower, france",
      imageWidth: 6000,
      imageHeight: 4000,
      pageURL: "https://pixabay.com/photos/paris-eiffel-tower-france-4/"
    },
    {
      id: 5,
      webformatURL: "https://pixabay.com/get/5.jpg",
      tags: "eiffel tower, paris, france",
      imageWidth: 1063,
      imageHeight: 1600,
      pageURL: "https://pixabay.com/photos/eiffel-tower-paris-france-5/"
    },
    {
      id: 6,
      webformatURL: "https://pixabay.com/get/6.jpg",
      tags: "eiffel tower, paris, france",
      imageWidth: 4601,
      imageHeight: 3067,
      pageURL: "https://pixabay.com/photos/eiffel-tower-paris-france-6/"
    }
  ]);

  // Function to fetch images (you can leave it empty for now if you're testing mock data)
  const fetchImages = async (query) => {
    console.log(`Search query: ${query}`);
    // Replace this with API call logic when ready
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
