import React from "react"
import { and, isOneOfEnumControl, optionIs, rankWith } from "@jsonforms/core"
import { withVanillaControlProps } from "../util/index.jsx"
import { withJsonFormsOneOfEnumProps } from "@jsonforms/react"
import { RadioGroup } from "./RadioGroup.jsx"

export const OneOfRadioGroupControl = props => {
    return <RadioGroup {...props} />
}

export const oneOfRadioGroupControlTester = rankWith(
    3,
    and(isOneOfEnumControl, optionIs("format", "radio"))
)

export default withVanillaControlProps(
    withJsonFormsOneOfEnumProps(OneOfRadioGroupControl)
)
