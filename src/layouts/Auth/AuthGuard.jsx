import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

AuthGuard.propTypes = {
    children: PropTypes.node.isRequired,
};

function AuthGuard({ children }) {
    const currentUser = useSelector((state) => state.auth.userInfo);
    if (!currentUser) return <Navigate to='/dang-nhap' replace />;

    return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
