import React from 'react'

import PropTypes from 'prop-types';

function BannerCarouselCard({image}) {
  return (
	<React.Fragment>
		<img src={image} width={1440} height={350} className='w-[1440px] h-[350px] object-cover mx-auto rounded-xl'/>
	</React.Fragment>
  )
}

BannerCarouselCard.propTypes = {
	image: PropTypes.any.isRequired
};

export default BannerCarouselCard