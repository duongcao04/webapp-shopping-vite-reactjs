import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

import authApi from '@/api/authApi';

import RegisterForm from '@/features/Auth/components/RegisterForm.jsx';

function RegisterPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const initialRegisterForm = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);

  const hanldeRegister = async () => {
    const newUser = {
      fullName: registerForm.fullName,
      email: registerForm.email,
      password: registerForm.password,
    }
    await authApi.registerUser(newUser);
    toast({
      title: 'Register Successfully',
      description: 'Đăng ký tài khoản thành công',
      status: 'success',
      colorScheme: 'green',
      position: 'bottom-right',
      duration: 1000,
      isClosable: true,
    });
    navigate('/dang-nhap')
  }

  return (
    <div className='h-full grid grid-cols-12 gap-6'>
      <div className='col-span-8 bg-gradient-to-br from-cyan-500 via-blue-400 to-blue-600 rounded-tr-[150px] flex items-center justify-center' >
        <p className='text-[200px] font-bold text-white-50'>MilkStore</p>
      </div>

      <div className='col-span-4 pl-16 pr-36'>
        <h2 className='text-4xl font-bold mt-32'>
          Welcome to
          <span className='text-primary-700'> Shop</span>
        </h2>
        <RegisterForm
          registerForm={registerForm}
          setRegisterForm={setRegisterForm}
          hanldeRegister={hanldeRegister}
        />
        <div className='mt-8'>
          <p className='inline-block'>Đã có tài khoản?</p>
          <Link
            to={'/dang-nhap'}
            className='inline-block ml-1 text-primary-700 hover:underline underline-offset-4 transition duration-300'
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
