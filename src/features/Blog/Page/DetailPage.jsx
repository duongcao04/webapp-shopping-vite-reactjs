import React, { useEffect, useState } from 'react';
import RelationPost from '@/features/Blog/components/PostCard/RelationPost';
import { FaRegUser } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import postApi from '@/api/postApi';
import {shortDateFormat} from '@/utils/formatDate';
import { useSelector } from 'react-redux';

function DetailPage() {
	const user = useSelector(state => state.auth?.userInfo)
	const [isLoading, setIsLoading] = useState(true);
	const [post, setPost] = useState({});
	const location = useLocation();
	const locationList = location.pathname.split('/').slice(1);
	const postId = locationList[locationList.length - 1];

	useEffect(() => {
		(async () => {
			try {
				const params = {};
				const response = await postApi.getOne(postId, params);
				setPost(response.data.elements);
				setIsLoading(false);
			} catch (error) {
				console.log('Failed to fetch product list', error);
			}
		})();
	}, [postId]);

	console.log(post);

	return (
		<React.Fragment>
			{isLoading && <h1>Loading...</h1>}
			{!isLoading && <div className='container pb-20'>
				<div className='flex items-start justify-between gap-8 mt-12 mb-10'>
					<div className='mt-7'>
						<h1 className='text-3xl font-bold'>
							{post?.title}
						</h1>
						<p className='line-clamp-6 mt-8 text-lg opacity-80 min-h-[168px]'>
							{post?.description}
						</p>
						<div className='flex items-center justify-start gap-8 mt-8'>
							<p className='text-base font-medium opacity-80 pr-1'>
								{shortDateFormat(post?.createdAt)}
							</p>
							<div className='w-[2px] h-[20px] bg-white-400' />
							<div className='flex items-center justify-start gap-2'>
								<div className='p-1 rounded-lg bg-blue-100 text-blue-800'>
									<FaRegUser size={14} />
								</div>
								<p className='text-base font-medium opacity-80'>
									Cao Hải Dương
								</p>
							</div>
						</div>
					</div>
					<img
						src={post?.featureImg}
						alt={post?.title}
						className='w-fit h-[400px] object-cover shadow-md'
					/>
				</div>
				<div className='mt-20 px-10 leading-relaxed text-base min-h-[400px]'>
					{post?.content}

					{user.role !== 'staff' || user.role !== 'admin' && <div className='mt-44 border-t-[2px] border-white-400 pt-10'>
						<h2 className='text-2xl font-bold text-center'>Dành cho bạn</h2>
						<div className='grid grid-cols-4 gap-10 mt-8'>
							{new Array(4).fill(0).map((item, index) => (
								<RelationPost key={index} />
							))}
						</div>
					</div>}
				</div>
			</div>}
		</React.Fragment>
	);
}

export default DetailPage;
