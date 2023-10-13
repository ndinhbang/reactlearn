import Error404 from "@/pages/Error404";
import MasterLayout from "@/layouts/MasterLayout.jsx";
import Home from "@/pages/Home.jsx";
import { sampleRoutes } from "@/routes/sample.route.js";
import { guestRoutes } from "@/routes/guest.route.js";
import { adminRoutes } from "@/routes/admin.route.js";
import { tenantRoutes } from "@/routes/tenant.route.js";
import { createElement } from "react";

const routes = [
    {
        path: "/",
        element: createElement(MasterLayout), // same as <MasterLayout />, but you have to rename this file to use .jsx extension
        errorElement: createElement(Error404),
        children: [
            {
                index: true,
                element: createElement(Home),
            },
            ...guestRoutes,
            ...adminRoutes,
            ...tenantRoutes,
            ...sampleRoutes
        ]
    },
]

export default routes;
