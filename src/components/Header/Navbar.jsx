import { FaChevronDown, FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

import navigates from '@/constants/navigates';

function Navbar() {
	return (
		<nav>
			<ul className='relative flex items-center justify-start text-sm'>
				{navigates.map((navigate, index) => (
					<li key={index} className='group mx-3 py-6'>
						<Link
							to={navigate.path}
							className='px-3 font-medium opacity-70 hover:opacity-100 flex items-center justify-start gap-2'
						>
							{navigate.label}
							{navigate.children && (
								<FaChevronDown
									size={10}
									className='group-hover:rotate-180 transition duration-200'
								/>
							)}
						</Link>

						{navigate.children && (
							<ul className='hidden group-hover:block absolute bg-white-50 top-full left-2 shadow-[0px_10px_40px_rgba(0,0,0,0.05)] py-4 px-5 rounded-xl border-[1px] border-solid border-black-100'>
								{navigate?.children.map((navChild, idxChild) => (
									<li key={idxChild}>
										<Link
											to={navChild.path}
											className='flex items-center rounded-md py-3 pl-4 pr-6 duration-300 hover:bg-white-400 dark:hover:bg-black-800 mb-2'
										>
											{navChild.label}
											{navChild.children && (
												<FaChevronRight
													size={10}
													className='group-hover:rotate-180 transition duration-200'
												/>
											)}
										</Link>
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
}

export default Navbar;
