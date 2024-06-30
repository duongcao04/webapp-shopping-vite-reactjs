import React from 'react';
import PropTypes from 'prop-types';

EmptyLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

function EmptyLayout({children}) {
    return (
        <React.Fragment>
            <main className='w-screen h-screen'>{children}</main>
        </React.Fragment>
    );
}

export default EmptyLayout;