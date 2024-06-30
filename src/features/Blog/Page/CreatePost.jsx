import React, { useState } from 'react';

import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Textarea,
	Tooltip,
	useToast,
} from '@chakra-ui/react';

import { LuSendHorizonal } from 'react-icons/lu';

// import Editor from '@/features/Blog/components/Editor';
import postApi from '@/api/postApi';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
	const toast = useToast();
	const navigate = useNavigate();
	const initialPostForm = {
		title: '',
		description: '',
		featureImg: '',
	};
	const [postForm, setPostForm] = useState(initialPostForm);
	const [content, setContent] = useState('');

	const handlePublish = async () => {
		const newPost = {
			title: postForm.title,
			description: postForm.description,
			featureImg: postForm.featureImg,
			content: content,
		};
		await postApi.createPost(newPost);
		toast({
			title: 'Puslish Successfully',
			description: 'Đăng bài thành công',
			status: 'success',
			colorScheme: 'green',
			position: 'bottom-right',
			duration: 1000,
			isClosable: true,
		});
		navigate('/dashboard/post');
	};

	return (
		<React.Fragment>
			<div className='container mb-16'>
				<h1 className='text-3xl font-bold mt-10 pb-5 border-b-2 border-blue-500'>
					Tạo mới bài viết
				</h1>
				<form className='mt-10'>
					<FormControl isRequired>
						<Flex alignItems={'center'} justifyContent={'flex-start'}>
							<FormLabel w={77}>Tiêu đề:</FormLabel>
							<Input
								variant='flushed'
								placeholder='Nhập tiêu đề bài viết'
								value={postForm?.title}
								onChange={(e) =>
									setPostForm((pre) => ({ ...pre, title: e.target.value }))
								}
							/>
							<Tooltip
								hasArrow
								label='Đăng bài'
								placement='top'
								aria-label='A tool tip'
							>
								<Button
									colorScheme={'yellow'}
									onClick={() => {
										handlePublish();
									}}
									ml={5}
								>
									<LuSendHorizonal size={25} />
								</Button>
							</Tooltip>
						</Flex>
					</FormControl>
					<div className='grid grid-cols-12 mt-8'>
						<div className='col-span-8 border-r-2 w-full'>
							<Textarea
								minHeight={44}
								variant='filled'
								placeholder='Mô tả bài viết'
								value={content}
								onChange={(e) => setContent(e.target.value)}
							/>
						</div>
						<div className='col-span-4 ml-10'>
							<Stack spacing={8}>
								<FormControl>
									<FormLabel mb={3}>Mô tả</FormLabel>
									<Textarea
										minHeight={44}
										variant='filled'
										placeholder='Mô tả bài viết'
										value={postForm.description}
										onChange={(e) =>
											setPostForm((pre) => ({
												...pre,
												description: e.target.value,
											}))
										}
									/>
								</FormControl>

								<FormControl isRequired>
									<FormLabel mb={3}>Ảnh nổi bật</FormLabel>
									<Input
										placeholder='img URL'
										value={postForm.featureImg}
										onChange={(e) =>
											setPostForm((pre) => ({
												...pre,
												featureImg: e.target.value,
											}))
										}
									/>
									{postForm.featureImg && (
										<div className='mt-5'>
											<p className='mb-2'>Preview</p>
											<img src={postForm.featureImg} alt='preview image' />
										</div>
									)}
								</FormControl>
							</Stack>
						</div>
					</div>
				</form>
			</div>
		</React.Fragment>
	);
}

export default CreatePost;
