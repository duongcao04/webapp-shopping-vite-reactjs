import React from 'react';
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

FormEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  EditFormData: PropTypes.object.isRequired,
  setEditFormData: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  categoryData: PropTypes.array.isRequired,
  supplierData: PropTypes.array.isRequired,
};

function FormEditModal({
  isOpen,
  onClose,
  EditFormData,
  setEditFormData,
  fetchData,
  categoryData,
  supplierData,
}) {
  const toast = useToast();
  const initialState = {
    name: '',
    imgURL: '',
    decription: '',
    price: '',
    category_id: '',
    supplier_id: '',
  };
  const handleEdit = async () => {
    setEditFormData(EditFormData);
    await productApi.updateProduct(EditFormData._id, EditFormData);
    toast({
      title: 'Edit Successfully',
      description: 'Chỉnh sửa sản phẩm thành công',
      status: 'success',
      colorScheme: 'yellow',
      position: 'top-right',
      duration: 1000,
      isClosable: true,
    });
    fetchData();
    onClose();
    setEditFormData(initialState);
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
                  value={EditFormData.name}
                  onChange={(e) =>
                    setEditFormData((pre) => ({ ...pre, name: e.target.value }))
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel className='whitespace-nowrap' mb={3}>
                  Ảnh sản phẩm
                </FormLabel>
                <Input
                  placeholder='URL'
                  value={EditFormData.imgURL}
                  onChange={(e) =>
                    setEditFormData((pre) => ({
                      ...pre,
                      imgURL: e.target.value,
                    }))
                  }
                />
              </FormControl>
              {EditFormData?.imgURL && (
                <Flex gap={20} alignItems={'flex-start'}>
                  <Text>Preview</Text>
                  <Img
                    src={EditFormData.imgURL}
                    alt='preview'
                    className='h-[200px] object-contain'
                  />
                </Flex>
              )}

              <FormControl>
                <FormLabel className='whitespace-nowrap' mb={3}>
                  Mô tả sản phẩm
                </FormLabel>
                <Input
                  placeholder='Nhập mô tả sản phẩm'
                  value={EditFormData.decription}
                  onChange={(e) =>
                    setEditFormData((pre) => ({
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
                  <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                    $
                  </InputLeftElement>
                  <Input
                    placeholder='Giá tiền'
                    value={EditFormData.price}
                    onChange={(e) =>
                      setEditFormData((pre) => ({
                        ...pre,
                        price: e.target.value,
                      }))
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
                  value={EditFormData.supplier_id}
                  onChange={(e) =>
                    setEditFormData((pre) => ({
                      ...pre,
                      supplier_id: e.target.value,
                    }))
                  }
                >
                  {supplierData?.map((supplier, index) => (
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
                  value={EditFormData.category_id}
                  onChange={(e) =>
                    setEditFormData((pre) => ({
                      ...pre,
                      category_id: e.target.value,
                    }))
                  }
                >
                  {categoryData?.map((category, index) => (
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
              colorScheme='yellow'
              onClick={() => {
                handleEdit();
              }}
            >
              Cập nhật
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}

export default FormEditModal;
