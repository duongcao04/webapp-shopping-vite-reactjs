import React from 'react';
import PropTypes from 'prop-types';

RelationPost.propTypes = {

};

function RelationPost(props) {
	return (
		<React.Fragment>
			<div className='w-full border-[1px] p-4 shadow-sm'>
				<img
					src={
						'https://images.pexels.com/photos/21937092/pexels-photo-21937092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
					}
					alt='picture'
					className='w-full max-h-[250px] object-cover'
				/>

				<div className='mt-4'>
					<p className='text-xl font-semibold'>This is the title of the Post</p>
					<p className='mt-3 line-clamp-2'>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
						repellendus aut iusto saepe doloremque a qui libero sit explicabo
						unde incidunt excepturi, tempora perferendis fuga vel dicta eius
						doloribus! Nesciunt. Labore corrupti itaque est iusto ducimus id
						eaque ex possimus velit amet ipsa non, a obcaecati necessitatibus
						nisi voluptatum, culpa assumenda omnis commodi porro rerum,
						inventore illum accusamus error. Neque!
					</p>
				</div>
			</div>
		</React.Fragment>
	);
}

export default RelationPost;