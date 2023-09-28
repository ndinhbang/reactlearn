import React from "react"

export const JsonFormsLayout = ({ className, children, visible }) => {
    return (
        <div
            className={className}
            hidden={visible === undefined || visible === null ? false : !visible}
        >
            {children}
        </div>
    )
}
