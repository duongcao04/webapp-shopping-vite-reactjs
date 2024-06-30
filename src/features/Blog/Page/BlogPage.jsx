import React, { useEffect, useState } from 'react';

import { FaSort } from 'react-icons/fa';

import NewestPostCard from '@/features/Blog/components/PostCard/NewestPostCard';
import PostCard from '@/features/Blog/components/PostCard/PostCard';
import RelationPost from '@/features/Blog/components/PostCard/RelationPost';

import MilkVector from '/public/milk-icon.png';
import { Button } from '@chakra-ui/react';
import postApi from '@/api/postApi';
import { Link } from 'react-router-dom';

function BlogPage() {
  const [isSortByDate, setIsSortByDate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState([]);
  const [newestPost, setNewestPost] = useState([]);

  const fetchData = async () => {
    const params = {};
    const res = await postApi.getAll(params);
    const estPostEes = await postApi.getNewestPost();
    setPostData(res.data.elements);
    setNewestPost(estPostEes);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(postData);

  return (
    <React.Fragment>
      <div className='container pb-20'>
        <div className='flex items-start justify-start gap-8 ml-56 my-12'>
          <img src={MilkVector} alt='vector' className='size-[100px]' />
          <h1 className='text-3xl font-bold mt-2'>Bài viết hữu ích</h1>
        </div>

        {isLoading && <h1>Loading...</h1>}
        {!isLoading && (
          <div className='grid grid-cols-12 gap-8'>
            <div className='col-span-9'>
              <h2 className='text-2xl font-bold'>Bài viết mới nhất</h2>
              <div className='w-full pt-8 pb-10 border-white-500 border-b-[2px]'>
                <NewestPostCard post={newestPost} />
              </div>
              <div className='pt-10'>
                <div className='flex items-center justify-between gap-8'>
                  <h2 className='text-2xl font-bold'>Tất cả bài viết</h2>
                  <div title='Sort by Date'>
                    <Button
                      p={1}
                      mr={4}
                      onClick={() => setIsSortByDate(!isSortByDate)}
                    >
                      <FaSort size={18} />
                    </Button>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-10 mt-8'>
                  {postData?.map((item, index) => (
                    <Link
                      to={`/blog/${item._id}`}
                      className='block'
                      key={index}
                    >
                      <PostCard post={item} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className='col-span-3'>
              <h2 className='text-2xl font-bold'>Dành cho bạn</h2>
              <div className='mt-8 flex flex-col items-center justify-start gap-10'>
                {new Array(5).fill(0).map((item, index) => (
                  <RelationPost key={index} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default BlogPage;
