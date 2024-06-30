import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import formatCash from '@/utils/formatCash';
import { MdClose } from 'react-icons/md';
import NumberInput from '@/components/ui/NumberInput';
import { Button, Input, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addVoucher, deleteCart } from '@/redux/cart.reducer';
import voucherApi from '@/api/voucherApi';
import VoucherCard from '@/features/InformationClient/components/Voucher/VoucherCard';

function CartPage() {
  const [voucher, setVoucher] = useState(null);
  const [errVoucher, setErrVoucher] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const cartState = useSelector((state) => state.cart.cartList);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const voucherState = useSelector((state) => state.cart.voucher);

  const handleUseVoucher = async () => {
    setErrVoucher(true);
    if (voucher) {
      setErrVoucher(false);
      const res = await voucherApi.getVoucherByCode(voucher);
      if (res.data.status === 404) {
        setErrVoucher(true);
      }
      if (res.data.status === 'isOkay') {
        setErrVoucher(false);
        toast({
          title: 'Use Successfully',
          description: 'Sử dụng Voucher thành công',
          status: 'success',
          colorScheme: 'yellow',
          position: 'bottom-right',
          duration: 1000,
          isClosable: true,
        });
        dispatch(addVoucher(res.data.elements));
      }
    }
  };

  const handlePayment = () =>{
    if (cartState.length === 0) {
      toast({
        title: 'Mua hàng thất bại',
        description: 'Vui lòng thêm sản phẩm vào giỏ hàng',
        status: 'error',
        colorScheme: 'red',
        position: 'bottom-right',
        duration: 1500,
        isClosable: true,
      });
    }
  }

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
    toast({
      title: 'Xoá thành công',
      description: 'Đã xoá sản phẩm khỏi giỏ hàng',
      status: 'success',
      colorScheme: 'red',
      position: 'bottom-right',
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <React.Fragment>
      <div className='container mx-auto mb-8'>
        <h1 className='text-3xl font-bold mt-5'>Giỏ hàng của bạn</h1>
        <div className='grid grid-cols-12 gap-8'>
          <div className='border-t-2 divide-y-2 col-span-8 mt-8 h-[690px] overflow-y-scroll pr-4'>
            {cartState?.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between gap-5 py-10'
              >
                <img
                  src={item.imgURL}
                  alt={item.name}
                  className='size-[100px] object-contain'
                />
                <div className='max-w-[400px]'>
                  <p className='opacity-70 text-base'>{item.category_id}</p>
                  <p className='font-bold text-xl'>{item.name}</p>
                </div>
                <NumberInput
                  defaultValue={item.quantity}
                  productId={item._id}
                />
                <p>{formatCash(item.price + '')}</p>
                <Button
                  colorScheme='red'
                  px={1}
                  py={1}
                  onClick={() => {
                    handleDeleteCart(item._id);
                  }}
                >
                  <MdClose size={20} />
                </Button>
              </div>
            ))}
          </div>

          <div className='col-span-4'>
            <div className=' bg-white-400 pt-8 px-8 rounded-lg pb-8'>
              <h2 className='text-xl font-bold pb-4 border-b-2 border-white-500'>
                Khác
              </h2>
              <div className='flex items-center justify-between mt-4 font-semibold'>
                <p>Tổng {cartState.length} sản phẩm</p>
                <p>{formatCash(totalAmount)}</p>
              </div>
              {userInfo && <div className='mt-8'>
                <p className='uppercase font-semibold mb-4'>Mã giảm giá</p>
                <div className='flex items-center justify-between gap-2'>
                  <Input
                    placeholder='Nhập mã giảm giá'
                    variant='filled'
                    value={voucher ?? ''}
                    onChange={(e) => {
                      setVoucher(e.target.value);
                    }}
                  />
                  <Button
                    bgColor={'yellow.500'}
                    color={'white'}
                    _hover={{ bgColor: 'yellow.700' }}
                    onClick={() => {
                      handleUseVoucher();
                    }}
                  >
                    Sử dụng
                  </Button>
                </div>
                {errVoucher && <p className='text-red-500 ml-3 mt-2'>Vui lòng nhập mã voucher lại</p>}
              </div>}
              <div className='flex items-center justify-center mt-8'>
                <Button
                  as={Link}
                  w={'100%'}
                  colorScheme={'yellow'}
                  className='w-full h-full flex items-center justify-center'
                  to={cartState.length !== 0 && '/mua-hang'}
                  onClick={()=>{handlePayment()}}
                >
                  Mua hàng
                </Button>
              </div>
            </div>
            {voucherState && (
              <div className='mt-8'>
                <VoucherCard voucher={voucherState} showButton={false} />
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CartPage;
