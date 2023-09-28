import React from "react"
import { rankWith, uiTypeIs } from "@jsonforms/core"
import { withJsonFormsLabelProps } from "@jsonforms/react"
import { withVanillaControlProps } from "../util/index.jsx"

/**
 * Default tester for a label.
 */
export const labelRendererTester = rankWith(1, uiTypeIs("Label"))

/**
 * Default renderer for a label.
 */
export const LabelRenderer = ({ text, visible, getStyleAsClassName }) => {
    const classNames = getStyleAsClassName("label-control")
    const isHidden = !visible

    return (
        <label hidden={isHidden} className={classNames}>
            {text}
        </label>
    )
}

export default withVanillaControlProps(withJsonFormsLabelProps(LabelRenderer))
