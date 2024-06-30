import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Breadcrumbs from '@/components/ui/Breadcrumbs.jsx';
import VoucherList from '@/features/InformationClient/components/Voucher/VoucherList';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { shortDateFormat } from '@/utils/formatDate';
import voucherApi from '@/api/voucherApi';
import userApi from '@/api/userApi';
import formatNumber from '@/utils/formatNumber';

function AccountPage() {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const [voucherData, setVoucherData] = useState([]);
    const [userData, setUserData] = useState([]);

    const fetchData = async () => {
        try {
            const params = { sortBy: '-createdAt' };
            const userRes = await userApi.getUserProfile(userInfo._id);
            const res = await voucherApi.getAllVoucher(params);
            setUserData(userRes.data?.elements);
            setVoucherData(res.data?.elements);
        } catch (error) {
            console.log('Failed to fetch product list', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const configData = [
        { label: 'Tên khách hàng', data: userData?.fullName },
        { label: 'Email', data: userData?.email },
        {
            label: 'Quyền truy cập',
            data: capitalizeFirstLetter(userData?.role ?? ''),
        },
        { label: 'Ngày tạo tài khoản', data: shortDateFormat(userData?.createdAt) },
        { label: 'Điểm tích luỹ', data: formatNumber(userData?.totalPoint + '') },
    ];
    return (
        <React.Fragment>
            <div className='space-y-2 mb-20'>
                <div className='mt-2 py-2'>
                    <Breadcrumbs />
                </div>

                <div className='container mx-auto bg-white-50 py-5 rounded-lg'>
                    <h1 className='text-2xl font-bold'>Thông tin khách hàng</h1>

                    <div className='mt-7 flex items-start justify-start'>
                        <div className='border-4 border-blue-400 p-1 rounded-full w-[355px] h-[320px] my-5'>
                            <img
                                src={userInfo?.avatar}
                                alt={`avatar ${configData[0]?.data}`}
                                className='w-full h-full rounded-full object-cover'
                            />
                        </div>

                        <div className='ml-20 mt-5 w-[calc(100%-300px)] space-y-8'>
                            {configData?.map((item, index) => (
                                <div
                                    className='grid grid-cols-2 gap-2 w-[600px] my-2 text-lg'
                                    key={index}
                                >
                                    <p className='opacity-60'>{item.label + ':'}</p>
                                    <p>{item.data}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {userInfo.role === 'member' && (
                        <div className='mt-10'>
                            <VoucherList voucherData={voucherData} />
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default AccountPage;
