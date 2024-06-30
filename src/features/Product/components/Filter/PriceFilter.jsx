import PropTypes from 'prop-types';
import { FaChevronDown } from 'react-icons/fa';
import filterPrice from '@/constants/filterPrice';
import Input from '@/components/ui/Input';

PriceFilter.propTypes = {
	setPrice: PropTypes.func.isRequired,
};

function PriceFilter({ setPrice }) {
	return (
		<div className='mt-5'>
			<div className='w-full flex items-center justify-between cursor-pointer'>
				<h2 className='uppercase font-medium'>Giá tiền</h2>
				<FaChevronDown size={15} />
			</div>
			<ul className='ml-4'>
				{filterPrice?.map((price, index) => (
					<li key={index} className='flex items-center gap-3 py-1 my-1'>
						<Input
							type='radio'
							name='price'
							id={price.label}
							value={price.value}
							onChange={(e) => setPrice(e.target.value)}
						/>
						<label htmlFor={price.label}>{price.label}</label>
					</li>
				))}
			</ul>
		</div>
	);
}

export default PriceFilter;
