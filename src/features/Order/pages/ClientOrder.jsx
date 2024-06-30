import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useToast,
} from '@chakra-ui/react';
import { resetCart } from '@/redux/cart.reducer';
import orderApi from '@/api/orderApi';
import formatCash from '@/utils/formatCash';

ClientOrder.propTypes = {
  order: PropTypes.object.isRequired,
};

function ClientOrder({ order }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const voucherState = useSelector((state) => state.cart.voucher);
  const cartState = useSelector((state) => state.cart.cartList);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleOrder = async () => {
    if (cartState.length === 0) {
      toast({
        title: 'Mua hàng thất bại',
        description: 'Không có mặt hàng nào được chọn',
        status: 'success',
        colorScheme: 'red',
        position: 'bottom-right',
        duration: 1000,
        isClosable: true,
      });
    } else {
      await orderApi.createOrder(order);
      toast({
        title: 'Order Successfully',
        description: 'Đặt hàng thành công',
        status: 'success',
        colorScheme: 'green',
        position: 'bottom-right',
        duration: 1000,
        isClosable: true,
      });
      dispatch(resetCart());
    }
  };

  return (
    <React.Fragment>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Sản phẩm</Th>
              <Th isNumeric>Tạm tính</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cartState?.map((product, index) => (
              <Tr key={index}>
                <Td className='flex items-center justify-start gap-2'>
                  <p className='max-w-[270px] truncate'>{product.name}</p>
                  {product.quantity >= 2 && (
                    <div className='flex item justify-start font-bold'>
                      <p>x</p>
                      <p className='ml-1'>{product.quantity}</p>
                    </div>
                  )}
                </Td>
                <Td isNumeric>
                  {formatCash(product.price * product.quantity)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <div className='mt-7 pt-6 border-t-2 border-white-500'>
        <div className='flex items-center justify-between gap-8'>
          <p className='uppercase font-semibold'>Tạm tính:</p>
          <p className='font-bold text-red-600 text-lg'>
            {formatCash(totalAmount)}
          </p>
        </div>
        <div className='flex items-center justify-between gap-8 mt-3'>
          <p className='uppercase font-semibold'>Giao hàng:</p>
          <p className='font-bold text-red-600 text-lg'>
            + {cartState.length === 0 ? formatCash(0) : formatCash(30000)}
          </p>
        </div>
        {voucherState && (
          <div className='mt-3'>
            <p className='uppercase font-semibold'>Voucher:</p>
            <div className='border-l-[2px] pl-3 flex items-center justify-between gap-8 mt-3'>
              <p className=''>{voucherState?.name}</p>
              <p className='font-bold text-red-600 text-lg'>
                - {formatCash(voucherState.discountAmount)}
              </p>
            </div>
          </div>
        )}
        <div className='flex items-center justify-between gap-8 mt-3'>
          <p className='uppercase font-semibold'>Tổng:</p>
          <p className='font-bold text-red-600 text-2xl border-t-2 border-red-500 pt-2'>
            {voucherState
              ? formatCash(
                totalAmount +
                (cartState.length === 0 ? 0 : 30000) -
                voucherState?.discountAmount
              )
              : formatCash(totalAmount + (cartState.length === 0 ? 0 : 30000))}
          </p>
        </div>
        <div className='mt-8 grid place-items-center'>
          <Button
            colorScheme={'orange'}
            size={'lg'}
            px='12'
            onClick={() => {
              handleOrder();
            }}
          >
            Mua hàng
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ClientOrder;
