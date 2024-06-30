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
	RadioGroup,
	Stack,
	Radio,
	HStack,
	useToast,
} from '@chakra-ui/react';
import authApi from '@/api/authApi';
import { useSelector } from 'react-redux';

AddUserForm.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	fetchData: PropTypes.func.isRequired,
};

function AddUserForm({ isOpen, onClose, fetchData }) {
	const user = useSelector((state) => state.auth.userInfo);
	const initialUser = {
		fullName: '',
		email: '',
		password: '',
		avatar: '',
	};
	const [userFormData, setUserFormData] = useState(initialUser);
	const [role, setRole] = useState('member');

	const toast = useToast();

	const handleAddUser = async () => {
		const newUser = {
			fullName: userFormData.fullName,
			email: userFormData.email,
			password: userFormData.password,
			avatar: userFormData.avatar,
			role: role,
		};
		await authApi.registerUser(newUser);
		fetchData();
		toast({
			title: 'Create Account Successfully',
			description: 'Tạo mới tài khoản thành công',
			status: 'success',
			colorScheme: 'green',
			position: 'bottom-right',
			duration: 1000,
			isClosable: true,
		});
		setUserFormData(initialUser);
		onClose();
	};

	return (
		<React.Fragment>
			<Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
				<ModalOverlay />

				<ModalContent maxWidth={'1240px'}>
					<ModalHeader>Tạo mới người dùng</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={6}>
							<FormControl isRequired>
								<FormLabel className='whitespace-nowrap' mb={3}>
									Tên
								</FormLabel>
								<Input
									placeholder='Nhập họ và tên người dùng'
									value={userFormData.fullName}
									onChange={(e) =>
										setUserFormData((pre) => ({
											...pre,
											fullName: e.target.value,
										}))
									}
								/>
							</FormControl>

							<FormControl isRequired>
								<FormLabel className='whitespace-nowrap' mb={3}>
									Email
								</FormLabel>
								<Input
									placeholder='caohaiduong@gmail.com'
									value={userFormData.email}
									onChange={(e) =>
										setUserFormData((pre) => ({
											...pre,
											email: e.target.value,
										}))
									}
								/>
							</FormControl>

							<FormControl isRequired>
								<FormLabel className='whitespace-nowrap' mb={3}>
									Mật khẩu
								</FormLabel>
								<Input
									placeholder='Nhập mật khẩu'
									value={userFormData.password}
									onChange={(e) =>
										setUserFormData((pre) => ({
											...pre,
											password: e.target.value,
										}))
									}
								/>
							</FormControl>

							<FormControl>
								<FormLabel className='whitespace-nowrap' mb={3}>
									Vai trò
								</FormLabel>
								<HStack ml={8} spacing={8}>
									<RadioGroup defaultValue={role} onChange={setRole}>
										<Stack spacing={4} direction='row'>
											<Radio value='member'>Member</Radio>
											{user.role === 'admin' && <Radio value='staff'>Staff</Radio>}
										</Stack>
									</RadioGroup>
								</HStack>
							</FormControl>

							<FormControl>
								<FormLabel className='whitespace-nowrap' mb={3}>
									Avatar
								</FormLabel>
								<Input
									placeholder='Input URL'
									value={userFormData.avatar}
									onChange={(e) => {
										setUserFormData((pre) => ({
											...pre,
											avatar: e.target.value,
										}));
									}}
								/>
								{userFormData.avatar && (
									<div className='mt-4 rounded-full p-1 border-2 border-yellow-500 w-fit ml-5'>
										<img
											src={userFormData.avatar}
											alt='Avatar Preview'
											className='rounded-full size-[100px] object-cover'
											onError={(e) => {
												e.target.src =
													'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1';
											}}
										/>
									</div>
								)}
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
								handleAddUser();
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

export default AddUserForm;
