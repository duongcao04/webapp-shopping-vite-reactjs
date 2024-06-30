import orderApi from '@/api/orderApi';
import HistoryOrderCard from '@/features/Order/components/HistoryOrderCard';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function HistoryOrder() {
  const userId = useSelector((state) => state.auth.userInfo)?._id;
  const [historyOrder, setHistoryOrder] = useState([]);

  useEffect(() => {
    (async () => {
      const params = { userId: userId };
      const res = await orderApi.getAll(params);
      setHistoryOrder(res.data.elements);
    })();
  }, [userId]);
  console.log(historyOrder);

  return (
    <React.Fragment>
      <div className='container mx-auto mb-8'>
        <h1 className='text-3xl font-bold mt-5'>Lịch sử mua hàng</h1>
        <div className='mt-5 border-t-2 pt-3'>
          {historyOrder?.map((item, index) => (
            <div key={index} className='mt-3'>
              <HistoryOrderCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default HistoryOrder;
