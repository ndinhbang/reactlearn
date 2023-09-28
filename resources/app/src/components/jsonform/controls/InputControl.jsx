import maxBy from "lodash-es/maxBy"
import React, { useCallback, useState } from "react"
import {
    computeLabel,
    isControl,
    isDescriptionHidden,
    NOT_APPLICABLE,
    rankWith
} from "@jsonforms/core"
import {
    DispatchCell,
    withJsonFormsControlProps
} from "@jsonforms/react"
import { withVanillaControlProps } from "../util/index.jsx"
import merge from "lodash-es/merge"

export const InputControl = (props) => {
    const {
        classNames,
        description,
        id,
        errors,
        label,
        uischema,
        schema,
        rootSchema,
        visible,
        enabled,
        required,
        path,
        cells,
        config,
        data
    } = props

    const [isFocused, setIsFocused] = useState(false)

    const isValid = errors.length === 0

    const divClassNames = [classNames.validation]
    .concat(isValid ? classNames.description : classNames.validationError)
    .join(" ")

    const appliedUiSchemaOptions = merge({}, config, uischema.options)
    const showDescription = !isDescriptionHidden(
        visible,
        description,
        isFocused,
        appliedUiSchemaOptions.showUnfocusedDescription
    )
    const testerContext = {
        rootSchema: rootSchema,
        config: config
    }

    const onFocus = useCallback(() => setIsFocused(true), []);
    const onBlur = useCallback(() => setIsFocused(false), []);

    const cell = maxBy(cells, r => r.tester(uischema, schema, testerContext))
    if (
        cell === undefined ||
        cell.tester(uischema, schema, testerContext) === NOT_APPLICABLE
    ) {
        console.warn("No applicable cell found.", uischema, schema)
        return null
    } else {
        return (
            <div
                className={classNames.wrapper}
                hidden={!visible}
                onFocus={onFocus}
                onBlur={onBlur}
                id={id}
            >
                <label htmlFor={id + "-input"} className={classNames.label}>
                    {computeLabel(
                        label,
                        required,
                        appliedUiSchemaOptions.hideRequiredAsterisk
                    )}
                </label>
                <DispatchCell
                    uischema={uischema}
                    schema={schema}
                    path={path}
                    id={id + "-input"}
                    enabled={enabled}
                />
                <div className={divClassNames}>
                    {!isValid ? errors : showDescription ? description : null}
                </div>
            </div>
        )
    }
}

export const inputControlTester = rankWith(1, isControl)

export default withVanillaControlProps(withJsonFormsControlProps(InputControl))
