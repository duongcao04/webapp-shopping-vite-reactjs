import React from 'react'

import BannerCarousel from '@/components/BannerCarousel'
import Brands from '@/components/Brands'
import RelatedPost from '@/components/RelatedPost'
import RecommendForYou from '@/components/RecommendForYou.jsx'

function HomePage() {
    return (
        <React.Fragment>
            <div className='container mx-auto mt-2 space-y-8 pb-16'>
                <BannerCarousel/>
                <Brands/>
                <RelatedPost/>
                <RecommendForYou/>
            </div>
        </React.Fragment>
    )
}

export default HomePage