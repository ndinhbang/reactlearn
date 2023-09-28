import React from "react"
import { and, isEnumControl, optionIs, rankWith } from "@jsonforms/core"
import { withJsonFormsEnumProps } from "@jsonforms/react"
import { RadioGroup } from "./RadioGroup"
import { withVanillaControlProps } from "../util/index.jsx"
export const RadioGroupControl = props => {
    return <RadioGroup {...props} />
}

export const radioGroupControlTester = rankWith(
    3,
    and(isEnumControl, optionIs("format", "radio"))
)
export default withVanillaControlProps(
    withJsonFormsEnumProps(RadioGroupControl)
)
