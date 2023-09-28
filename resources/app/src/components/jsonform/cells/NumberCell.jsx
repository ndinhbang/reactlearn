import React from "react"
import { isNumberControl, rankWith } from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { withVanillaCellProps } from "../util/index.jsx"

const toNumber = value => (value === "" ? undefined : Number(value))

export const NumberCell = props => {
    const { data, className, id, enabled, uischema, path, handleChange } = props

    return (
        <input
            type="number"
            step="0.1"
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
 * Default tester for number controls.
 */
export const numberCellTester = rankWith(2, isNumberControl)

export default withJsonFormsCellProps(withVanillaCellProps(NumberCell))
