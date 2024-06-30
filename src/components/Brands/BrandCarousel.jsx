import React from "react";
import PropTypes from 'prop-types';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import BrandCarouselCard from '@/components/Brands/BrandCarouselCard'

BrandCarousel.propTypes = {
    brandData: PropTypes.array.isRequired
};

function BrandCarousel({brandData}) {
    const settings = {
        arrows: false,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1200,
        autoplaySpeed: 1200,
        cssEase: "linear"
    };

    return (
        <React.Fragment>
            <div className="slider-container">
                <Slider {...settings}>
                    {brandData.map((brand, index) => (
                        <BrandCarouselCard key={index} image={brand}/>
                    ))}
                </Slider>
            </div>
        </React.Fragment>
    )
}

export default BrandCarousel