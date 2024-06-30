import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { PiEyeClosed, PiEye } from 'react-icons/pi';
import { FaStarOfLife } from "react-icons/fa";
import { cn } from '@/utils/cn';

const Input = forwardRef(({ label, type,name,required, onClick, onChange, onFocus,onBlur, ...rest }, ref) => {
	const [isShowPassword, setIsShowPassword] = useState(false);
	const props = { ...rest };

	const handleTypeProp = () => {
		if (isShowPassword && type === 'password') {
			return 'text'
		}
		if (!isShowPassword && type === 'password') {
			return 'password'
		}
		if (type) {
			return type;
		}
		return 'text';
	};

	return (
		<React.Fragment>
			<div className={`relative ${label && 'max-w-fit flex flex-col justify-start'}`}>
				{label && <label htmlFor={name} className='mb-2'>{label}</label>}
				<input
					name={name}
					ref={ref}
					type={handleTypeProp()}
					{...props}
					className={cn(
						'border-b-[2px] border-solid border-black focus:outline-none',
						props.className
					)}
					onClick={onClick}
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
				{type === 'password' && (
					<div
						className='absolute top-[58%] right-3 cursor-pointer'
						onClick={() => setIsShowPassword(!isShowPassword)}
					>
						{isShowPassword ? <PiEyeClosed size={23}/> : <PiEye size={23}/>}
					</div>
				)}
				{required && <FaStarOfLife className='absolute top-2 right-3 text-red-500' size={8}/>}
			</div>
		</React.Fragment>
	);
});

Input.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	name: PropTypes.string,
	required: PropTypes.bool,
	type: PropTypes.string,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func
};

Input.defaultProps = {
	required: false,
}

Input.displayName = 'Input';

export default Input;