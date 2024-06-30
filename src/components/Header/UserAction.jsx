import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { FaRegUser, FaChevronDown } from 'react-icons/fa';
import { MdOutlineEditNote } from "react-icons/md";

import Button from '@/components/ui/Button.jsx';
import { logout } from '@/redux/auth.reducer';

function UserAction() {
  const navigate = useNavigate();
  const [isShowPanel, setIsShowPanel] = useState(false);

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const cartState = useSelector((state) => state.cart.cartList);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  return (
    <React.Fragment>
      <div className='flex items-center justify-end gap-3 text-sm'>
        <div className='w-[1px] h-8 bg-white-400' />

        {(userInfo?.role === 'member' || !userInfo) && <Link to={'/gio-hang'} className='relative'>
          <div className=' flex item-center justify-start gap-3 p-3 cursor-pointer opacity-70 hover:opacity-100'>
            <PiShoppingCartSimpleBold size={17} />
            <span className='font-medium'>Giỏ hàng</span>
          </div>
          {cartState.length !== 0 && (
            <div className='absolute top-0 right-0 size-5 bg-red-500 flex items-center justify-center text-white rounded-full text-white-50 font-semibold'>
              {cartState.length}
            </div>
          )}
        </Link>}
        {(userInfo?.role === 'admin' || userInfo?.role === 'staff') && <Link to={'/blog/create'}> <div className=' flex item-center justify-start gap-3 p-3 cursor-pointer opacity-70 hover:opacity-100'>
          <MdOutlineEditNote size={17} />
          <span className='font-medium'>Bài viết mới</span>
        </div></Link>}

        {userInfo && (
          <div className='relative'>
            <button
              className='flex items-center justify-center p-3 opacity-70 hover:opacity-100 cursor-poiter'
              onClick={() => setIsShowPanel(!isShowPanel)}
            >
              <FaRegUser size={17} />
              <p className='font-medium ml-3 mr-1'>Hi {userInfo.fullName}</p>
              <FaChevronDown size={10} />
            </button>

            {isShowPanel && (
              <div className='rounded-md absolute w-[200px] top-[55px] right-0 shadow-[0px_10px_40px_rgba(0,0,0,0.05)] py-4 px-5  bg-white-50 flex flex-col items-start justify-center gap-2'>
                {userInfo.role === 'admin' && (
                  <Button
                    className={
                      'w-full hover:bg-white-400 bg-white-50 text-black rounded-md font-normal text-left'
                    }
                    onClick={() => setIsShowPanel(false)}
                  >
                    <Link
                      to={'/dashboard/admin'}
                      className={'pl-3 inline-flex w-full h-full items-center'}
                    >
                      Dashboard Admin
                    </Link>
                  </Button>
                )}
                {userInfo.role === 'staff' && (
                  <Button
                    className={
                      'w-full hover:bg-white-400 bg-white-50 text-black rounded-md font-normal text-left'
                    }
                    onClick={() => setIsShowPanel(false)}
                  >
                    <Link
                      to={'/dashboard/staff'}
                      className={'pl-3 inline-flex w-full h-full items-center'}
                    >
                      Dashboard Staff
                    </Link>
                  </Button>
                )}
                {userInfo.role === 'member' && (
                  <Button
                    className={
                      'w-full hover:bg-white-400 bg-white-50 text-black rounded-md font-normal text-left'
                    }
                    onClick={() => setIsShowPanel(false)}
                  >
                    <Link
                      to={'/lich-su-mua-hang'}
                      className={'pl-3 inline-flex w-full h-full items-center'}
                    >
                      Lịch sử mua hàng
                    </Link>
                  </Button>
                )}
                <Button
                  className={
                    'w-full hover:bg-white-400 bg-white-50 text-black rounded-md font-normal text-left'
                  }
                  onClick={() => setIsShowPanel(false)}
                >
                  <Link
                    to={'/thong-tin-ca-nhan'}
                    className={'pl-3 inline-flex w-full h-full items-center'}
                  >
                    Thông tin cá nhân
                  </Link>
                </Button>
                <Button
                  className={
                    'w-full hover:bg-white-400 bg-white-50 text-black rounded-md font-normal text-left'
                  }
                  onClick={() => {
                    setIsShowPanel(false);
                    handleLogout();
                  }}
                >
                  <p className={'pl-3 inline-flex w-full h-full items-center'}>
                    Đăng xuất
                  </p>
                </Button>
              </div>
            )}
          </div>
        )}

        {!userInfo && (
          <Button className='w-[150px] rounded-lg'>
            <Link
              to='/dang-nhap'
              className='inline-flex w-full h-full items-center justify-center'
            >
              Đăng nhập
            </Link>
          </Button>
        )}
      </div>
    </React.Fragment>
  );
}

export default UserAction;
