import React from "react"
import { JsonFormsDispatch } from "@jsonforms/react"

export const SingleCategory = ({ category, schema, path }) => (
    // TODO: add selected style
    <div id="categorization.detail">
        {(category.elements || []).map((child, index) => (
            <JsonFormsDispatch
                key={`${path}-${index}`}
                uischema={child}
                schema={schema}
                path={path}
            />
        ))}
    </div>
)
