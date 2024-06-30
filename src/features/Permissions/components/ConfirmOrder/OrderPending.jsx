import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { GiConfirmed } from 'react-icons/gi';
import { FaRegEye } from "react-icons/fa";
import { shortDateFormat } from '@/utils/formatDate';
import formatCash from '@/utils/formatCash';

OrderPending.propTypes = {
	orderData: PropTypes.array.isRequired,
	handleConfirm: PropTypes.func.isRequired,
	handleViewOrder: PropTypes.func.isRequired,
};

function OrderPending({ orderData, handleConfirm, handleViewOrder }) {
	return (
		<React.Fragment>
			<TableContainer>
				<Table size='md' variant='striped' colorScheme='gray'>
					<Thead>
						<Tr>
							<Th isNumeric>STT</Th>
							<Th>ID</Th>
							<Th>Người đặt</Th>
							<Th>Ngày tạo</Th>
							<Th isNumeric>Số lượng</Th>
							<Th isNumeric>Tổng cộng</Th>
							<Th>Xác nhận</Th>
						</Tr>
					</Thead>
					<Tbody>
						{orderData?.map((item, index) => {
							let totalProduct = 0;
							item.orderDetail.productList.forEach((product) => {
								totalProduct = totalProduct + product.quantity;
							});
							return (
								<Tr key={index}>
									<Td isNumeric>{index + 1}</Td>
									<Td>{item._id}</Td>
									<Td w={400}>{item.orderDetail.name ?? item.user_id}</Td>
									<Td>{shortDateFormat(item.createdAt)}</Td>
									<Td isNumeric>{totalProduct}</Td>
									<Td isNumeric>
										{formatCash(
											item.orderDetail.totalAmount +
											item.orderDetail.shipping +
											(item.orderDetail.voucher?.discountAmount ?? 0)
										)}
									</Td>
									<Td>
										<div className='flex items-center justify-start gap-5'>
											<Button
												onClick={() => {
													handleConfirm(item._id);
												}}
												colorScheme={'green'}
												p={0}
												ml={5}
											>
												<GiConfirmed size={20}/>
											</Button>
											<Button
												onClick={() => {
													handleViewOrder(item)
												}}
												colorScheme={'yellow'}
												p={0}
											>
												<FaRegEye size={20}/>
											</Button>
										</div>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
}

export default OrderPending;
