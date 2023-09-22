import Error404 from "@/Pages/Error404";
import ArticleIndex, { articlePagingListLoader } from "@/Pages/tenant/modules/article";
import ArticleDetail, { articleDetailLoader } from "@/Pages/tenant/modules/article/Detail";
import Empty from "@/Pages/Empty.jsx";
import Login from "@/Pages/auth/Login.jsx";
import MasterLayout from "@/Layouts/Master";
import ForgotPassword from "@/Pages/auth/ForgotPassword.jsx";
import AuthLayout from "@/Layouts/Auth";
import AdminMasterLayout from "@/Layouts/AdminMaster";
import AdminLogin from "@/Pages/admin/auth/Login";
import AdminForgotPassword from "@/Pages/admin/auth/ForgotPassword";
import TenantMasterLayout from "@/Layouts/TenantMaster";
import TenantLogin from "@/Pages/tenant/auth/Login";
import TenantForgotPassword from "@/Pages/tenant/auth/ForgotPassword";
import TenantDashboard from "@/Pages/tenant/Dashboard";
import AdminDashboard from "@/Pages/admin/Dashboard";
import AdminLayout, { currentUserLoader } from "@/Layouts/Admin";
import TenantIndex from "@/Pages/admin/modules/tenant";
import TenantDetail from "@/Pages/admin/modules/tenant/Detail";
import TenantLayout from "@/Layouts/Tenant";
import AdminArticleIndex, { articlePagingListDeferLoader } from "@/Pages/admin/modules/article";
import AdminArticleDetail, { articleDetailDeferLoader } from "@/Pages/admin/modules/article/Detail.jsx";
import Home from "@/Pages/Home.jsx";

const routes = [
    {
        path: "/",
        element: <MasterLayout/>,
        errorElement: <Error404/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: "auth",
                element: <AuthLayout/>,
                children: [
                    {
                        path: "login",
                        element: <Login/>,
                    },
                    {
                        path: "forgot-password",
                        element: <ForgotPassword/>,
                    },
                ]
            },
            {
                path: "admin",
                element: <AdminMasterLayout/>,
                children: [
                    {
                        path: "auth",
                        element: <AuthLayout/>,
                        children: [
                            {
                                path: "login",
                                element: <AdminLogin/>,
                            },
                            {
                                path: "forgot-password",
                                element: <AdminForgotPassword/>,
                            },
                        ]
                    },
                    {
                        element: <AdminLayout/>,
                        loader: currentUserLoader,
                        children: [
                            {
                                path: "dashboard",
                                element: <AdminDashboard/>,
                            },
                            {
                                path: "tenant",
                                element: <TenantIndex/>,
                            },
                            {
                                path: "tenant/:id",
                                element: <TenantDetail/>,
                            },
                            {
                                path: "article",
                                loader: articlePagingListDeferLoader,
                                element: <AdminArticleIndex/>,
                            },
                            {
                                path: "article/:id",
                                loader:articleDetailDeferLoader,
                                element: <AdminArticleDetail/>,
                            },
                        ]
                    },
                ]
            },
            {
                path: "tenant",
                element: <TenantMasterLayout/>,
                children: [
                    {
                        path: "auth",
                        element: <AuthLayout/>,
                        children: [
                            {
                                path: "login",
                                element: <TenantLogin/>,
                            },
                            {
                                path: "forgot-password",
                                element: <TenantForgotPassword/>,
                            },
                        ]
                    },
                    {
                        element: <TenantLayout/>,
                        children: [
                            {
                                path: "dashboard",
                                element: <TenantDashboard/>,
                            },
                            {
                                path: "article",
                                loader: articlePagingListLoader,
                                element: <ArticleIndex/>,
                            },
                            {
                                path: "article/:id",
                                loader: articleDetailLoader,
                                element: <ArticleDetail/>,
                            },
                        ]
                    },
                ]
            },
        ]
    },

]

export default routes;
