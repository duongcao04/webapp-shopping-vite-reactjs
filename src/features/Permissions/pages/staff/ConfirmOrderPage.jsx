import React, { useEffect, useState } from 'react';
import orderApi from '@/api/orderApi';
import OrderConfirmed from '@/features/Permissions/components/ConfirmOrder/OrderConfirmed';
import OrderPending from '@/features/Permissions/components/ConfirmOrder/OrderPending';
import { useDisclosure, useToast } from '@chakra-ui/react';
import DetailOrderModal from '@/features/Permissions/pages/staff/DetailOrderModal';

function ConfirmOrderPage() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [tab, setTab] = useState('Đang xử lý');
	const [isLoading, setIsLoading] = useState([]);
	const [orderData, setOrderData] = useState([]);
	const [orderView, setOrderView] = useState({});
	const toast = useToast();

	const fetchData = async () => {
		try {
			const params = { sortBy: '-createdAt' };
			const res = await orderApi.getAll(params);
			setOrderData(res.data?.elements);
			setIsLoading(false);
		} catch (error) {
			console.log('Failed to fetch product list', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const orderPendingData = orderData.filter(
		(item) => item.orderStatus === 'Đang xử lý'
	);
	const orderConfirmedData = orderData.filter(
		(item) => item.orderStatus === 'Đã xác nhận'
	);

	const handleViewOrder = (order) => {
		setOrderView(order);
		onOpen();
	};

	const handleConfirm = async (orderId) => {
		await orderApi.updateOrder(orderId, {
			orderStatus: 'Đã xác nhận',
		});
		fetchData();
		toast({
			title: 'Thành công',
			description: 'Xác nhận đơn hàng thành công',
			status: 'success',
			colorScheme: 'green',
			position: 'bottom-right',
			duration: 1500,
			isClosable: true,
		});
	};
	const handleReConfirm = async (orderId) => {
		await orderApi.updateOrder(orderId, {
			orderStatus: 'Đang xử lý',
		});
		fetchData();
		toast({
			title: 'Thành công',
			description: 'Huỷ xác nhận đơn hàng',
			status: 'success',
			colorScheme: 'red',
			position: 'bottom-right',
			duration: 1500,
			isClosable: true,
		});
	};

	return (
		<React.Fragment>
			<DetailOrderModal isOpen={isOpen} onClose={onClose} order={orderView} />
			<div className='mt-4'>
				<h1 className='text-2xl font-medium'>Xác nhận đơn đặt hàng</h1>
				<div className='mt-5 flex items-center justify-start'>
					<div
						className={`${tab === 'Đang xử lý'
								? 'border-red-500'
								: 'border-transparent opacity-70'
							} border-b-[2px] pb-2 cursor-pointer px-8 relative hover:opacity-100 hover:text-red-500`}
						onClick={() => {
							setTab('Đang xử lý');
						}}
					>
						<p
							className={`${tab === 'Đang xử lý' && 'text-red-500'
								} font-medium transition duration-100`}
						>
							Đang xử lý
						</p>
						<p className='absolute top-1 right-3 text-sm font-medium opacity-55'>
							{orderPendingData.length}
						</p>
					</div>
					<div
						className={`${tab === 'Đã xác nhận'
								? 'border-red-500'
								: 'border-transparent opacity-70'
							} border-b-[2px] pb-2 cursor-pointer px-8 hover:opacity-100 hover:text-red-500`}
						onClick={() => {
							setTab('Đã xác nhận');
						}}
					>
						<p
							className={`${tab === 'Đã xác nhận' && 'text-red-500'
								} font-medium transition duration-100`}
						>
							Đã xác nhận
						</p>
					</div>
				</div>
				<div className='mt-7'>
					{tab === 'Đang xử lý' && (
						<OrderPending
							orderData={orderPendingData}
							handleConfirm={handleConfirm}
							handleViewOrder={handleViewOrder}
						/>
					)}
					{tab === 'Đã xác nhận' && (
						<OrderConfirmed
							orderData={orderConfirmedData}
							handleReConfirm={handleReConfirm}
							handleViewOrder={handleViewOrder}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	);
}

export default ConfirmOrderPage;
