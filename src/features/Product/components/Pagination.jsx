import PropTypes from 'prop-types';
import Button from '@/components/ui/Button';

import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

Pagination.propTypes = {
	totalPage: PropTypes.number,
	currentPage: PropTypes.number.isRequired,
	setCurrentPage: PropTypes.func.isRequired
};

function Pagination({ currentPage, setCurrentPage, totalPage }) {
	return (
		<ul className="flex items-center justify-center gap-5">
			<Button className={'w-[40px] h-[40px] flex items-center justify-center bg-transparent hover:bg-transparent text-black opacity-50 hover:bg-blue-500 transition duration-200 hover:opacity-100 hover:text-white-50'} onClick={() => setCurrentPage(1)} title='Top'>
				<FiChevronsLeft size={25} />
			</Button>
			{new Array(totalPage).fill(0)?.map((item, index) => (
				<li key={index + 1}>
					<Button className={`w-[40px] h-[40px] duration-200 transition-colors ${currentPage === index + 1 ? 'bg-red-500 hover:bg-red-700' : 'hover:bg-red-500 hover:text-white-50 bg-transparent text-red-500 border-red-500 border-2'}`} onClick={() => setCurrentPage(index + 1)}>
						<span>{index + 1}</span>
					</Button>
				</li>
			))}
			<Button className={'w-[40px] h-[40px] flex items-center justify-center bg-transparent hover:bg-transparent text-black opacity-50 hover:bg-blue-500 transition duration-200 hover:opacity-100 hover:text-white-50'} onClick={() => setCurrentPage(totalPage)} title='End'>
				<FiChevronsRight size={25} />
			</Button>
		</ul>
	);
}

export default Pagination;