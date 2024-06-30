import React from 'react';
import PropTypes from 'prop-types';
import { BsCartPlus } from 'react-icons/bs';

import Start from '@/assets/images/5-star-rating.jpg';
import formatCash from '@/utils/formatCash';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCart } from '@/redux/cart.reducer';
import { useToast } from '@chakra-ui/react';

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddCart = (product) => {
    dispatch(addCart(product));
    toast({
      title: 'Add Sucessfully',
      description: "Thêm sản phẩm vào giỏ hàng thành công!",
      status: 'success',
      position: 'bottom-right',
      duration: 1000,
      isClosable: true,
    });
  };
  return (
    <React.Fragment>
      <div className='w-full rounded-lg bg-white-50 p-4 shadow-sm hover:shadow-xl duration-200 transition-shadow'>
        <Link to={`/san-pham/${product._id}`} className='group block'>
          <img
            src={product.imgURL}
            alt={product.name}
            className='group-hover:scale-105 group-hover:opacity-70 overflow-hidden duration-200 transition h-[170px] mx-auto'
          />
        </Link>
        <Link
          to={`/san-pham/${product._id}`}
          className='line-clamp-2 my-3 min-h-[40px] hover:text-red-600 transition-colors duration-200'
        >
          {product.name}
        </Link>
        <div className='flex justify-between items-center w-full my-2'>
          <img src={Start} alt='star-rate' className='w-[90px]' />
          <span className='text-xs opacity-90'>Đã bán 100K+</span>
        </div>
        <div className='flex items-center justify-between pl-1'>
          <p className='text-xl font-semibold'>
            {formatCash(product.price + '')}
          </p>
          <button
            className='bg-white-300 hover:bg-white-400 duration-200 transition p-1 rounded-full'
            onClick={() => {
              handleAddCart(product);
            }}
          >
            <BsCartPlus size={25} />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductCard;
