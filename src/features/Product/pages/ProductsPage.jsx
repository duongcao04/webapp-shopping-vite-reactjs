import { useEffect, useState } from 'react';

import productApi from '@/api/productApi';

import FilterBar from '@/features/Product/components/Filter/FilterBar';
import ProductCard from '@/features/Product/components/ProductCard';
import Pagination from '@/features/Product/components/Pagination';

function ProductsPage() {
  const currentUri = decodeURI(window.location);
  console.log(currentUri.split('=')[1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState({});

  const [productsData, setProductsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let params, prodRes;
        if (filterValue == false) {
          params = { sortBy: '-price', limit: '16', page: currentPage, name: currentUri.split('=')[1] };
          prodRes = await productApi.pagination(params);
        } else {
          params = { categoryId: filterValue.category, price: filterValue.price, sortBy: '-price', limit: '16', page: currentPage, name: currentUri.split('=')[1] };
          prodRes = await productApi.filter(params);
          setProductsData(prodRes.data);
        }
        setProductsData(prodRes.data);
        const cateRes = await productApi.getCategory({});
        setCategoryData(cateRes.data.elements);
      } catch (error) {
        console.log('Failed to fetch product list', error);
      }
    })();
  }, [currentPage, filterValue, currentUri]);

  return (
    <div className='container pb-16'>
      <h1 className='text-2xl font-bold my-7 uppercase'>Danh sách sản phẩm</h1>
      <div className='grid grid-cols-12 gap-10'>
        <div className='sticky top-[80px] col-span-3 bg-white-50 rounded-md h-fit'>
          <FilterBar categoryData={categoryData} setFilter={setFilterValue} />
        </div>
        <div className='col-span-9'>
          <div className='w-full grid grid-cols-4 gap-5'>
            {productsData?.elements?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <div className='mt-8'>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={productsData.totalPage ?? 1} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
