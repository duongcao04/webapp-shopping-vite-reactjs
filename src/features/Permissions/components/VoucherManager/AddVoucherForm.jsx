import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	useToast,
	InputLeftElement,
	InputGroup,
} from '@chakra-ui/react';

import voucherApi from '@/api/voucherApi';

AddVoucherForm.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	fetchData: PropTypes.func.isRequired,
};

function AddVoucherForm({ isOpen, onClose, fetchData }) {
	const initialVoucher = {
		name: '',
		code: '',
		discountAmount: 0,
		expiryDate: '',
	};
	const [voucherForm, setVoucherForm] = useState(initialVoucher);

	const toast = useToast();

	const handleCreateVoucher = async () => {
		const newVoucher = {
			name: voucherForm.name,
			code: voucherForm.code.toLowerCase(),
			discountAmount: voucherForm.discountAmount,
			expiryDate: voucherForm.expiryDate,
		};
		console.log(newVoucher);
		await voucherApi.createNewVoucher(newVoucher);
		fetchData();
		toast({
			title: 'Create Voucher Successfully',
			description: 'Tạo mới mã giảm giá thành công',
			status: 'success',
			colorScheme: 'green',
			position: 'bottom-right',
			duration: 1000,
			isClosable: true,
		});
		setVoucherForm(initialVoucher)
		onClose();
	};

	return (
		<React.Fragment>
			<Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
				<ModalOverlay />

				<ModalContent maxWidth={'1240px'}>
					<ModalHeader>Thêm mới mã giảm giá</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={6}>
							<FormControl isRequired>
								<FormLabel className='whitespace-nowrap' mb={3}>
									Tên hiển thị
								</FormLabel>
								<Input
									placeholder='Nhập tên hiển thị của Voucher'
									value={voucherForm.name}
									onChange={(e) =>
										setVoucherForm((pre) => ({
											...pre,
											name: e.target.value,
										}))
									}
								/>
							</FormControl>

							<FormControl isRequired>
								<FormLabel className='whitespace-nowrap' mb={3}>
									Code
								</FormLabel>
								<Input
									placeholder='Nhập mã giảm giá'
									value={voucherForm.code}
									onChange={(e) =>
										setVoucherForm((pre) => ({
											...pre,
											code: e.target.value,
										}))
									}
								/>
							</FormControl>

							<FormControl isRequired>
								<FormLabel className='whitespace-nowrap' mb={3}>
									Số tiền chiết khấu
								</FormLabel>
								<InputGroup>
									<InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
										$
									</InputLeftElement>
									<Input
										placeholder='Nhập số tiền chiết khấu'
										value={voucherForm.discountAmount}
										onChange={(e) =>
											setVoucherForm((pre) => ({
												...pre,
												discountAmount: e.target.value,
											}))
										}
									/>
								</InputGroup>
							</FormControl>

							<FormControl isRequired>
								<FormLabel className='whitespace-nowrap' mb={3}>
									Hạn sử dụng
								</FormLabel>


								<Input placeholder='Ngày hết hạn Voucher' size='md' type='datetime-local' value={voucherForm.expiryDate} onChange={(e) =>
									setVoucherForm((pre) => ({
										...pre,
										expiryDate: e.target.value,
									}))
								} />
							</FormControl>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button variant='ghost' mr={3} onClick={onClose}>
							Huỷ
						</Button>
						<Button
							colorScheme='green'
							onClick={() => {
								handleCreateVoucher();
							}}
						>
							Thêm mới
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</React.Fragment>
	);
}

export default AddVoucherForm;
