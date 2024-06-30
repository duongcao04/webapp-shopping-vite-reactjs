import { FaChevronRight } from 'react-icons/fa';

import Heart from '@/assets/images/heart.png';
import ProductCard from '@/features/Product/components/ProductCard';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import productApi from '@/api/productApi';

function RecommendForYou() {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const params = { sortBy: '-createdAt', limit: 12 };
        const response = await productApi.getAll(params);
        setProductsData(response.data.elements);
      } catch (error) {
        console.log('Failed to fetch product list', error);
      }
    })();
  }, []);

  return (
    <div>
      <div className='flex items-center justify-between bg-white-50 p-4 rounded-xl w-full'>
        <div className='flex items-center justify-start gap-2'>
          <img
            src={Heart}
            alt=''
            width={40}
            height={40}
            className='w-[40px] h-[40px]'
          />
          <h2 className='font-bold text-2xl text-[#FE3AA1]'>Dành cho bạn</h2>
        </div>
      </div>

      <div className='mt-4 grid grid-cols-6 gap-4'>
        {productsData?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <div className='w-full grid place-items-center mt-10'>
        <Button className='rounded-lg bg-[hsl(331,99%,60%)] hover:bg-[hsl(331,99%,40%)]'>
          <Link
            to={'/san-pham'}
            className='w-full inline-flex items-center justify-center gap-2'
          >
            Xem thêm
            <FaChevronRight size={12} className='inline-block' />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default RecommendForYou;
