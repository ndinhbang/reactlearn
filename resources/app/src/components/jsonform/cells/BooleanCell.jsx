import React from "react"
import { isBooleanControl, rankWith } from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { withVanillaBooleanCellProps } from "../util/index.jsx"

export const BooleanCell = props => {
    const { data, className, id, enabled, uischema, path, handleChange } = props

    return (
        <input
            type="checkbox"
            checked={!!data}
            onChange={ev => handleChange(path, ev.target.checked)}
            className={className}
            id={id}
            disabled={!enabled}
            autoFocus={uischema.options && uischema.options.focus}
        />
    )
}

/**
 * Default tester for boolean controls.
 */
export const booleanCellTester = rankWith(2, isBooleanControl)

export default withJsonFormsCellProps(withVanillaBooleanCellProps(BooleanCell))
