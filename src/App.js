import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const API_KEY = 'VOTRE_API_KEY_PIXABAY';
    const url = `https://pixabay.com/api/?q=${query}&key=${API_KEY}`;
    const response = await axios.get(url);
    setImages(response.data.hits);
  };

  return (
    <div>
      {/* Barre de navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Gallery</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
              onClick={fetchImages}
            >
              Search
            </button>
          </form>
        </div>
      </nav>

      {/* Galerie */}
      <div className="container mt-4">
        <div className="row">
          {images.map((image) => (
            <div className="col-md-4 mb-4" key={image.id}>
              <div className="card">
                <img
                  src={image.webformatURL}
                  className="card-img-top"
                  alt={image.tags}
                />
                <div className="card-body">
                  <h5 className="card-title">{image.tags}</h5>
                  <p className="card-text">
                    {image.imageWidth} x {image.imageHeight}
                  </p>
                  <a href={image.pageURL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    More Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="container">
        <nav>
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#">1</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">2</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">3</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default App;
