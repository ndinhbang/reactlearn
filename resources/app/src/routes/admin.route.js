import AdminMasterLayout from "@/layouts/AdminMasterLayout.jsx";
import AuthLayout from "@/layouts/AuthLayout.jsx";
import AdminLogin from "@/pages/admin/auth/Login.jsx";
import AdminForgotPassword from "@/pages/admin/auth/ForgotPassword.jsx";
import AdminLayout, { currentUserLoader } from "@/layouts/AdminLayout.jsx";
import AdminDashboard from "@/pages/admin/Dashboard.jsx";
import TenantIndex from "@/pages/admin/modules/tenant/Index.jsx";
import TenantDetail from "@/pages/admin/modules/tenant/Detail.jsx";
import AdminArticleIndex, { articlePagingListDeferLoader } from "@/pages/admin/modules/article/Index.jsx";
import AdminArticleDetail, { articleDetailDeferLoader } from "@/pages/admin/modules/article/Detail.jsx";
import { createElement } from "react";

export const adminRoutes = [
    {
        path: "admin",
        element: createElement(AdminMasterLayout),
        children: [
            {
                path: "auth",
                element: createElement(AuthLayout),
                children: [
                    {
                        path: "login",
                        element: createElement(AdminLogin),
                    },
                    {
                        path: "forgot-password",
                        element: createElement(AdminForgotPassword),
                    },
                ]
            },
            {
                element: createElement(AdminLayout),
                loader: currentUserLoader,
                children: [
                    {
                        path: "dashboard",
                        element: createElement(AdminDashboard),
                    },
                    {
                        path: "tenant",
                        element: createElement(TenantIndex),
                    },
                    {
                        path: "tenant/:id",
                        element: createElement(TenantDetail),
                    },
                    {
                        path: "article",
                        loader: articlePagingListDeferLoader,
                        element: createElement(AdminArticleIndex),
                    },
                    {
                        path: "article/:id",
                        loader:articleDetailDeferLoader,
                        element: createElement(AdminArticleDetail),
                    },
                ]
            },
        ]
    },
]
