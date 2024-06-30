import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TbSettings, TbLogout2 } from 'react-icons/tb';
import {
	TbSmartHome,
	TbTicket,
	TbUsers,
	TbBrandDatabricks,
	TbBrandBlogger,
	TbAugmentedReality,
	TbAlignBoxLeftStretch
} from 'react-icons/tb';
import { FaChevronLeft } from 'react-icons/fa';
import { logout } from '@/redux/auth.reducer';

function AdminSidebar() {
	const [childrenOpen, setChildrenOpen] = useState(false);

	const managerNavigation = [
		{ path: '/dashboard', label: 'Trang chủ', icon: TbSmartHome },
		{
			path: '#',
			label: 'Quản lý',
			icon: TbAugmentedReality,
			children: [
				{
					path: '/dashboard/product',
					label: 'Sản phẩm',
					icon: TbBrandDatabricks,
				},
				{ path: '/dashboard/customer', label: 'Khách hàng', icon: TbUsers },
				{ path: '/dashboard/voucher', label: 'Voucher', icon: TbTicket },
				{ path: '/dashboard/post', label: 'Bài viết', icon: TbBrandBlogger },
			],
		},
		{ path: '/dashboard/report', label: 'Báo cáo', icon:TbAlignBoxLeftStretch }
	];

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/');
	};
	return (
		<React.Fragment>
			<div className='sticky top-0 left-0 h-screen bg-red-500 w-[350px] px-6 text-white-50'>
				<div className='flex items-center justify-center py-5 border-b-[2px]'>
					<Link
						id='brand-logo'
						className='text-3xl font-extrabold max-w-fit'
						to={'#'}
					>
						<span className='text-white-50 tracking-wider'>MilkShop</span>
					</Link>
				</div>
				<div className='mt-10 ml-3 h-[calc(100vh-150px)] flex flex-col justify-between'>
					<div>
						<nav>
							<ul>
								{managerNavigation?.map((item, index) => (
									<li key={index} className='w-full mb-4'>
										<Link
											to={item.path}
											className='flex items-center justify-between px-4 py-3 rounded-md opacity-80 transition duration-100 hover:shadow-md hover:bg-white-50 hover:text-black'
											onClick={() => {
												item.label === 'Quản lý' && setChildrenOpen(!childrenOpen);
											}}
										>
											<div className='flex items-center justify-start gap-5'>
												<item.icon size={25} />
												<p className='text-lg font-semibold'>{item.label}</p>
											</div>
											{item.children && (
												<FaChevronLeft
													size={15} 
														className={`${childrenOpen ? '-rotate-90' : ''} transition`}
													/>
											)}
										</Link>
										{item.children && childrenOpen && (
											<ul className='mt-3 ml-6 pl-3 border-l-[2px]'>
												{item.children.map((child, index) => (
													<li key={index} className='w-full mb-4'>
														<Link
															to={child.path}
															className='flex items-center justify-between px-4 py-3 rounded-md opacity-80 transition duration-100 hover:shadow-md  hover:bg-white-50 hover:text-black'
														>
															<div className='flex items-center justify-start gap-5'>
																<child.icon size={25} />
																<p className='text-lg font-semibold'>
																	{child.label}
																</p>
															</div>
														</Link>
													</li>
												))}
											</ul>
										)}
									</li>
								))}
							</ul>
						</nav>
					</div>
					<div>
						<div className='w-full mb-4'>
							<div className='cursor-pointer flex items-center justify-start gap-5 px-4 py-3 rounded-md opacity-80 transition duration-200 hover:bg-white-50 hover:text-black'>
								<TbSettings size={25} />
								<p className='text-lg font-semibold'>Setting</p>
							</div>
						</div>
						<div className='w-full mb-4'>
							<div
								className='cursor-pointer flex items-center justify-start gap-5 px-4 py-3 rounded-md opacity-80 transition duration-200 hover:bg-white-50 hover:text-black'
								onClick={() => {
									handleLogout();
								}}
							>
								<TbLogout2 size={25} />
								<p className='text-lg font-semibold'>Logout</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default AdminSidebar;
