import React, { useState } from 'react';

import {
    FormControl,
    FormLabel,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    Stack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

RegisterForm.propTypes = {
    registerForm: PropTypes.object.isRequired,
    setRegisterForm: PropTypes.func,
    hanldeRegister: PropTypes.func,
};

function RegisterForm({ registerForm, setRegisterForm,hanldeRegister }) {
    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        hanldeRegister();
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col justify-start mt-16'>
                    <Stack spacing={6}>
                        <FormControl isRequired>
                            <FormLabel className='whitespace-nowrap' mb={3}>
                                Tên
                            </FormLabel>
                            <Input
                                placeholder='Nhập họ và tên người dùng'
                                value={registerForm.fullName}
                                onChange={(e) =>
                                    setRegisterForm((pre) => ({
                                        ...pre,
                                        fullName: e.target.value,
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
                                type='email'
                                value={registerForm.email}
                                onChange={(e) =>
                                    setRegisterForm((pre) => ({
                                        ...pre,
                                        email: e.target.value,
                                    }))
                                }
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel className='whitespace-nowrap' mb={3}>
                                Password
                            </FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={passwordShow ? 'text' : 'password'}
                                    value={registerForm.password}
                                    onChange={(e)=>setRegisterForm(pre=>({...pre,password:e.target.value}))}
                                    placeholder='••••••••••••'
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button
                                        h='1.75rem'
                                        size='sm'
                                        onClick={() => {
                                            setPasswordShow(!passwordShow);
                                        }}
                                    >
                                        {passwordShow ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel className='whitespace-nowrap' mb={3}>
                                Confirm Password
                            </FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={confirmPasswordShow ? 'text' : 'password'}
                                    value={registerForm.confirmPassword}
                                    onChange={(e)=>setRegisterForm(pre=>({...pre,confirmPassword:e.target.value}))}
                                    placeholder='••••••••••••'
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button
                                        h='1.75rem'
                                        size='sm'
                                        onClick={() => {
                                            setConfirmPasswordShow(!confirmPasswordShow);
                                        }}
                                    >
                                        {confirmPasswordShow ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        {registerForm.confirmPassword !== registerForm.password && <p className='text-sm text-red-500'>Vui lòng nhập kiểm tra lại Password và Confirm Password</p>}

                        <div className='mt-8'>
                            <Button type={'submit'} w={'100%'} colorScheme={'blue'}>
                                Đăng ký
                            </Button>
                        </div>
                    </Stack>
                </div>
            </form>
        </React.Fragment>
    );
}

export default RegisterForm;
