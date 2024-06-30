import React from 'react';
import PropTypes from 'prop-types';
import Header from '@/components/Header/index';
import Footer from '@/components/Footer/index';

DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

function DefaultLayout({ children }) {
	return (
		<React.Fragment>
			<header className='w-full bg-white-50 shadow-2xl'>
				<Header />
			</header>
			<main className='text-black pt-16 min-h-[calc(100vh-88px)]'>
				{children}
			</main>
			<footer>
				<Footer />
			</footer>
		</React.Fragment>
	);
}

export default DefaultLayout;
