import React from "react"
import { isDateTimeControl, rankWith } from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { withVanillaCellProps } from "../util/index.jsx"

export const DateTimeCell = props => {
    const { data, className, id, enabled, uischema, path, handleChange } = props
    const toISOString = inputDateTime => {
        return inputDateTime === "" ? "" : inputDateTime + ":00.000Z"
    }

    return (
        <input
            type="datetime-local"
            value={(data || "").substr(0, 16)}
            onChange={ev => handleChange(path, toISOString(ev.target.value))}
            className={className}
            id={id}
            disabled={!enabled}
            autoFocus={uischema.options && uischema.options.focus}
        />
    )
}
/**
 * Default tester for datetime controls.
 */
export const dateTimeCellTester = rankWith(2, isDateTimeControl)

export default withJsonFormsCellProps(withVanillaCellProps(DateTimeCell))
