import { useState } from 'react';
import PropTypes from 'prop-types';
import CategoryFilter from '@/features/Product/components/Filter/CategoryFilter';
import PriceFilter from '@/features/Product/components/Filter/PriceFilter';
import { Button } from '@chakra-ui/react';

function FilterBar({ categoryData, setFilter }) {
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [price, setPrice] = useState('');

  return (
    <div className='w-full pl-4 pr-3 pt-4 pb-10'>
      <h1 className='text-lg font-semibold pb-2 border-b-2 border-black'>
        Bộ lọc sản phẩm
      </h1>
      <CategoryFilter categoryData={categoryData} category={category} setCategory={setCategory} />
      {/* <BrandFilter brand={brand} setBrand={setBrand} /> */}
      <PriceFilter setPrice={setPrice} />

      <div className='w-full grid place-items-center'>
        <Button
          colorScheme={'red'}
          className={'w-[90%] mt-6 bg-red-500 hover:bg-red-700 rounded-xl'}
          onClick={() => setFilter({ category: category.toString(','), brand, price })}
        >
          Lọc
        </Button>
      </div>
    </div>
  );
}

FilterBar.propTypes = {
  categoryData: PropTypes.array.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default FilterBar;
