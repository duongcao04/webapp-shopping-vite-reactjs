import { Button, Input, InputGroup, InputLeftElement, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import AddUserForm from '@/features/Permissions/components/AccountManager/AddUserForm';
import UserList from '@/features/Permissions/components/AccountManager/UserList';

import userApi from '@/api/userApi';
import { TbSearch } from 'react-icons/tb';

function CustomerManager() {
	const [userData, setUserData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [input, setInput] = useState('');
	const [search, setSearch] = useState('');

	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const fetchData = async () => {
		try {
			const params = { sortBy: '-createdAt', name: search };
			const res = await userApi.getAll(params);
			setUserData(res.data?.elements);
			setIsLoading(false);
		} catch (error) {
			console.log('Failed to fetch product list', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDelete = async (userId) => {
		const params = {};
		await userApi.deleteUser(userId, params);
		fetchData();
		toast({
			title: 'Delete Successfully',
			description: 'Xoá tài khoản thành công',
			status: 'success',
			colorScheme: 'red',
			position: 'bottom-right',
			duration: 1000,
			isClosable: true,
		});
	};
	const handleSearch = () => {
		setSearch(input)
		fetchData()
	}

	return (
		<React.Fragment>
			<AddUserForm isOpen={isOpen} onClose={onClose} fetchData={fetchData} />
			<div className='h-full'>
			<div className='flex justify-between items-center mt-5 mr-10'>
					<InputGroup>
						<InputLeftElement pointerEvents='none'>
							<TbSearch color='gray.300' />
						</InputLeftElement>
						<Input placeholder={'Nhập tên người dùng'} w={'99%'} value={input} onChange={(e)=>{setInput(e.target.value)}}/>
					</InputGroup>
					<Button colorScheme='teal' variant='outline' onClick={()=>{handleSearch()}}>
						Tìm kiếm
					</Button>
				</div>
				<div className='flex justify-end items-center mt-8 mr-10'>
					<Button colorScheme='green' onClick={onOpen}>
						Tạo mới người dùng
					</Button>
				</div>
				<div className='mt-10 h-[calc(100vh-360px)] overflow-y-auto'>
					{isLoading && <h1>Loading..</h1>}
					{!isLoading && (
						<UserList userData={userData} handleDelete={handleDelete} />
					)}
				</div>
			</div>
		</React.Fragment>
	);
}

export default CustomerManager;
