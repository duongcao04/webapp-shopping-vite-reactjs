import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

OrderInformation.propTypes = {
  orderInformationForm: PropTypes.object.isRequired,
  setOrderInformationForm: PropTypes.func.isRequired,
};

function OrderInformation({ orderInformationForm, setOrderInformationForm }) {
  return (
    <React.Fragment>
      <form>
        <VStack spacing={8}>
          <FormControl isRequired>
            <FormLabel className='whitespace-nowrap' mb={3}>
              Tên
            </FormLabel>
            <Input
              placeholder='Duong Cao'
              maxW={400}
              value={orderInformationForm.name}
              onChange={(e) =>
                setOrderInformationForm((pre) => ({ ...pre, name: e.target.value }))
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel className='whitespace-nowrap' mb={3}>
              Địa chỉ
            </FormLabel>
            <Input
              placeholder='Quận 12, TP. HCM'
              value={orderInformationForm.address}
              onChange={(e) =>
                setOrderInformationForm((pre) => ({ ...pre, address: e.target.value }))
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel className='whitespace-nowrap' mb={3}>
              Số điện thoại
            </FormLabel>
            <Input
              placeholder='(+84) 123 456 789'
              value={orderInformationForm.phoneNumber}
              onChange={(e) =>
                setOrderInformationForm((pre) => ({
                  ...pre,
                  phoneNumber: e.target.value,
                }))
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel className='whitespace-nowrap' mb={3}>
              Email
            </FormLabel>
            <Input
              placeholder='caohaiduong@gmail.com'
              value={orderInformationForm.email}
              onChange={(e) =>
                setOrderInformationForm((pre) => ({ ...pre, email: e.target.value }))
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel className='whitespace-nowrap' mb={3}>
              Ghi chú đơn hàng
            </FormLabel>
            <Textarea
              placeholder='Ghi chú...'
              value={orderInformationForm.note}
              onChange={(e) =>
                setOrderInformationForm((pre) => ({ ...pre, note: e.target.value }))
              }
            />
          </FormControl>
        </VStack>
      </form>
    </React.Fragment>
  );
}

export default OrderInformation;
