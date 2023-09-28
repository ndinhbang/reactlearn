import isEmpty from "lodash/isEmpty"
import React from "react"
import { JsonFormsDispatch, useJsonForms } from "@jsonforms/react"

export const renderChildren = (layout, schema, className, path, enabled) => {
    if (isEmpty(layout.elements)) {
        return []
    }

    const { renderers, cells } = useJsonForms()

    return layout.elements.map((child, index) => {
        return (
            <div className={className} key={`${path}-${index}`}>
                <JsonFormsDispatch
                    renderers={renderers}
                    cells={cells}
                    uischema={child}
                    schema={schema}
                    path={path}
                    enabled={enabled}
                />
            </div>
        )
    })
}
