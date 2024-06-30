import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FaChevronLeft } from 'react-icons/fa';

import { shortDateFormat } from '@/utils/formatDate';
import formatCash from '@/utils/formatCash';
import { Button } from '@chakra-ui/react';
import formatNumber from '@/utils/formatNumber';

HistoryOrderCard.propTypes = {
  data: PropTypes.object.isRequired,
};

function HistoryOrderCard({ data }) {
  const [showUserInfor, setShowUserInfor] = useState(false);

  return (
    <React.Fragment>
      <div className='bg-white-50 px-6 py-5 rounded-sm shadow-sm border-[1px] border-white-400'>
        <div className='flex items-center justify-between px-2'>
          <div className='flex items-center justify-start gap-2'>
            <p>Đơn hàng:</p>
            <p className='text-blue-500 font-semibold'>{'#' + data._id}</p>
          </div>

          <div className='flex items-center justify-end gap-3 divide-x-[1px] divide-white-400'>
            <p className='font-bold text-red-500'>
              {shortDateFormat(data.createdAt)}
            </p>
            <p className={`${data.orderStatus === 'Đang xử lý' ? 'text-yellow-600' : 'text-blue-600'} uppercase font-bold pl-2`}>
              {data.orderStatus}
            </p>
          </div>
        </div>
        <div className='border-t-[1px] border-white-400 mt-3 bg-white-100'>
          <div
            className='flex items-center justify-between pt-3 pb-3 px-2 cursor-pointer'
            onClick={() => setShowUserInfor(!showUserInfor)}
          >
            <p className='font-semibold'>Thông tin mua hàng</p>
            <Button
              size={'sm'}
              px={1}
              py={1}
              onClick={() => setShowUserInfor(!showUserInfor)}
            >
              <FaChevronLeft
                size={15}
                className={`${
                  showUserInfor && '-rotate-90'
                } transition duration-200`}
              />
            </Button>
          </div>
          {showUserInfor && (
            <div className='pb-5'>
              <div className='ml-6 pl-4 border-l-2 border-white-400 flex items-start gap-36'>
                <div>
                  <p>{data.information.name}</p>
                  <p className='text-sm opacity-70 mt-1'>
                    {data.information.email}
                  </p>
                  <p className='text-sm opacity-70 mt-1'>
                    {data.information.phoneNumber}
                  </p>
                  <p className='text-sm opacity-70 mt-1'>
                    {data.information.address}
                  </p>
                </div>
                {data.information.note && (
                  <div>
                    <p>Ghi chú đơn hàng: </p>
                    <p className='text-sm opacity-70 mt-2 ml-2 border-l-2 pl-4'>{`" ${data.information.note} "`}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className='border-t-[1px] border-white-400'>
          {data.orderDetail?.productList?.map((product, index) => (
            <div
              key={index}
              className='flex items-center justify-between py-5 border-b-[1px] border-white-400'
            >
              <div className='flex items-start justify-start gap-4'>
                <div className='border-[1px] p-2 rounded-md bg-white-100 shadow-sm'>
                  <img
                    src={product.imgURL}
                    alt={product.name}
                    className='size-[80px] object-contain'
                  />
                </div>
                <div>
                  <p className='text-lg'>{product.name}</p>
                  <p className='mt-2'>
                    Số lượng:{' '}
                    <span className='font-semibold'>x{product.quantity}</span>
                  </p>
                </div>
              </div>

              <p className='text-red-500'>
                {formatCash(product.price * product.quantity + '')}
              </p>
            </div>
          ))}
        </div>
        <div className='flex items-center justify-between  my-6'>
          <div className='flex items-center justify-start'>
            <p className='mr-2'>Tích điểm:</p>
            <p className='text-2xl text-yellow-600'>
              {formatNumber(data.orderDetail?.giftPoint + '')}
            </p>
          </div>

          <div className='flex flex-col items-end'>
            {data.orderDetail?.voucher?.discountAmount && (
              <div>
                <p>
                  <span className='mr-2'>Voucher:</span>
                  <span className='text-red-500'>
                    {formatCash(data.orderDetail?.voucher?.discountAmount + '')}
                  </span>
                </p>
              </div>
            )}
            <div>
              <p>
                <span className='mr-2'>Thành tiền:</span>
                <span className='text-2xl text-red-500'>
                  {data.orderDetail?.voucher?.discountAmount &&
                    formatCash(
                      data.orderDetail.shipping +
                        data.orderDetail.totalAmount -
                        data.orderDetail?.voucher?.discountAmount +
                        ''
                    )}
                  {!data.orderDetail?.voucher?.discountAmount &&
                    formatCash(
                      data.orderDetail.shipping + data.orderDetail.totalAmount + ''
                    )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HistoryOrderCard;
