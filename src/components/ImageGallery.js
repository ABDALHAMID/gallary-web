import React from 'react';
import ImageCard from './ImageCard';

const ImageGallery = ({ images }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {images.map((image) => (
          <div className="col-md-4 mb-4" key={image.id}>
            <ImageCard image={image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
