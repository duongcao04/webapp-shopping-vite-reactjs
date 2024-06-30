import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import userApi from '@/api/userApi';
import {fullDateFormat} from '@/utils/formatDate';

ReviewCard.propTypes = {
	review: PropTypes.object.isRequired,
};

function ReviewCard({ review }) {
	const [userData, setUserData] = useState([]);

	useEffect(() => {
		(async () => {
			const userId = review.user_id;
			const res = await userApi.getUserProfile(userId);
			setUserData(res.data.elements);
		})();
	}, [review.user_id]);

	return (
		<React.Fragment>
			<div className='mb-16'>
				<div className='flex items-start justify-start gap-5'>
					<img
						src={userData?.avatar}
						alt={userData?.name}
						className='size-[50px] rounded-full'
					/>
					<div className='flex flex-col items-start justify-start gap-1'>
						<div className='flex items-center justify-start gap-3'>
							<p className='font-semibold'>{userData?.fullName}</p>
							<div className='h-[15px] w-[2px] bg-white-300' />
							<p className='text-xs opacity-80'>{fullDateFormat(review.createdAt)}</p>
						</div>
						<div className='flex items-center'>
							{new Array(+review.rating).fill(0).map((item, index) => (
								<div key={index}>
									<FaStar color='#FFC107' />
								</div>
							))}
							{new Array(5 - review.rating).fill(0).map((item, index) => (
								<div key={index}>
									<FaStar color='#e4e5e9' />
								</div>
							))}
						</div>
					</div>
				</div>
				<div className='mt-5'>
					<p>
						{review.comment}
					</p>
				</div>
			</div>
		</React.Fragment>
	);
}

export default ReviewCard;
