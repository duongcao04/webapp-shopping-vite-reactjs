import React from 'react';

import BrandCarousel from '@/components/Brands/BrandCarousel';

import BrandIcon from '@/assets/images/brand-icon.png';

import HappyBaby from '@/assets/images/brands/happy-baby.png';
import BeanStalk from '@/assets/images/brands/bean-stalk.png';
import Divenet from '@/assets/images/brands/divenet.png';
import Friso from '@/assets/images/brands/friso.png';
import Gerber from '@/assets/images/brands/gerber.png';
import Hipp from '@/assets/images/brands/hipp.png';
import Pigeon from '@/assets/images/brands/pigeon.png';
import Vinamilk from '@/assets/images/brands/vinamilk.png';
import HeinzForBaby from '@/assets/images/brands/heinz-for-baby.png';


function Brands() {
  const brands = [
    HappyBaby,BeanStalk,Divenet,Friso,Gerber,Hipp,Pigeon,Vinamilk,HeinzForBaby
  ]

  return (
    <React.Fragment>
      <div className='px-5 py-6 bg-white-50 rounded-xl'>
        <div className='flex items-center justify-start gap-2 mb-4'>
          <img src={BrandIcon} alt="" width={40} height={40} className='w-[40px] h-[40px]'/>
          <h2 className='font-bold text-2xl text-[#FFAE35]'>Thương hiệu</h2>
        </div>
        <BrandCarousel brandData={brands}/>
      </div>
    </React.Fragment>
  );
}

export default Brands;
