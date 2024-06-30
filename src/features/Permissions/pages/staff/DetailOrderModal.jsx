import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
} from '@chakra-ui/react';
import { longDateFormat } from '@/utils/formatDate';
import formatCash from '@/utils/formatCash';

DetailOrderModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	order: PropTypes.object.isRequired,
};

function DetailOrderModal({ isOpen, onClose, order }) {
	const handleOrder = [
		{ label: 'Ngày tạo', data: longDateFormat(order.createdAt) },
		{ label: 'ID đơn hàng', data: '#' + order._id },
		{ label: 'ID tài khoản đặt hàng', data: '#' + order.user_id },
		{
			label: 'Thông tin người đặt hàng',
			data: '',
			children: [
				{ label: 'Tên', data: order.information?.name },
				{ label: 'Địa chỉ', data: order.information?.address },
				{ label: 'Số điện thoại', data: order.information?.phoneNumber },
				{ label: 'Email', data: order.information?.email },
				{
					label: 'Ghi chú đơn đặt hàng',
					data: order.information?.note ?? 'Không có',
				},
			],
		},
		{
			label: 'Thông tin đơn hàng',
			data: '',
			children: [
				{
					label: 'Danh sách sản phẩm',
					productList: order.orderDetail?.productList,
				},
				{ label: 'Phí vận chuyển', data: formatCash(order.orderDetail?.shipping ?? 0) },
				{ label: order.orderDetail?.voucher?.name ? 'Voucher' : null, data: order.orderDetail?.voucher?.name ?? null },
				{
					label: 'Tổng cộng',
					data:
						formatCash(order.orderDetail?.totalAmount +
						order.orderDetail?.shipping +
						(order.orderDetail?.voucher?.discountAmount ?? 0)),
				},
			],
		},
	];
	return (
		<React.Fragment>
			<Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
				<ModalOverlay />
				<ModalContent maxWidth={'1240px'}>
					<ModalHeader>Xem thông tin đơn đặt hàng</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack>
							{handleOrder?.map((item, index) => (
								<div key={index}>
									<div className='flex items-center justify-start gap-4'>
										<p className='font-bold'>{item.label}:</p>
										<p>{item.data}</p>
									</div>
									{item?.children && (
										<div className='ml-2 border-l-[2px] border-green-500 pl-3 my-2'>
											{item?.children?.map((child, index) => (
												<div key={index} className='my-2'>
													{child?.label && <div className='flex items-center justify-start gap-2'>
														<p className='font-medium'>{child?.label}:</p>
														<p className={`${child?.label === 'Tổng cộng' && 'font-semibold text-xl text-red-500'}`}>{child?.data}</p>
													</div>}
													{child?.productList && (
														<div className='ml-5'>
															<TableContainer>
																<Table variant='simple'>
																	<Thead>
																		<Tr>
																			<Th isNumeric>STT</Th>
																			<Th>Ảnh sản phẩm</Th>
																			<Th>Tên sản phẩm</Th>
																			<Th isNumeric>Giá tiền</Th>
																		</Tr>
																	</Thead>
																	<Tbody>
																		{child.productList?.map(
																			(product, index) => (
																				<Tr key={index}>
																					<Td w={'40px'} isNumeric>
																						{index + 1}
																					</Td>
																					<Td w={'80px'}>
																						<img
																							src={product.imgURL}
																							alt={product.name}
																							className='size-[40px] object-contain'
																						/>
																					</Td>
																					<Td>
																						<div className='flex items-center justify-start gap-2'>
																							<p>{product.name}</p>
																							{product.quantity > 1 && (
																								<p className='font-semibold'>x{product.quantity}</p>
																							)}
																						</div>
																					</Td>
																					<Td isNumeric>
																						<p className='text-red-500'>{formatCash(product.price)}</p>
																					</Td>
																				</Tr>
																			)
																		)}
																	</Tbody>
																</Table>
															</TableContainer>
														</div>
													)}
												</div>
											))}
										</div>
									)}
								</div>
							))}
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='green' onClick={()=>{onClose()}}>Đóng</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</React.Fragment>
	);
}

export default DetailOrderModal;
