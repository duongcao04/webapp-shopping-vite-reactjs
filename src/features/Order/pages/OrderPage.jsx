import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import OrderInformation from '@/features/Order/components/OrderInformation';
import ClientOrder from '@/features/Order/pages/ClientOrder';

function Order() {
  const initalOrder = {
    createdAt: '',
    user_id: '',
    information: {
      name: '',
      address: '',
      phoneNumber: '',
      email: '',
      note: '',
    },
    orderDetail: {
      productList: [],
      voucher: {},
      shipping: 0,
      totalAmount: 0,
    },
  };
  const [order, setOrder] = useState(initalOrder);
  const [orderInformationForm, setOrderInformationForm] = useState(
    initalOrder.information
  );

  const userId = useSelector((state) => state.auth.userInfo)?._id;
  const voucher = useSelector((state) => state.cart.voucher);
  const cartState = useSelector((state) => state.cart.cartList);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  useEffect(() => {
    setOrder({
      createdAt: Date.now(),
      user_id: userId,
      information: orderInformationForm,
      orderDetail: {
        productList: cartState,
        shipping: 30000,
        voucher: voucher,
        totalAmount: totalAmount,
      },
    });
  }, [orderInformationForm, cartState, totalAmount, voucher, userId]);

  return (
    <React.Fragment>
      <div className='container mx-auto mb-8 mt-5'>
        <div className='grid grid-cols-12 gap-8'>
          <div className='col-span-7 py-5'>
            <h2 className='text-2xl font-bold'>Thông tin khách hàng</h2>
            <div className='mt-5'>
              <OrderInformation
                orderInformationForm={orderInformationForm}
                setOrderInformationForm={setOrderInformationForm}
              />
            </div>
          </div>

          <div className='mt-8 col-span-5 border-2 border-green-500 py-8 px-8 rounded-md h-fit'>
            <h2 className='text-xl font-bold pb-4 border-b-2 border-white-500'>
              Đơn hàng của bạn
            </h2>
            <div className='mt-3'>
              <ClientOrder order={order} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Order;
