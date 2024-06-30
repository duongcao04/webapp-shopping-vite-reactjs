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
import { MdDeleteForever } from 'react-icons/md';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { useSelector } from 'react-redux';

UserList.propTypes = {
	userData: PropTypes.array.isRequired,
	handleDelete: PropTypes.func.isRequired,
};

function UserList({ userData, handleDelete }) {
	const user = useSelector(state => state.auth.userInfo)

	const handleUserData = (userData) => {
		if (user.role === 'staff') {
			return userData.filter(item => item.role === 'member')
		}
		return userData
	}
	let newUserData = handleUserData(userData);

	return (
		<React.Fragment>
			<TableContainer>
				<Table variant='simple'>
					<Thead>
						<Tr>
							<Th>ID</Th>
							<Th>Avatar</Th>
							<Th>Tên</Th>
							<Th>Email</Th>
							<Th>Vai trò</Th>
							<Th>Sửa / Xoá</Th>
						</Tr>
					</Thead>
					<Tbody>
						{newUserData?.map((item, index) => {
							return <Tr key={index}>
								<Td isTruncated>{index + 1}</Td>
								<Td>
									<img
										src={item.avatar}
										alt={item.name}
										className='size-[100px] object-contain rounded-full'
									/>
								</Td>
								<Td>{item.fullName}</Td>
								<Td>{item.email}</Td>
								<Td>
									{item.role === 'staff' && (
										<p className='text-blue-500 font-bold'>
											{capitalizeFirstLetter(item.role)}
										</p>
									)}
									{item.role === 'admin' && (
										<p className='text-red-500 font-bold'>
											{capitalizeFirstLetter(item.role)}
										</p>
									)}
									{item.role === 'member' && (
										<p>{capitalizeFirstLetter(item.role)}</p>
									)}
								</Td>
								<Td className='space-x-3'>
									<Button colorScheme='red' onClick={() => { handleDelete(item._id) }}>
										<MdDeleteForever size={20} />
									</Button>
								</Td>
							</Tr>
						}		
						)}
					</Tbody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
}

export default UserList;
