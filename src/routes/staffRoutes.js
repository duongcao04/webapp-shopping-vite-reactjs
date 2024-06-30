import CustomerManager from '@/features/Permissions/pages/Manage/CustomerManager';
import PostManager from '@/features/Permissions/pages/Manage/PostManager';
import ProductManager from '@/features/Permissions/pages/Manage/ProductManager';
import VoucherManager from '@/features/Permissions/pages/Manage/VoucherManager';
import ReportPage from '@/features/Permissions/pages/admin/ReportPage';
import ManagerLayout from '@/layouts/ManagerLayout';
import StaffHomePage from '@/features/Permissions/pages/staff/HomePage';
import ErrorPage from '@/pages/ErrorPage';
import EmptyLayout from '@/layouts/EmptyLayout';
import CreatePost from '@/features/Blog/Page/CreatePost';
import BlogDetailPage from '@/features/Blog/Page/DetailPage';
import HomePage from '@/pages/Homepage';
import ConfirmOrderPage from '@/features/Permissions/pages/staff/ConfirmOrderPage';

const staffRoutes = [
	{ path: '/', component: HomePage },
	{
		path: '/dashboard',
		component: StaffHomePage,
		layout: ManagerLayout,
		auth: true,
	},
	{
		path: '/dashboard/product',
		component: ProductManager,
		layout: ManagerLayout,
		auth: true,
	},
	{
		path: '/dashboard/customer',
		component: CustomerManager,
		layout: ManagerLayout,
		auth: true,
	},
	{
		path: '/dashboard/voucher',
		component: VoucherManager,
		layout: ManagerLayout,
		auth: true,
	},
	{
		path: '/dashboard/post',
		component: PostManager,
		layout: ManagerLayout,
		auth: true,
	},
	{ path: '/post/create', component: CreatePost,layout: ManagerLayout, auth: true },
	{
		path: '/dashboard/report',
		component: ReportPage,
		layout: ManagerLayout,
		auth: true,
	},
	{
		path: '/dashboard/order',
		component: ConfirmOrderPage,
		layout: ManagerLayout,
		auth: true,
	},
	{ path: '/blog/:id', component: BlogDetailPage, layout: ManagerLayout },
	{ path: '*', component: ErrorPage, layout: EmptyLayout },
];

export default staffRoutes;
