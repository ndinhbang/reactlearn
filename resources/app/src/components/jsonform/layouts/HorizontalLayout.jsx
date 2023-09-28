import React from "react"
import { rankWith, uiTypeIs } from "@jsonforms/core"
import { withJsonFormsLayoutProps } from "@jsonforms/react"
import { withVanillaControlProps } from "../util/index.jsx"
import { JsonFormsLayout } from "./JsonFormsLayout.jsx"
import { renderChildren } from "./util.jsx"

/**
 * Default tester for a horizontal layout.
 * @type {RankedTester}
 */
export const horizontalLayoutTester = rankWith(1, uiTypeIs("HorizontalLayout"))

export const HorizontalLayoutRenderer = props => {
    const { data: _data, ...otherProps } = props
    // We don't hand over data to the layout renderer to avoid rerendering it with every data change
    return <HorizontalLayoutRendererComponent {...otherProps} />
}

const HorizontalLayoutRendererComponent = React.memo(
    function HorizontalLayoutRendererComponent({
                                                   schema,
                                                   uischema,
                                                   getStyle,
                                                   getStyleAsClassName,
                                                   enabled,
                                                   visible,
                                                   path
                                               }) {
        const horizontalLayout = uischema
        const elementsSize = horizontalLayout.elements
            ? horizontalLayout.elements.length
            : 0
        const layoutClassName = getStyleAsClassName("horizontal.layout")
        const childClassNames = ["horizontal-layout-item"]
            .concat(getStyle("horizontal.layout.item", elementsSize))
            .join(" ")

        return (
            <JsonFormsLayout
                className={layoutClassName}
                visible={visible}
                enabled={enabled}
                path={path}
                uischema={uischema}
                schema={schema}
                getStyle={getStyle}
                getStyleAsClassName={getStyleAsClassName}
            >
                {renderChildren(
                    horizontalLayout,
                    schema,
                    childClassNames,
                    path,
                    enabled
                )}
            </JsonFormsLayout>
        )
    }
)

export default withVanillaControlProps(
    withJsonFormsLayoutProps(HorizontalLayoutRenderer, false)
)
