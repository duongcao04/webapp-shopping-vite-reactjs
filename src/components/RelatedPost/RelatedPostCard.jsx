import React from 'react'
import PostImage1 from '@/assets/images/post/image-1.webp'
import { FaChevronRight } from 'react-icons/fa6'
import { FaRegEye } from "react-icons/fa";

function RelatedPostCard() {
  return (
	<React.Fragment>
    <div style={{backgroundImage: "url('./src/assets/images/frames/frame-2.png')"}} className='w-[270px] h-[260px] px-3 pt-4 pb-2'>
      <img src={PostImage1} alt="" className='w-[250px] h-[145px] object-cover rounded-lg'/>
      <p className='text-sm font-medium my-2'>Phân biệt tã Merries nội địa và nhập khẩu</p>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-2'>
          <FaRegEye size={15}/>
          <span className='text-xs font-bold'>100</span>
        </div>
        <button className='bg-white-300 hover:bg-white-400 transition duration-200 p-1 rounded-full'><FaChevronRight size={17}/></button>
      </div>
    </div>
  </React.Fragment>
  )
}

export default RelatedPostCard