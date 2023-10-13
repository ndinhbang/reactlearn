import TenantMasterLayout from "@/layouts/TenantMasterLayout.jsx";
import AuthLayout from "@/layouts/AuthLayout.jsx";
import TenantLogin from "@/pages/tenant/auth/Login.jsx";
import TenantForgotPassword from "@/pages/tenant/auth/ForgotPassword.jsx";
import TenantLayout from "@/layouts/TenantLayout.jsx";
import TenantDashboard from "@/pages/tenant/Dashboard.jsx";
import ArticleIndex, { articlePagingListLoader } from "@/pages/tenant/modules/article/Index.jsx";
import queryClient from "@/utils/queryClient.js";
import ArticleDetail, { articleDetailLoader } from "@/pages/tenant/modules/article/Detail.jsx";
import { createElement } from "react";

export const tenantRoutes = [
    {
        path: "tenant",
        element: createElement(TenantMasterLayout),
        children: [
            {
                path: "auth",
                element: createElement(AuthLayout),
                children: [
                    {
                        path: "login",
                        element: createElement(TenantLogin),
                    },
                    {
                        path: "forgot-password",
                        element: createElement(TenantForgotPassword),
                    },
                ]
            },
            {
                element: createElement(TenantLayout),
                children: [
                    {
                        path: "dashboard",
                        element: createElement(TenantDashboard),
                    },
                    {
                        path: "article",
                        loader: articlePagingListLoader(queryClient),
                        element: createElement(ArticleIndex),
                    },
                    {
                        path: "article/:id",
                        loader: articleDetailLoader,
                        element: createElement(ArticleDetail),
                    },
                ]
            },
        ]
    },
]
