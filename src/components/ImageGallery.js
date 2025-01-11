import React from 'react';
import ImageCard from './ImageCard';

const ImageGallery = ({ images, loading, city }) => {

  return (
    <div className="container">
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div className="row">
          {images.map((image) => (
            <div key={image.id} className="col-md-4 mb-4">
              <ImageCard image={image} city={city}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
