import React from "react"
import { isMultiLineControl, rankWith } from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { withVanillaCellProps } from "../util/index.jsx"
import merge from "lodash-es/merge"

export const TextAreaCell = props => {
    const {
        data,
        className,
        id,
        enabled,
        config,
        uischema,
        path,
        handleChange
    } = props
    const appliedUiSchemaOptions = merge({}, config, uischema.options)
    return (
        <textarea
            value={data || ""}
            onChange={ev =>
                handleChange(path, ev.target.value === "" ? undefined : ev.target.value)
            }
            className={className}
            id={id}
            disabled={!enabled}
            autoFocus={appliedUiSchemaOptions.focus}
            placeholder={appliedUiSchemaOptions.placeholder}
        />
    )
}

/**
 * Tester for a multi-line string control.
 */
export const textAreaCellTester = rankWith(2, isMultiLineControl)

export default withJsonFormsCellProps(withVanillaCellProps(TextAreaCell))
