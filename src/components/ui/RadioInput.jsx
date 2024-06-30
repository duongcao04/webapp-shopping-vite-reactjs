import PropTypes from 'prop-types';

import { Box, useRadio } from '@chakra-ui/react';

RadioInput.propTypes = {
	children: PropTypes.node.isRequired
};

function RadioInput(props) {
	const { getInputProps, getRadioProps } = useRadio(props)

	const input = getInputProps()
	const checkbox = getRadioProps()

	return (
		<Box as='label'>
			<input {...input} />
			<Box
				{...checkbox}
				cursor='pointer'
				borderRadius='md'
				boxShadow='md'
				_checked={{
					bg: 'teal.600',
					color: 'white',
					borderColor: 'teal.600',
				}}
				_focus={{
					boxShadow: 'outline',
				}}
				px={5}
				py={3}
			>
				{props.children}
			</Box>
		</Box>
	)
}

export default RadioInput;
