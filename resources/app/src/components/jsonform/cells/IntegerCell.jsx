import React from "react"
import { isIntegerControl, rankWith } from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { withVanillaCellProps } from "../util/index.jsx"

const toNumber = value => (value === "" ? undefined : parseInt(value, 10))

export const IntegerCell = props => {
    const { data, className, id, enabled, uischema, path, handleChange } = props

    return (
        <input
            type="number"
            step="1"
            value={data ?? ""}
            onChange={ev => handleChange(path, toNumber(ev.target.value))}
            className={className}
            id={id}
            disabled={!enabled}
            autoFocus={uischema.options && uischema.options.focus}
        />
    )
}
/**
 * Default tester for integer controls.
 */
export const integerCellTester = rankWith(2, isIntegerControl)

export default withJsonFormsCellProps(withVanillaCellProps(IntegerCell))
