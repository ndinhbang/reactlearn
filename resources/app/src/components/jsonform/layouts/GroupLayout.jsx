import isEmpty from "lodash/isEmpty"
import React from "react"
import { rankWith, uiTypeIs } from "@jsonforms/core"
import { withJsonFormsLayoutProps } from "@jsonforms/react"
import { renderChildren } from "./util.jsx"
import { withVanillaControlProps } from "../util/index.jsx"

/**
 * Default tester for a group layout.
 *
 */
export const groupTester = rankWith(1, uiTypeIs("Group"))

export const GroupLayoutRenderer = props => {
    const { data: _data, ...otherProps } = props
    // We don't hand over data to the layout renderer to avoid rerendering it with every data change
    return <GroupLayoutRendererComponent {...otherProps} />
}

const GroupLayoutRendererComponent = React.memo(
    function GroupLayoutRendererComponent({
                                              schema,
                                              uischema,
                                              path,
                                              enabled,
                                              visible,
                                              label,
                                              getStyle,
                                              getStyleAsClassName
                                          }) {
        const group = uischema
        const elementsSize = group.elements ? group.elements.length : 0
        const classNames = getStyleAsClassName("group.layout")
        const childClassNames = ["group-layout-item"]
        .concat(getStyle("group.layout.item", elementsSize))
        .join(" ")

        return (
            <fieldset
                className={classNames}
                hidden={visible === undefined || visible === null ? false : !visible}
            >
                {!isEmpty(label) ? (
                    <legend className={getStyleAsClassName("group.label")}>
                        {label}
                    </legend>
                ) : (
                    ""
                )}
                {renderChildren(group, schema, childClassNames, path, enabled)}
            </fieldset>
        )
    }
)

export default withVanillaControlProps(
    withJsonFormsLayoutProps(GroupLayoutRenderer)
)
