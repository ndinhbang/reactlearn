import maxBy from "lodash/maxBy"
import React, { useMemo } from "react"
import { UnknownRenderer } from "./UnknownRenderer.jsx"
import { withJsonFormsDispatchCellProps } from "./JsonFormsContext.jsx"

/**
 * Dispatch renderer component for cells.
 */
export const Dispatch = ({
                             uischema,
                             schema,
                             rootSchema,
                             path,
                             cells,
                             id,
                             enabled,
                             renderers,
                             config
                         }) => {
    const testerContext = useMemo(
        () => ({
            rootSchema: rootSchema,
            config: config
        }),
        [rootSchema, config]
    )
    const cell = useMemo(
        () => maxBy(cells, r => r.tester(uischema, schema, testerContext)),
        [cells, uischema, schema, testerContext]
    )
    if (
        cell === undefined ||
        cell.tester(uischema, schema, testerContext) === -1
    ) {
        return <UnknownRenderer type={"cell"} />
    } else {
        const Cell = cell.cell
        return (
            <Cell
                uischema={uischema}
                schema={schema}
                enabled={enabled}
                path={path}
                id={id}
                renderers={renderers}
                cells={cells}
            />
        )
    }
}

export const DispatchCell = withJsonFormsDispatchCellProps(Dispatch)
