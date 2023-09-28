import React, { useMemo, useState } from "react"
import { computeLabel, isDescriptionHidden } from "@jsonforms/core"
import { findStyleAsClassName } from "../reducers/styling"
import { useStyles } from "../styles"
import merge from "lodash-es/merge"

export const RadioGroup = ({
                               classNames,
                               id,
                               label,
                               options,
                               required,
                               description,
                               errors,
                               data,
                               uischema,
                               visible,
                               config,
                               enabled,
                               path,
                               handleChange
                           }) => {
    const contextStyles = useStyles()
    const [isFocused, setFocus] = useState(false)
    const radioControl = useMemo(
        () => findStyleAsClassName(contextStyles)("control.radio"),
        [contextStyles]
    )
    const radioOption = useMemo(
        () => findStyleAsClassName(contextStyles)("control.radio.option"),
        [contextStyles]
    )
    const radioInput = useMemo(
        () => findStyleAsClassName(contextStyles)("control.radio.input"),
        [contextStyles]
    )
    const radioLabel = useMemo(
        () => findStyleAsClassName(contextStyles)("control.radio.label"),
        [contextStyles]
    )
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
    const hasRadioClass = !radioControl || radioControl === "radio"
    let groupStyle = {}
    if (hasRadioClass) {
        groupStyle = {
            display: "flex",
            flexDirection:
                "vertical" === appliedUiSchemaOptions.orientation ? "column" : "row"
        }
    }
    return (
        <div
            className={classNames.wrapper}
            hidden={!visible}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
        >
            <label htmlFor={id} className={classNames.label}>
                {computeLabel(
                    label,
                    required,
                    appliedUiSchemaOptions.hideRequiredAsterisk
                )}
            </label>
            <div className={radioControl} style={groupStyle}>
                {options.map(option => (
                    <div key={option.label} className={radioOption}>
                        <input
                            type="radio"
                            value={option.value}
                            id={option.value}
                            name={id}
                            checked={data === option.value}
                            onChange={ev => handleChange(path, ev.currentTarget.value)}
                            disabled={!enabled}
                            className={radioInput}
                        />
                        <label htmlFor={option.value} className={radioLabel}>
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
            <div className={divClassNames}>
                {!isValid ? errors : showDescription ? description : null}
            </div>
        </div>
    )
}
