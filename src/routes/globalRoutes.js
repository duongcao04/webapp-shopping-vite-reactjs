import HomePage from '@/pages/Homepage';
import ProductsPage from '@/features/Product/pages/ProductsPage';
import ProductDetailPage from '@/features/Product/pages/DetailPage';
import BlogDetailPage from '@/features/Blog/Page/DetailPage';
import AboutUs from '@/pages/AboutUs';
import CartPage from '@/pages/CartPage';
import ErrorPage from '@/pages/ErrorPage';
import BlogPage from '@/features/Blog/Page/BlogPage';
import SignInPage from '@/features/Auth/pages/SignInPage';
import EmptyLayout from '@/layouts/EmptyLayout';
import RegisterPage from '@/features/Auth/pages/RegisterPage';
import AccountPage from '@/features/InformationClient/pages/AccountPage';
import HistoryOrder from '@/features/Order/pages/HistoryOrder';
import OrderPage from '@/features/Order/pages/OrderPage'

const publicRoute = [
	{ path: '/', component: HomePage },
	{ path: '/san-pham', component: ProductsPage },
	{ path: '/san-pham/:id', component: ProductDetailPage },
	{ path: '/blog', component: BlogPage },
	{ path: '/blog/:id', component: BlogDetailPage },
	{ path: '/ve-chung-toi', component: AboutUs },
	{ path: '/gio-hang', component: CartPage },
	{
		path: '/dang-nhap',
		component: SignInPage,
		layout: EmptyLayout,
		auth: false,
	},
	{
		path: '/dang-ky',
		component: RegisterPage,
		layout: EmptyLayout,
		auth: false,
	},
	{ path: '/thong-tin-ca-nhan', component: AccountPage, auth: true },
	{ path: '/mua-hang', component: OrderPage, auth: true },
	{ path: '/lich-su-mua-hang', component: HistoryOrder, auth: true },
	{ path: '*', component: ErrorPage, layout: EmptyLayout },
];

export default publicRoute;
