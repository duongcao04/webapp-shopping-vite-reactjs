import {Link, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types'
import {GoHomeFill} from "react-icons/go";

import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter.js";

function Breadcrumbs({slug}) {
    const location = useLocation();
    const locationList = location.pathname.split("/").slice(1);
    if (slug) {
        locationList[locationList.length - 1 ] = slug
    }

    return (
        <div className='container mx-auto flex items-center justify-start text-base'>
            <Link to='/' className='opacity-70 hover:opacity-100'><GoHomeFill size={25}/></Link>
            <ul className='flex items-center justify-end'>
                {locationList?.map((item, index) => (
                    <li key={index} className='opacity-70 last:opacity-100'>
                        <span className='px-3'>/</span>
                        <span>{capitalizeFirstLetter(item)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
Breadcrumbs.propTypes = {
    slug: PropTypes.string
}
export default Breadcrumbs;