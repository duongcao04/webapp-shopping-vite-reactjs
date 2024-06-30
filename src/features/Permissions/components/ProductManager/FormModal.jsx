import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Img,
  Select,
  useToast,
  Stack,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import productApi from '@/api/productApi';

FormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

function FormModal({ isOpen, onClose, fetchData }) {
  const toast = useToast();
  const [categoryData, setCategoryData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);

  const initialState = {
    name: '',
    imgURL: '',
    decription: '',
    price: '',
    category_id: '',
    supplier_id: '',
  };
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    (async () => {
      try {
        const cateRes = await productApi.getCategory({});
        setCategoryData(cateRes.data);

        const supplRes = await productApi.getSupplier({});
        setSupplierData(supplRes.data);
      } catch (error) {
        console.log('Failed to fetch product list', error);
      }
    })();
  }, []);

  const handleAddProduct = async () => {
    const newProduct = formData;
    await productApi.createProduct(newProduct);
    toast({
      title: 'Add Successfully',
      description: 'Thêm sản phẩm thành công',
      status: 'success',
      colorScheme: 'green',
      position: 'top-right',
      duration: 1000,
      isClosable: true,
    });
    fetchData();
    setFormData(initialState);
    onClose();
  };

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />

        <ModalContent maxWidth={'1240px'}>
          <ModalHeader>Thêm mới sản phẩm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={6}>
              <FormControl isRequired>
                <FormLabel className='whitespace-nowrap' mb={3}>
                  Tên sản phẩm
                </FormLabel>
                <Input
                  placeholder='Nhập tên sản phẩm'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((pre) => ({ ...pre, name: e.target.value }))
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel className='whitespace-nowrap' mb={3}>
                  Ảnh sản phẩm
                </FormLabel>
                <Input
                  placeholder='URL'
                  value={formData.imgURL}
                  onChange={(e) =>
                    setFormData((pre) => ({ ...pre, imgURL: e.target.value }))
                  }
                />
              </FormControl>
              {formData?.imgURL && (
                <Flex gap={20} alignItems={'flex-start'}>
                  <Text>Preview</Text>
                  <Img
                    src={formData.imgURL}
                    alt='preview'
                    className='h-[200px] object-contain'
                    onError={(e) => {
                      e.target.src =
                        'https://cdn1.link-assistant.com/thumbs/w500-c1/upload/news/posts/556/Fixing-Broken.png';
                    }}
                  />
                </Flex>
              )}

              <FormControl>
                <FormLabel className='whitespace-nowrap' mb={3}>
                  Mô tả sản phẩm
                </FormLabel>
                <Input
                  placeholder='Nhập mô tả sản phẩm'
                  value={formData.decription}
                  onChange={(e) =>
                    setFormData((pre) => ({
                      ...pre,
                      decription: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel className='whitespace-nowrap' mb={3}>
                  Giá tiền
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                  >
                    $
                  </InputLeftElement>
                  <Input
                    placeholder='Giá tiền'
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((pre) => ({ ...pre, price: e.target.value }))
                    }
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel className='whitespace-nowrap' mb={3}>
                  Nhà cung cấp
                </FormLabel>
                <Select
                  placeholder='Chọn nhà cung cấp'
                  onChange={(e) =>
                    setFormData((pre) => ({
                      ...pre,
                      supplier_id: e.target.value,
                    }))
                  }
                >
                  {supplierData?.elements?.map((supplier, index) => (
                    <option value={supplier._id} key={index}>
                      {supplier.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel className='whitespace-nowrap' mb={3}>
                  Danh mục
                </FormLabel>
                <Select
                  placeholder='Chọn danh mục'
                  onChange={(e) =>
                    setFormData((pre) => ({
                      ...pre,
                      category_id: e.target.value,
                    }))
                  }
                >
                  {categoryData?.elements?.map((category, index) => (
                    <option value={category._id} key={index}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Huỷ
            </Button>
            <Button
              colorScheme='green'
              onClick={() => {
                handleAddProduct();
              }}
            >
              Thêm mới
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}

export default FormModal;
