import React from 'react';
import PropTypes from 'prop-types';

BrandCarouselCard.propTypes = {
  image: PropTypes.any.isRequired,
};

function BrandCarouselCard({ image }) {
  return (
    <React.Fragment>
      <div className='border-[1px] border-white-300 max-w-fit'>
        <img
          src={image}
          width={180}
          height={100}
          className='w-[180px] h-[100px] object-cover'
        />
      </div>
    </React.Fragment>
  );
}

export default BrandCarouselCard;
