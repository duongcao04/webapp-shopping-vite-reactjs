import React from 'react';
import PropTypes from 'prop-types';
import { TbCalendarMonth } from 'react-icons/tb';
import AdminSidebar from '@/components/Sidebar/AdminSidebar';
import StaffSidebar from '@/components/Sidebar/StaffSidebar';
import { fullDateFormat } from '@/utils/formatDate';
import { Link } from 'react-router-dom';
import { Tooltip } from '@chakra-ui/react';

ManagerLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

function ManagerLayout({ children }) {
	const user = JSON.parse(localStorage.getItem('_user-info'));

	const currentDate = Date.now();
	return (
		<React.Fragment>
			<div className='flex items-start justify-start h-screen overflow-hidden'>
				{user.role === 'admin' && <AdminSidebar />}
				{user.role === 'staff' && <StaffSidebar />}
				<div className='w-full h-screen bg-white-50'>
					<header className='sticky top-0 right-0 h-[80px] bg-white-100 w-full px-9 flex items-center justify-between border-b-[1px] border-white-300 shadow-sm'>
						{user?.role === 'admin' && (
							<h1 className='text-3xl font-bold'>
								<span className='text-red-500'>Admin</span> Dashboard
							</h1>
						)}
						{user?.role === 'staff' && (
							<h1 className='text-3xl font-bold'>
								<span className='text-blue-500'>Staff</span> Dashboard
							</h1>
						)}
						<div className='flex items-center justify-start gap-3 ml-5 px-5 py-2 bg-orange-100 rounded-lg'>
							<TbCalendarMonth size={20} />
							<p className='text-base'>{fullDateFormat(currentDate)}</p>
						</div>
						<Tooltip hasArrow label='Xem thông tin'>
							<Link
								to={'/thong-tin'}
								className='group flex items-center justify-end gap-3 opacity-80 hover:opacity-100 cursor-pointer transition duration-100'
							>
									<p>{user.fullName}</p>
									<img
										src={user.avatar}
										alt='avatar'
										className='size-[40px] object-cover rounded-full'
									/>
							</Link>
						</Tooltip>
						
					</header>
					<main className='text-black w-full px-10'>{children}</main>
				</div>
			</div>
		</React.Fragment>
	);
}

export default ManagerLayout;
