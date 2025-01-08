import React, { useState } from 'react';
import axios from 'axios';

const ImageSearch = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');

  const fetchImages = async () => {
    const API_KEY = 'VOTRE_API_KEY_PIXABAY';
    const url = `https://pixabay.com/api/?q=${query}&key=${API_KEY}`;
    const response = await axios.get(url);
    setImages(response.data.hits);
  };

  return (
    <div>
      <h2>Recherche d'images</h2>
      <input
        type="text"
        placeholder="Mot-clé"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchImages}>Rechercher</button>
      <div>
        {images.map((image) => (
          <img key={image.id} src={image.webformatURL} alt={image.tags} />
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
