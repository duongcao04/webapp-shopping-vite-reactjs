import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ExBanner1 from '@/assets/images/carousel/carousel-1.png';
import ExBanner2 from '@/assets/images/carousel/carousel-2.png';
import ExBanner3 from '@/assets/images/carousel/carousel-3.png';
import ExBanner4 from '@/assets/images/carousel/carousel-4.png';

import BannerCarouselCard from '@/components/BannerCarousel/BannerCarouselCard';

function Carousel() {
	const banners = [ExBanner1, ExBanner2, ExBanner3, ExBanner4];
	return (
		<React.Fragment>
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				navigation
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
			>
				{banners?.map((banner, index) => (
					<SwiperSlide key={index}>
						<BannerCarouselCard image={banner} />
					</SwiperSlide>
				))}
			</Swiper>
		</React.Fragment>
	);
}

export default Carousel;
