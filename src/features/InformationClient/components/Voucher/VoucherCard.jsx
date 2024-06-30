import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { Button } from '@chakra-ui/react';

import { MdDeleteForever } from 'react-icons/md';
import { longDateFormat } from '@/utils/formatDate';

VoucherCard.propTypes = {
	voucher: PropTypes.object.isRequired,
	handleDelete: PropTypes.func,
	showButton: PropTypes.bool
};

function VoucherCard({ voucher, handleDelete, showButton }) {
	const isShowButton = showButton ?? true;
	const user = useSelector((state) => state.auth.userInfo);

	return (
		<React.Fragment>
			<div className='bg-yellow-50 rounded-lg border-[1px] border-yellow-500 shadow-sm px-7 py-5'>
				<div className='flex items-start justify-between gap-8'>
					<div>
						<p className='text-blue-500'>#{voucher?._id}</p>
						<p className='text-lg font-bold mt-1'>{voucher?.name}</p>
					</div>
					{(user.role === 'admin' || user.role === 'staff') && (
						<Button p={0} colorScheme={'red'} onClick={() => { handleDelete(voucher?._id) }}>
							<MdDeleteForever size={25} />
						</Button>
					)}
				</div>
				<div className='mt-8 flex items-end justify-between gap-8'>
					<div>
						<p className='text-xs '>
							<span className='opacity-80'>Code: </span>
							<span className='text-lg font-medium ml-2 text-red-500 uppercase'>
								{voucher?.code}
							</span>
						</p>
						<p className='mt-4 rounded-md px-4 py-1 bg-yellow-200 text-sm font-medium w-fit'>
							Hết hạn vào ngày {longDateFormat(voucher?.expiryDate)}
						</p>
					</div>
					{(isShowButton && user.role === 'member') && <Button
						bgColor={'yellow.500'}
						color={'white'}
						_hover={{ bgColor: 'yellow.700' }}
					>
						Sử dụng
					</Button>}
				</div>
			</div>
		</React.Fragment>
	);
}

export default VoucherCard;
