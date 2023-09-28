import React from "react"
import { isNumberFormatControl, rankWith } from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { withVanillaCellProps } from "../util/index.jsx"

export const NumberFormatCell = props => {
    const { className, id, enabled, uischema, path, handleChange, schema } = props
    const maxLength = schema.maxLength
    const formattedNumber = props.toFormatted(props.data)

    const onChange = ev => {
        const validStringNumber = props.fromFormatted(ev.currentTarget.value)
        handleChange(path, validStringNumber)
    }

    return (
        <input
            type="text"
            value={formattedNumber}
            onChange={onChange}
            className={className}
            id={id}
            disabled={!enabled}
            autoFocus={uischema.options && uischema.options.focus}
            maxLength={
                uischema.options && uischema.options.restrict ? maxLength : undefined
            }
            size={uischema.options && uischema.options.trim ? maxLength : undefined}
        />
    )
}

/**
 * Default tester for text-based/string controls.
 */
export const numberFormatCellTester = rankWith(4, isNumberFormatControl)

export default withJsonFormsCellProps(withVanillaCellProps(NumberFormatCell))
