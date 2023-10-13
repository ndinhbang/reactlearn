import Error404 from "@/pages/Error404";
import ArticleIndex, { articlePagingListLoader } from "@/pages/tenant/modules/article";
import ArticleDetail, { articleDetailLoader } from "@/pages/tenant/modules/article/Detail";
import Empty from "@/pages/Empty.jsx";
import Login from "@/pages/auth/Login.jsx";
import MasterLayout from "@/layouts/Master";
import ForgotPassword from "@/pages/auth/ForgotPassword.jsx";
import AuthLayout from "@/layouts/Auth";
import AdminMasterLayout from "@/layouts/AdminMaster";
import AdminLogin from "@/pages/admin/auth/Login";
import AdminForgotPassword from "@/pages/admin/auth/ForgotPassword";
import TenantMasterLayout from "@/layouts/TenantMaster";
import TenantLogin from "@/pages/tenant/auth/Login";
import TenantForgotPassword from "@/pages/tenant/auth/ForgotPassword";
import TenantDashboard from "@/pages/tenant/Dashboard";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminLayout, { currentUserLoader } from "@/layouts/Admin";
import TenantIndex from "@/pages/admin/modules/tenant";
import TenantDetail from "@/pages/admin/modules/tenant/Detail";
import TenantLayout from "@/layouts/Tenant";
import AdminArticleIndex, { articlePagingListDeferLoader } from "@/pages/admin/modules/article";
import AdminArticleDetail, { articleDetailDeferLoader } from "@/pages/admin/modules/article/Detail.jsx";
import Home from "@/pages/Home.jsx";
import queryClient from "@/utils/queryClient";

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
                                loader: articlePagingListLoader(queryClient),
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
