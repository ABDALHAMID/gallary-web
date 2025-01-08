import React from 'react';

const ImageCard = ({ image }) => {
  return (
    <div className="card">
      <img src={image.webformatURL} className="card-img-top" alt={image.tags} />
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
  );
};

export default ImageCard;
