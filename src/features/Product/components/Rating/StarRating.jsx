import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { Radio, HStack, Box } from '@chakra-ui/react';

StarRating.propTypes = {
  rating: PropTypes.number,
  setRating: PropTypes.func,
  count: PropTypes.number,
  size: PropTypes.number
};

export default function StarRating({ rating, setRating, count, size }) {
  const [hover, setHover] = useState(null);
  return (
    <React.Fragment>
      <HStack spacing={'2px'}>
        {[...Array(count || 5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <Box
              as='label'
              key={index}
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            >
              <Radio
                name='rating'
                onChange={() => setRating(ratingValue)}
                value={ratingValue}
                display={'none'}
              ></Radio>
              <FaStar
                cursor={'pointer'}
                size={size || 35}
                transition='color 200ms'
              />
            </Box>
          );
        })}
      </HStack>
    </React.Fragment>
  );
}
