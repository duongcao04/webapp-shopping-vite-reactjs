import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

const Button = forwardRef(({ onClick, children, ...rest }, ref) => {
    const props = { ...rest };
    return (
        <React.Fragment>
            <button
                ref={ref}
                {...props}
                className={cn(
                    'text-white-50 bg-primary-700 w-[260px] h-[40px] font-semibold hover:bg-primary-900 transition duration-300',
                    props.className
                )}
                onClick={onClick}
            >
                {children || 'Click me'}
            </button>
        </React.Fragment>
    );
});

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func
};

Button.displayName = 'Button';

export default Button;