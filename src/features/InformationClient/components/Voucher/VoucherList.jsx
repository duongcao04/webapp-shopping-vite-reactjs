import React from 'react';
import PropTypes from 'prop-types';

import VoucherCard from '@/features/InformationClient/components/Voucher/VoucherCard';

VoucherList.propTypes = {
	voucherData: PropTypes.array.isRequired,
};

function VoucherList({ voucherData }) {
	return (
		<React.Fragment>
			<div>
				<h2 className='text-xl font-bold'>Voucher của bạn</h2>
				<div className='mt-8 grid grid-cols-3 gap-8'>
					{voucherData?.map((item, index) => (
						<VoucherCard key={index} voucher={item}/>
					))}
				</div>
				{/* <div className='col-span-4'>
					<h2 className='text-xl font-bold'>Kho Voucher</h2>
				</div> */}
			</div>
		</React.Fragment>
	);
}

export default VoucherList;
