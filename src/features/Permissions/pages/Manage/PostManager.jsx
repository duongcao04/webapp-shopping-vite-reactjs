import { Button, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import postApi from '@/api/postApi';
import { Link } from 'react-router-dom';
import PostManagerCard from '@/features/Permissions/components/PostManager/PostManagerCard';

function PostManager() {
	const toast = useToast();

	const [postData, setPostData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	
	console.log(postData);

	const fetchData = async () => {
		try {
			const params = { sortBy: '-createdAt' };
			const res = await postApi.getAll(params);
			setPostData(res.data?.elements);
			setIsLoading(false);
		} catch (error) {
			console.log('Failed to fetch product list', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDelete = async (postId) => {
		const params = {};
		await postApi.deletePost(postId, params);
		fetchData();
		toast({
			title: 'Delete Successfully',
			description: 'Xoá bài viết thành công',
			status: 'success',
			colorScheme: 'red',
			position: 'bottom-right',
			duration: 1000,
			isClosable: true,
		});
	};

	return (
		<React.Fragment>
			<div className='h-full'>
				<div className='flex justify-end mt-5 mr-10'>
					<Link to={'/post/create'}>
						<Button colorScheme='green'>
							Bài viết mới
						</Button>
					</Link>
				</div>
				<div className='h-screen mt-10 overflow-y-auto'>
					{isLoading && <h1>Loading..</h1>}
					{!isLoading && (
						<div className='grid grid-cols-4 gap-8'>
							{postData?.map((item, index) => (
								<Link to={`/blog/${item._id}`} key={index}><PostManagerCard post={item} handleDelete={handleDelete}/></Link>
							))}
						</div>
					)}
				</div>
			</div>
		</React.Fragment>
	);
}

export default PostManager;
