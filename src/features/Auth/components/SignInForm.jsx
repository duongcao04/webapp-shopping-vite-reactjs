import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    useToast,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import authApi from '@/api/authApi';
import { loginSuccess } from '@/redux/auth.reducer';

function SignInForm() {
    const [email, setEmail] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);
    const [password, setPassword] = useState('');
    const toast = useToast();
    const dispatch = useDispatch();

    const onSubmitHandler = async (data) => {
        data.preventDefault();
        const userLogin = { email, password };
        const res = await authApi.loginUser(userLogin);
        if (res.data.status === 'isOkay') {
            toast({
                title: 'Đăng nhập thành công',
                status: 'success',
                colorScheme: 'green',
                position: 'bottom-right',
                duration: 1000,
                isClosable: true,
            });
            dispatch(loginSuccess(res.data));
        } else {
            toast({
                title: 'Đăng nhập thất bại',
                description: 'Vui lòng kiểm tra tài khoản hoặc mật khẩu',
                status: 'error',
                colorScheme: 'red',
                position: 'bottom-right',
                duration: 1000,
                isClosable: true,
            });
        }
    };

    return (
        <React.Fragment>
            <form onSubmit={onSubmitHandler} className='mt-10'>
                <Stack spacing={6}>
                    <FormControl isRequired>
                        <FormLabel className='whitespace-nowrap' mb={3}>
                            Email
                        </FormLabel>
                        <Input
                            placeholder='caohaiduong@gmail.com'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                    <Button colorScheme={'blue'} mt={3} type='submit'>
                        Đăng nhập
                    </Button>
                </Stack>
            </form>
        </React.Fragment>
    );
}

export default SignInForm;
