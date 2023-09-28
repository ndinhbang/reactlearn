import React from "react"
import { isDateControl, rankWith } from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { withVanillaCellProps } from "../util/index.jsx"

export const DateCell = props => {
    const { data, className, id, enabled, uischema, path, handleChange } = props

    return (
        <input
            type="date"
            value={data || ""}
            onChange={ev => handleChange(path, ev.target.value)}
            className={className}
            id={id}
            disabled={!enabled}
            autoFocus={uischema.options && uischema.options.focus}
        />
    )
}
/**
 * Default tester for date controls.
 */
export const dateCellTester = rankWith(2, isDateControl)

export default withJsonFormsCellProps(withVanillaCellProps(DateCell))
