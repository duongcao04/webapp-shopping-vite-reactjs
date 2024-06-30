import React, { useEffect, useState } from 'react';
import {
	Button,
	Input,
	InputGroup,
	InputLeftElement,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import productApi from '@/api/productApi';
import FormModal from '@/features/Permissions/components/ProductManager/FormModal';
import ProductList from '@/features/Permissions/components/ProductManager/ProductList';
import { TbSearch } from 'react-icons/tb';

function ProductManager() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const [productsData, setProductsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [input, setInput] = useState('');
	const [search, setSearch] = useState('');

	const fetchData = async () => {
		try {
			const params = { sortBy: '-createdAt', name: search};
			const prodRes = await productApi.getAll(params);
			setProductsData(prodRes.data?.elements);
			setIsLoading(false);
		} catch (error) {
			console.log('Failed to fetch product list', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSearch = () => {
		setSearch(input)
		fetchData();
	}

	const handleDelete = async (productId) => {
		const params = {};
		await productApi.deleteProduct(productId, params);
		fetchData();
		toast({
			title: 'Delete Successfully',
			description: 'Xoá sản phẩm thành công',
			status: 'success',
			colorScheme: 'red',
			position: 'top-right',
			duration: 1000,
			isClosable: true,
		});
	};

	return (
		<React.Fragment>
			<FormModal isOpen={isOpen} onClose={onClose} fetchData={fetchData} />

			<div className='h-full'>
				<div className='flex justify-between items-center mt-5 mr-10'>
					<InputGroup>
						<InputLeftElement pointerEvents='none'>
							<TbSearch color='gray.300' />
						</InputLeftElement>
						<Input placeholder={'Nhập tên sản phẩm'} w={'99%'} value={input} onChange={(e)=>{setInput(e.target.value)}}/>
					</InputGroup>
					<Button colorScheme='teal' variant='outline' onClick={()=>{handleSearch()}}>
						Tìm kiếm
					</Button>
				</div>
				<div className='flex justify-between items-center mt-8 mr-10'>
					<p className='text-lg'>Hiện đang có <span className='font-bold text-red-500'>{productsData.length}</span> sản phẩm</p>
					<Button colorScheme='green' onClick={onOpen}>
						Thêm mới sản phẩm
					</Button>
				</div>
				<div className='mt-10 h-[calc(100vh-360px)] overflow-y-auto'>
					{isLoading && <h1>Loading..</h1>}
					{!isLoading && (
						<ProductList
							handleDelete={handleDelete}
							productList={productsData}
							fetchData={fetchData}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	);
}

export default ProductManager;
