import SampleFormInput from "@/pages/sample/form/SampleFormInput.jsx";
import { createElement } from "react";
import SampleMasterLayout from "@/layouts/SampleMasterLayout.jsx";

export const sampleRoutes = [
    {
        path: "sample",
        element: createElement(SampleMasterLayout),
        children: [
            {
                path: "form",
                children: [
                    {
                        path: "input",
                        element: createElement(SampleFormInput),
                    },
                ]
            },

        ]
    }
];

