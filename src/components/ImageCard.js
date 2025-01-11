import React from 'react';
import { Link } from 'react-router-dom';

const ImageCard = ({ image, city }) => {
  


  return (
    <div className="card">
      <img src={image.webformatURL} className="card-img-top" alt={image.tags} width={400} height={300} />
      <div className="card-body">
        <h5 className="card-title">{image.tags}</h5>
        <p className="card-text">
          {image.imageWidth} x {image.imageHeight}
        </p>
        <Link to={`/weather/${city}`} className="btn btn-primary">
          More Details
        </Link>
      </div>
    </div>
  );
};

export default ImageCard;
