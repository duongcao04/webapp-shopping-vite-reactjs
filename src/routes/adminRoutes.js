import CustomerManager from '@/features/Permissions/pages/Manage/CustomerManager';
import PostManager from '@/features/Permissions/pages/Manage/PostManager';
import ProductManager from '@/features/Permissions/pages/Manage/ProductManager';
import VoucherManager from '@/features/Permissions/pages/Manage/VoucherManager';
import AdminHomePage from '@/features/Permissions/pages/admin/HomePage';
import ReportPage from '@/features/Permissions/pages/admin/ReportPage';
import EmptyLayout from '@/layouts/EmptyLayout';
import ManagerLayout from '@/layouts/ManagerLayout';
import ErrorPage from '@/pages/ErrorPage';
import BlogDetailPage from '@/features/Blog/Page/DetailPage';
import HomePage from '@/pages/Homepage';

const adminRoutes = [
	{ path: '/', component: HomePage },
	{
		path: '/dashboard',
		component: AdminHomePage,
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
	{
		path: '/dashboard/report',
		component: ReportPage,
		layout: ManagerLayout,
		auth: true,
	},
	{ path: '/blog/:id', component: BlogDetailPage, layout: ManagerLayout },
	{ path: '*', component: ErrorPage, layout: EmptyLayout },
];

export default adminRoutes;
