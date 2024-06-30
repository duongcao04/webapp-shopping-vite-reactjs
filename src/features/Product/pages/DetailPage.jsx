import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, useToast } from '@chakra-ui/react';

import { BsCartPlus } from 'react-icons/bs';

import productApi from '@/api/productApi';
import formatCash from '@/utils/formatCash';
import { addCart } from '@/redux/cart.reducer';

import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Tabs from '@/features/Product/components/Tabs/index.jsx';

import Start from '@/assets/images/5-star-rating.jpg';

function DetailPage() {
  const [product, setProduct] = useState({});

  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useToast();
  const locationList = location.pathname.split('/').slice(1);
  const productId = locationList[locationList.length - 1];

  useEffect(() => {
    (async () => {
      try {
        const params = {};
        const response = await productApi.getOne(productId, params);
        setProduct(response.data.elements);
      } catch (error) {
        console.log('Failed to fetch product list', error);
      }
    })();
  }, [productId]);

  const handleAddCart = (product) => {
    dispatch(addCart(product));
    toast({
      title: 'Add Sucessfully',
      description: 'Thêm sản phẩm vào giỏ hàng thành công!',
      status: 'success',
      position: 'bottom-right',
      duration: 1000,
      isClosable: true,
    });
  };
  return (
    <React.Fragment>
      <div className='mt-2 py-2'>
        <Breadcrumbs slug={product.name} />
      </div>

      <div className='container mx-auto h-full bg-white-50 pt-6 pb-16'>
        <div className='flex items-start justify-between'>
          <div className='w-[600px] h-[500px] py-4 flex items-center justify-center border-2 rounded-xl'>
            <img
              src={product.imgURL}
              alt={product.name}
              className='max-h-full'
            />
          </div>
          <div className='w-[calc(100%-650px)]'>
            <div id='product-information'>
              <h3 className='uppercase font-medium opacity-50 leading-relaxed'>
                Category
              </h3>
              <h2 className='text-2xl font-bold leading-normal my-1 text-wrap '>
                {product.name}
              </h2>
              <img src={Start} alt='star-rate' className='w-24 my-4' />
              {product.description && (
                <p className='text-base opacity-70 line-clamp-5'>
                  {product.description}
                </p>
              )}
              <p className='text-xl font-semibold text-red-500 my-3'>
                {formatCash(product.price + '')}
              </p>
              <Button
                colorScheme={'red'}
                className='flex items-center justify-center gap-3'
                px={8}
                py={6}
                mt={3}
                onClick={() => {
                  handleAddCart(product);
                }}
              >
                <BsCartPlus size={20} />
                Add to cart
              </Button>
            </div>

            <div className='w-full mt-10'>
              <Tabs productId={productId}/>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DetailPage;
