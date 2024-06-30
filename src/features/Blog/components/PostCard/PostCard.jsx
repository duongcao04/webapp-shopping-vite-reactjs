import React from 'react';
import PropTypes from 'prop-types';

import { shortDateFormat } from '@/utils/formatDate';

PostCard.propTypes = {
	post: PropTypes.object.isRequired,
};

function PostCard({ post }) {

	return (
		<React.Fragment>
			<div className='relative border-[1px] p-4 shadow-sm hover:shadow-lg transition duration-200'>
				<img
					src={post.featureImg}
					alt={post.title}
					className='w-full h-[250px] object-contain'
				/>

				<div className='mt-4'>
					<p className='text-sm opacity-90 pt-1 mb-5'>
						{shortDateFormat(post.createdAt)}
					</p>
					<p className='text-xl font-semibold'>{post.title}</p>
					<p className='mt-3 line-clamp-4 min-h-24'>{post.content}</p>
				</div>
			</div>
		</React.Fragment>
	);
}

export default PostCard;
