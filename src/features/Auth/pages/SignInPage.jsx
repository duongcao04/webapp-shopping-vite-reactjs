import { Link } from 'react-router-dom'
import SignInForm from '@/features/Auth/components/SignInForm.jsx'

function SignInPage() {
    return (
        <div className='h-full grid grid-cols-12 gap-6'>
            <div className='col-span-8 bg-gradient-to-br from-cyan-500 via-blue-400 to-blue-600 rounded-tr-[150px] flex items-center justify-center' >
            <p className='text-[200px] font-bold text-white-50'>MilkStore</p>
            </div>
            

            <div className='col-span-4 pl-16 pr-36'>
                <h2 className='text-center text-4xl font-bold mt-60'>Welcome back !</h2>
                <SignInForm />
                <div className='mt-8'>
                    <p className='inline-block'>Bạn là thành viên mới?</p>
                    <Link
                        to={'/dang-ky'}
                        className='inline-block ml-1 text-primary-700 hover:underline underline-offset-4 transition duration-300'
                    >
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignInPage
