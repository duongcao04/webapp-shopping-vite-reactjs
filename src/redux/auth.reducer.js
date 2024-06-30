import { createSlice } from '@reduxjs/toolkit'
import { getCookie, setCookie, removeCookie } from '@/utils/cookie_services'

export const authSlice = createSlice({
    name: 'auth',
    initialState: () => {
        const getUserInfo = JSON.parse(localStorage.getItem('_user-info'))
        const getToken = getCookie('token')

        if (getUserInfo && getToken) {
            return {
                userToken: getToken,
                userInfo: getUserInfo,
                isLoading: false,
                isSuccess: true,
                isError: false
            }
        }

        return {
            userToken: null,
            userInfo: null,
            isLoading: false,
            isSuccess: false,
            isError: false
        }
    },
    reducers: {
        loginStart: (state) => {
            state.isLoading = true
        },
        loginSuccess: (state, action) => {
            state.userToken = action.payload.token
            state.userInfo = action.payload.elements
            state.isLoading = false
            state.isSuccess = true
            state.isError = false

            let currentUserToken = action.payload.token
            let currentUser = action.payload.elements
            localStorage.setItem('_user-info', JSON.stringify(currentUser));
            setCookie('token', currentUserToken, 30)

            if (
                currentUser.role === 'admin' ||
                currentUser.role === 'staff'
            ) {
                window.location = "/dashboard"
            } else {
                window.location = "/"
            }
        },
        loginFailed: (state) => {
            state.isLoading = false
            state.isError = true
        },
        logout: (state) => {
            state.userToken = null
            state.userInfo = null
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            localStorage.removeItem('_user-info')
            removeCookie('token')
            window.location = "/"
        }
    }
})

export const { loginStart, loginSuccess, loginFailed, logout } =
    authSlice.actions

export default authSlice.reducer
