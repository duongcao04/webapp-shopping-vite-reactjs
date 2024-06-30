import Input from '@/components/ui/Input';
import PropTypes from 'prop-types';
import { FaChevronDown } from 'react-icons/fa';

function CategoryFilter({ categoryData, category, setCategory }) {
	const HandleChange = (e) => {
		setCategory(pre => {
			if (category.includes(e.target.value)) {
				return category.filter(i => i !== e.target.value)
			}
			return [...pre, e.target.value]
		})
	}
	return (
		<div className='mt-5'>
			<div className='w-full flex items-center justify-between cursor-pointer'>
				<h2 className='uppercase font-medium'>Danh mục</h2>
				<FaChevronDown size={15} />
			</div>
			<ul className='ml-4'>
				{categoryData?.map((category, index) => (
					<li key={index} className='flex items-center gap-3 py-1 my-1'>
						<Input type='checkbox' name={category._id} id={category._id} value={category._id} onChange={HandleChange} />
						<label htmlFor={category._id}>{category.name}</label>
					</li>
				))}
			</ul>
		</div>
	);
}

CategoryFilter.propTypes = {
	categoryData: PropTypes.array.isRequired,
	category: PropTypes.array.isRequired,
	setCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;