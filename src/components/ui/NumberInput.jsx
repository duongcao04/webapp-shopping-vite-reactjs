import { decrementQuantity, incrementQuantity } from '@/redux/cart.reducer';
import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

NumberInput.propTypes = {
  defaultValue: PropTypes.number,
  productId: PropTypes.string.isRequired,
};

function NumberInput({ defaultValue, productId }) {
  const dispatch = useDispatch();
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: defaultValue ?? 1,
      min: 1,
      max: 99,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack>
      <Button {...inc} onClick={() => dispatch(incrementQuantity(productId))}>
        +
      </Button>
      <Input {...input} maxW='55px' />
      <Button {...dec} onClick={() => dispatch(decrementQuantity(productId))}>
        -
      </Button>
    </HStack>
  );
}

export default NumberInput;
