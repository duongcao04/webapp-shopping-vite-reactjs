import React from 'react';
import {Link} from 'react-router-dom';

import SearchBar from '@/components/Header/Searchbar';
import Navbar from '@/components/Header/Navbar';
import UserAction from '@/components/Header/UserAction';

function Header() {
    return (<React.Fragment>
        <div className='fixed z-20 bg-white-50 w-full'>
            <div className='container h-16 flex items-center justify-center'>
                <Link
                id='brand-logo'
                className='px-4 text-3xl font-extrabold max-w-fit'
                to={'/'}
            >
                <span className='text-blue-700'>Milk</span>
                Shop
                </Link>

                <div id='navigate' className='w-full flex items-center justify-between'>
                    <div className='min-w-fit'><Navbar/></div>
                    <div className='w-full'><SearchBar/></div>
                    <div className='min-w-fit'><UserAction/></div>
                </div>
            </div>
        </div>
    </React.Fragment>);
}

export default Header;
