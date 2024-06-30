import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import { RiEdit2Fill } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';

import formatCash from '@/utils/formatCash';
import productApi from '@/api/productApi';
import FormEditModal from '@/features/Permissions/components/ProductManager/FormEditModal';

ProductList.propTypes = {
  productList: PropTypes.array,
  handleDelete: PropTypes.func,
  fetchData: PropTypes.func.isRequired,
};

function ProductList({ productList, handleDelete, fetchData }) {
  const initialState = {
    name: '',
    imgURL: '',
    decription: '',
    price: '',
    category_id: '',
    supplier_id: '',
  };
  const [EditFormData, setEditFormData] = useState(initialState);
  const [categoryData, setCategoryData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
      try {
        const cateRes = await productApi.getCategory({});
        setCategoryData(cateRes.data?.elements);

        const supplRes = await productApi.getSupplier({});
        setSupplierData(supplRes.data?.elements);
      } catch (error) {
        console.log('Failed to fetch product list', error);
      }
    })();
  }, []);

  const hanldeGetCategoryName = (categoryId) => {
    const foundCategoryIndex = categoryData.findIndex(
      (category) => category._id === categoryId
    );
    if (foundCategoryIndex !== -1) return categoryData[foundCategoryIndex].name;
    return 'Chưa xác định';
  };

  const handleGetSupplierName = (supplierId) => {
    const foundSupplierIndex = supplierData.findIndex(
      (supplier) => supplier._id === supplierId
    );
    if (foundSupplierIndex !== -1) return supplierData[foundSupplierIndex].name;
    return 'Chưa xác định';
  };

  return (
    <React.Fragment>
      <FormEditModal
        isOpen={isOpen}
        onClose={onClose}
        EditFormData={EditFormData}
        setEditFormData={setEditFormData}
        fetchData={fetchData}
        categoryData={categoryData}
        supplierData={supplierData}
      />
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Tên sản phẩm</Th>
              <Th>Ảnh sản phẩm</Th>
              <Th>Danh mục</Th>
              <Th>Nhà cung cấp</Th>
              <Th>Giá</Th>
              <Th>Sửa / Xoá</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productList?.map((product, index) => (
              <Tr key={index}>
                <Td isTruncated>{index + 1}</Td>
                <Td>{product.name}</Td>
                <Td>
                  <img
                    src={product.imgURL}
                    alt={product.name}
                    className='size-[100px] object-contain'
                  />
                </Td>
                <Td>{hanldeGetCategoryName(product.category_id)}</Td>
                <Td>{handleGetSupplierName(product.supplier_id)}</Td>
                <Td isNumeric>{formatCash(product.price + '')}</Td>
                <Td className='space-x-3'>
                  <Button
                    colorScheme='yellow'
                    onClick={() => {
                      setEditFormData(product);
                      onOpen();
                    }}
                  >
                    <RiEdit2Fill size={20} className='text-white-50' />
                  </Button>
                  <Button
                    colorScheme='red'
                    onClick={() => handleDelete(product._id)}
                  >
                    <MdDeleteForever size={20} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default ProductList;
