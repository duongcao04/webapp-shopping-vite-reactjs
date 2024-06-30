import PropTypes from 'prop-types';
import { FaChevronDown } from 'react-icons/fa';

BrandFilter.propTypes = {

};

function BrandFilter({}) {
	return (
		<div className='mt-5'>
			<div className='w-full flex items-center justify-between cursor-pointer'>
				<h2 className='uppercase font-medium'>Thương hiệu</h2>
				<FaChevronDown size={15} />
			</div>
			<ul className='ml-4'>
				{new Array(8).fill('Brand test').map((category, index) => (
					<li key={index} className='py-1 my-1'>
						{category}
					</li>
				))}
			</ul>
		</div>
	);
}

export default BrandFilter;