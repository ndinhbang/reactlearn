import React from "react"
import { isStringControl, rankWith } from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { withVanillaCellProps } from "../util/index.jsx"
import merge from "lodash-es/merge"

export const TextCell = props => {
    const {
        config,
        data,
        className,
        id,
        enabled,
        uischema,
        schema,
        path,
        handleChange
    } = props
    const maxLength = schema.maxLength
    const appliedUiSchemaOptions = merge({}, config, uischema.options)
    return (
        <input
            type="text"
            value={data || ""}
            onChange={ev =>
                handleChange(path, ev.target.value === "" ? undefined : ev.target.value)
            }
            className={className}
            id={id}
            disabled={!enabled}
            autoFocus={appliedUiSchemaOptions.focus}
            placeholder={appliedUiSchemaOptions.placeholder}
            maxLength={appliedUiSchemaOptions.restrict ? maxLength : undefined}
            size={appliedUiSchemaOptions.trim ? maxLength : undefined}
        />
    )
}

export const textCellTester = rankWith(1, isStringControl)

export default withJsonFormsCellProps(withVanillaCellProps(TextCell))
