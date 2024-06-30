import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from '@/layouts/DefaultLayout';
import AuthGuard from '@/layouts/Auth/AuthGuard';
import GuestGuard from '@/layouts/Auth/GuestGuard';
import { globalRoutes, adminRoutes, staffRoutes } from '@/routes';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
    let routes;
    const role = JSON.parse(localStorage.getItem('_user-info'))?.role;
    if (role === 'admin') routes = adminRoutes;
    else if (role === 'staff') routes = staffRoutes;
    else routes = globalRoutes;

    return (
        <div id='page' className='scroll-smooth'>
            <Router>
                <ScrollToTop />
                <Routes>
                    {routes.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout ?? DefaultLayout;
                        const Guard = route.auth ? AuthGuard : GuestGuard;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Guard>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </Guard>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
