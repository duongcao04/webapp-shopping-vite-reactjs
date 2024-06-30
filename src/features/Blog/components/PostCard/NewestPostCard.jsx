import React from 'react';
import PropTypes from 'prop-types';
import { FaRegUser } from "react-icons/fa";
import { longDateFormat } from '@/utils/formatDate';
import { Link } from 'react-router-dom';

NewestPostCard.propTypes = {
	post: PropTypes.object.isRequired
};

function NewestPostCard({ post }) {
	return (
		<React.Fragment>
			<Link to={`/blog/${post._id}`} className='block'>
				<div className='flex items-start justify-start gap-8 border-[1px] p-4 shadow-md hover:shadow-lg transition duration-200'>
					<img
						src={post.featureImg}
						alt='picture'
						className='min-h-[253px] h-fit w-[380px] object-cover'
					/>

					<div>
						<p className='text-xl font-semibold'>{post.title}</p>
						<p className='mt-3 line-clamp-5 min-h-[120px]'>
							{post.content}
						</p>
						<div className='flex items-center justify-start gap-3 mt-7 divide-x-2'>
							<p className='text-sm opacity-90'>{longDateFormat(post.createdAt)}</p>
							<div className='pl-3 flex items-center justify-start gap-2'>
								<div className='p-1 rounded-lg bg-blue-100 text-blue-800'><FaRegUser size={14} /></div>
								<p className='text-sm opacity-90'>Cao Hải Dương</p>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</React.Fragment>
	);
}

export default NewestPostCard;
