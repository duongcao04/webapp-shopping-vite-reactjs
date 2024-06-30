// // Layout
// import EmptyLayout from '@/layouts/EmptyLayout.jsx';
// import ManagerLayout from '@/layouts/ManagerLayout';
// // Public Route
// import HomePage from '@/pages/Homepage';
// import NotFound from '@/pages/NotFound';
// import AboutUs from '@/pages/AboutUs';
// // Auth Route
// import SignInPage from '@/features/Auth/pages/SignInPage.jsx';
// import RegisterPage from '@/features/Auth/pages/RegisterPage.jsx';
// import CartPage from '@/pages/CartPage';
// import PaymentPage from '@/features/Payments/pages/PaymentPage';
// import HistoryOrder from '@/features/Payments/pages/HistoryOrder';
// // Blog
// import BlogPage from '@/features/Blog/Page/BlogPage';
// import BlogDetailPage from '@/features/Blog/Page/DetailPage';
// import CreatePost from '@/features/Blog/Page/CreatePost';
// // Product
// import ProductDetailPage from '@/features/Product/pages/DetailPage';
// import ProductsPage from '@/features/Product/pages/ProductsPage';
// // Information Client
// // Admin Route
// import AdminHomePage from '@/features/Permissions/pages/admin/HomePage'
// import AccountPage from '@/features/InformationClient/pages/AccountPage';
// import CustomerManager from '@/features/Permissions/pages/Manage/CustomerManager';
// import ProductManager from '@/features/Permissions/pages/Manage/ProductManager';
// import VoucherManager from '@/features/Permissions/pages/Manage/VoucherManager';
// import PostManager from '@/features/Permissions/pages/Manage/PostManager';
// // Staff Route
// import StaffHomePage from '@/features/Permissions/pages/staff/HomePage';
// import ReportPage from '@/features/Permissions/pages/admin/ReportPage';
// import OrderPage from '@/features/Permissions/pages/staff/OrderPage';
// import InformationUser from '@/features/Permissions/pages/InformationUser';

// const user = JSON.parse(localStorage.getItem('_user-info'));

// const routes = [
//   // Public Routes
//   { path: '/', component: HomePage, auth: false },
//   { path: '/san-pham', component: ProductsPage, auth: false },
//   { path: '/san-pham/:id', component: ProductDetailPage, auth: false },
//   { path: '/blog', component: BlogPage, auth: false },
//   { path: '/blog/:id', component: BlogDetailPage, auth: false },
//   { path: '/blog/create', component: CreatePost, auth: false },
//   { path: '/ve-chung-toi', component: AboutUs, auth: false },
//   { path: '/gio-hang', component: CartPage, auth: false },
//   { path: '/lich-su-mua-hang', component: HistoryOrder, auth: true },
//   { path: '*', component: NotFound, auth: false },
//   {
//     path: '/auth/login',
//     component: SignInPage,
//     layout: EmptyLayout,
//     auth: false,
//   },
//   {
//     path: '/auth/register',
//     component: RegisterPage,
//     layout: EmptyLayout,
//     auth: false,
//   },
//   // Private Routes
//   { path: '/account', component: AccountPage, auth: true },
//   { path: '/thanh-toan', component: PaymentPage, auth: true },
//   // Permission Routes
//   {
//     path: '/dashboard',
//     component:
//       user?.role === 'admin'
//         ? AdminHomePage
//         : user?.role === 'staff'
//           ? StaffHomePage
//           : NotFound,
//     layout:
//       user?.role === 'admin' || user?.role === 'staff'
//         ? ManagerLayout
//         : EmptyLayout,
//     auth: true,
//   },
//   {
//     path: '/dashboard/product',
//     component: ProductManager,
//     layout: ManagerLayout,
//     auth: true,
//   },
//   {
//     path: '/dashboard/customer',
//     component: CustomerManager,
//     layout: ManagerLayout,
//     auth: true,
//   },
//   {
//     path: '/dashboard/voucher',
//     component: VoucherManager,
//     layout: ManagerLayout,
//     auth: true,
//   },
//   {
//     path: '/dashboard/post',
//     component: PostManager,
//     layout: ManagerLayout,
//     auth: true,
//   },
//   {
//     path: '/dashboard/report',
//     component: ReportPage,
//     layout: ManagerLayout,
//     auth: true,
//   },
//   {
//     path: '/dashboard/order',
//     component: OrderPage,
//     layout: ManagerLayout,
//     auth: true,
//   },
//   {
//     path: '/thong-tin',
//     component: InformationUser,
//     layout: ManagerLayout,
//     auth: true,
//   },
// ];

// export default routes;
