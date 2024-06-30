import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PostIcon from '@/assets/images/post-icon.png';
import RelatedPostCard from '@/components/RelatedPost/RelatedPostCard';
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";

function RelatedPost() {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true
  };

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <div className="flex items-center justify-start gap-2">
          <img
            src={PostIcon}
            alt=''
            width={40}
            height={40}
            className='w-[40px] h-[40px]'
          />
          <h2 className='font-bold text-2xl text-[#D7377B]'>Thông tin bổ ích</h2>
        </div>

        <Link to={'/blog'} className='flex justify-end items-center gap-2 font-medium text-lg text-[#D7377B] opacity-70 hover:opacity-100 transition duration-200'>
          Xem thêm
          <FaChevronRight size={15} className='inline-block' />
        </Link>
      </div>

      <div className="slider-container">
        <Slider {...settings}>
          <RelatedPostCard />
          <RelatedPostCard />
          <RelatedPostCard />
          <RelatedPostCard />
          <RelatedPostCard />
          <RelatedPostCard />
        </Slider>
      </div>
    </div>
  );
}

export default RelatedPost;
