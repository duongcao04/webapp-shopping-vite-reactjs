import React from 'react';
import PropTypes from 'prop-types';

import { shortDateFormat } from '@/utils/formatDate';
import { Button } from '@chakra-ui/react';

import { MdDeleteForever } from 'react-icons/md';

PostManagerCard.propTypes = {
	post: PropTypes.object.isRequired,
	handleDelete: PropTypes.func,
};

function PostManagerCard({ post, handleDelete }) {
	return (
		<React.Fragment>
			<div className='relative border-[1px] p-4 shadow-sm hover:shadow-lg transition duration-200'>
				<img
					src={post.featureImg}
					alt={post.title}
					className='w-full h-[250px] object-cover'
				/>

				<div className='mt-4'>
					<p className='text-sm opacity-90 pt-1 mb-5'>
						{shortDateFormat(post.createdAt)}
					</p>
					<p className='text-xl font-semibold'>{post.title}</p>
					<p className='mt-3 line-clamp-2 min-h-11'>{post.content}</p>
				</div>
				<div className='absolute top-0 right-0 p-5 bg-white-100 rounded-bl-2xl'>
					<Button
						p={0}
						colorScheme={'red'}
						onClick={() => {
							handleDelete(post._id);
						}}
					>
						<MdDeleteForever size={25} />
					</Button>
				</div>
			</div>
		</React.Fragment>
	);
}

export default PostManagerCard;
