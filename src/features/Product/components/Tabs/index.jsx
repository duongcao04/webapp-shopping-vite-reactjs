import { useState } from 'react';
import PropTypes from 'prop-types'

import InformationTab from '@/features/Product/components/Tabs/InformationTab';
import RelatedProductsTab from '@/features/Product/components/Tabs/RelatedProductsTab';
import ReviewsTab from '@/features/Product/components/Tabs/ReviewsTab';

Tabs.propTypes = {
	productId: PropTypes.string.isRequired
}

function Tabs({productId}) {
	const [tab, setTab] = useState('reviews');
	return (
		<div>
			{/* Heading */}
			<div className='grid grid-cols-3 text-center'>
				<p onClick={() => setTab('reviews')} className={`${tab === 'reviews' && 'font-semibold text-lg bg-white-200 border-b-primary-700'} cursor-pointer hover:bg-white-200 py-2 border-b-2 border-transparent duration-200 transition`}>
					Reviews
				</p>
				<p onClick={() => setTab('information')} className={`${tab === 'information' && 'font-semibold text-lg bg-white-200 border-b-primary-700'} cursor-pointer hover:bg-white-200 py-2 border-b-2 border-transparent duration-200 transition`}>
					Information
				</p>
				<p onClick={() => setTab('related-products')} className={`${tab === 'related-products' && 'font-semibold text-lg bg-white-200 border-b-primary-700'} cursor-pointer hover:bg-white-200 py-2 border-b-2 border-transparent duration-200 transition`}>
					Related Products
				</p>
			</div>

			<div className='w-full p-3'>
				{tab === 'reviews' && <ReviewsTab productId={productId}/>}
				{tab === 'information' && <InformationTab/>}
				{tab === 'related-products' && <RelatedProductsTab/>}
			</div>
		</div>
	);
}

export default Tabs;
