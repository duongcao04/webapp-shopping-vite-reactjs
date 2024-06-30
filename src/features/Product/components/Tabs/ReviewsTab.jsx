import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { Button, Textarea, Tooltip, useToast } from '@chakra-ui/react';

import { FaSortAmountDown } from 'react-icons/fa';
import { FaSortAmountDownAlt } from 'react-icons/fa';
import StarRating from '@/features/Product/components/Rating/StarRating';
import reviewApi from '@/api/reviewApi';
import ReviewCard from '@/features/Product/components/ReviewCard';

ReviewsTab.propTypes = {
  productId: PropTypes.string.isRequired,
};

function ReviewsTab({ productId }) {
  const toast = useToast();
  const [sortNewest, setSortNewest] = useState(true);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewData, setReviewData] = useState([]);

  const user = useSelector((state) => state.auth?.userInfo);

  const fetchData = async () => {
    try {
      const params = { productId: productId, sortBy: sortNewest ? '-createdAt' : 'createdAt' };
      const res = await reviewApi.getAllReview(params);
      setReviewData(res.data?.elements);
      setIsLoading(false);
    } catch (error) {
      console.log('Failed to fetch product list', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortNewest]);

  const handleReviewed = async () => {
    if (user) {
      const newReview = {
        user_id: user?._id,
        product_id: productId,
        rating: rating ?? 5,
        comment: comment,
      };
      setComment('');
      setRating(0);
      await reviewApi.createNewReview(newReview);
      fetchData();
      toast({
        title: 'Thành công',
        description: 'Đánh giá sản phẩm thành công',
        status: 'success',
        colorScheme: 'grreen',
        position: 'bottom-right',
        duration: 1000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Đã xảy ra lỗi',
        description: 'Vui lòng đăng nhập trước khi đánh giá sản phẩm',
        status: 'error',
        colorScheme: 'red',
        position: 'bottom-right',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <React.Fragment>
      <div className='flex items-center justify-between gap-10'>
        <p className='font-bold text-xl my-5'>{reviewData.length} lượt đánh giá</p>
        <Tooltip placement='left' label={sortNewest ? 'Mới nhất' : 'Cũ nhất'}>
          <Button
            className='flex items-center justify-start gap-3'
            onClick={() => {
              setSortNewest(!sortNewest);
            }}
          >
            {sortNewest && <FaSortAmountDownAlt />}
            {!sortNewest && <FaSortAmountDown />}
          </Button>
        </Tooltip>
      </div>

      <div className='mt-2'>
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-start justify-start gap-7'>
            <div className='border-2 border-yellow-400 rounded-full p-[1px]'>
              <img
                src={user?.avatar}
                alt={user?.fullName}
                className='size-[50px] rounded-full'
              />
            </div>
            <div className='mt-2'>
              <StarRating rating={rating} setRating={setRating} />
            </div>
          </div>
          {comment && (
            <div className='flex items-center justify-end gap-2'>
              <Button
                className='rounded-lg'
                variant='ghost'
                onClick={() => setComment('')}
              >
                Huỷ
              </Button>
              <Button
                className='rounded-lg'
                colorScheme={'blue'}
                onClick={() => {
                  handleReviewed();
                }}
              >
                Đánh giá
              </Button>
            </div>
          )}
        </div>
        <Textarea
          placeholder={'Đánh giá của bạn ...'}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {isLoading && <h1>Loading...</h1>}
        {!isLoading && <div className='mt-12'>
          {reviewData?.map((item, index) => (
            <ReviewCard review={item} key={index} />
          ))}
        </div>}
      </div>
    </React.Fragment>
  );
}

export default ReviewsTab;
