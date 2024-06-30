import { Button, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import VoucherCard from '@/features/InformationClient/components/Voucher/VoucherCard';
import AddVoucherForm from '@/features/Permissions/components/VoucherManager/AddVoucherForm';
import voucherApi from '@/api/voucherApi';

function VoucherManager() {
	const [voucherData, setVoucherData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const fetchData = async () => {
		try {
			const params = { sortBy: '-createdAt' };
			const res = await voucherApi.getAllVoucher(params);
			setVoucherData(res.data?.elements);
			setIsLoading(false);
		} catch (error) {
			console.log('Failed to fetch product list', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDelete = async (voucherId) => {
		const params = {};
		await voucherApi.deleteVoucher(voucherId, params);
		fetchData();
		toast({
			title: 'Delete Successfully',
			description: 'Xoá voucher thành công',
			status: 'success',
			colorScheme: 'red',
			position: 'bottom-right',
			duration: 1000,
			isClosable: true,
		});
	};
	return (
		<React.Fragment>
			<AddVoucherForm isOpen={isOpen} onClose={onClose} fetchData={fetchData} />
			<div className='h-full'>
				<div className='flex justify-end mt-5 mr-10'>
				<Button colorScheme='green' onClick={onOpen}>
					Tạo mới Voucher
				</Button>
				</div>
				<div className='h-screen mt-10 overflow-y-auto'>
					{isLoading && <h1>Loading..</h1>}
					{!isLoading && (
						<div className='mt-8 grid grid-cols-3 gap-8'>
				{voucherData?.map((item, index) => (
					<VoucherCard key={index} handleDelete={handleDelete} voucher={item} />
				))}
			</div>
					)}
				</div>
			</div>
		</React.Fragment>
	);
}

export default VoucherManager;