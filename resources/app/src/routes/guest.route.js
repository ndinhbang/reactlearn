import AuthLayout from "@/layouts/AuthLayout.jsx";
import Login from "@/pages/auth/Login.jsx";
import ForgotPassword from "@/pages/auth/ForgotPassword.jsx";
import { createElement } from "react";

export const guestRoutes = [
    {
        path: "auth",
        element: createElement(AuthLayout),
        children: [
            {
                path: "login",
                element: createElement(Login),
            },
            {
                path: "forgot-password",
                element: createElement(ForgotPassword),
            },
        ]
    },
]
