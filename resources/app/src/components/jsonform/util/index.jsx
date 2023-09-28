export * from "./i18nDefaults"
import React, { Fragment, useMemo } from "react"
import isEmpty from "lodash-es/isEmpty"
import { convertToValidClassName, getConfig } from "@jsonforms/core"
import { useJsonForms } from "@jsonforms/react"
import { getStyle, getStyleAsClassName } from "../reducers/index.js"
import { findStyle, findStyleAsClassName } from "../reducers/styling.js"
import { useStyles } from "../styles/index.js"

/**
 * Add vanilla props to the return value of calling the given
 * mapStateToProps function.
 *
 * @param mapStateToProps existing mapStateToProps function
 */
export const addVanillaControlProps = mapStateToProps => (state, ownProps) => {
    const props = mapStateToProps(state, ownProps)
    const config = getConfig(state)
    const trim = config.trim
    const controlElement = props.uischema
    const isValid = isEmpty(props.errors)
    const styles = getStyle(state)("control")
    let classNames = !isEmpty(controlElement.scope)
        ? styles.concat([`${convertToValidClassName(controlElement.scope)}`])
        : [""]

    if (trim) {
        classNames = classNames.concat(getStyle(state)("control.trim"))
    }
    const labelClass = getStyleAsClassName(state)("control.label")
    const descriptionClassName = getStyleAsClassName(state)("input.description")
    const validationClassName = getStyleAsClassName(state)("control.validation")
    const validationErrorClassName = getStyleAsClassName(state)(
        "control.validation.error"
    )
    const inputClassName = ["validate"].concat(isValid ? "valid" : "invalid")

    return {
        ...props,
        getStyleAsClassName: getStyleAsClassName(state),
        getStyle: getStyle(state),
        classNames: {
            wrapper: classNames.join(" "),
            input: inputClassName.join(" "),
            label: labelClass,
            description: descriptionClassName,
            validation: validationClassName,
            validationError: validationErrorClassName
        }
    }
}

export const withVanillaControlProps = Component => {
    return function WithVanillaControlProps(props) {
        const ctx = useJsonForms()
        const contextStyles = useStyles()
        const controlElement = props.uischema
        const config = ctx.config
        const trim = config && config.trim
        const styles = useMemo(() => findStyle(contextStyles)("control"), [
            contextStyles
        ])
        let classNames = !isEmpty(controlElement.scope)
            ? styles.concat([`${convertToValidClassName(controlElement.scope)}`])
            : [""]

        if (trim) {
            classNames = classNames.concat(findStyle(contextStyles)("control.trim"))
        }
        const isValid = isEmpty(props.errors)
        const labelClass = useMemo(
            () => findStyleAsClassName(contextStyles)("control.label"),
            [contextStyles]
        )
        const descriptionClassName = useMemo(
            () => findStyleAsClassName(contextStyles)("input.description"),
            [contextStyles]
        )
        const validationClassName = useMemo(
            () => findStyleAsClassName(contextStyles)("control.validation"),
            [contextStyles]
        )
        const validationErrorClassName = useMemo(
            () => findStyleAsClassName(contextStyles)("control.validation.error"),
            [contextStyles]
        )
        const inputClassName = ["validate"].concat(isValid ? "valid" : "invalid")

        const getStyleAsClassName = useMemo(
            () => findStyleAsClassName(contextStyles),
            [contextStyles]
        )
        const getStyle = useMemo(() => findStyle(contextStyles), [contextStyles])

        const wrapper = classNames.join(" ")
        const input = inputClassName.join(" ")

        const classNamesProp = useMemo(
            () => ({
                wrapper,
                input,
                label: labelClass,
                description: descriptionClassName,
                validation: validationClassName,
                validationError: validationErrorClassName
            }),
            [
                wrapper,
                input,
                labelClass,
                descriptionClassName,
                validationClassName,
                validationErrorClassName
            ]
        )

        return (
            <Component
                {...props}
                getStyleAsClassName={getStyleAsClassName}
                getStyle={getStyle}
                classNames={classNamesProp}
            />
        )
    }
}


/**
 * Add vanilla props to the return value of calling the given
 * mapStateToProps function.
 */
export const addVanillaLayoutProps = mapStateToProps => (state, ownProps) => {
    const props = mapStateToProps(state, ownProps)

    return {
        ...props,
        getStyleAsClassName: getStyleAsClassName(state),
        getStyle: getStyle(state)
    }
}

export const addVanillaCellProps = mapStateToCellsProps => (
    state,
    ownProps
) => {
    const props = mapStateToCellsProps(state, ownProps)
    const inputClassName = ["validate"].concat(
        props.isValid ? "valid" : "invalid"
    )
    return {
        ...props,
        className: inputClassName.join(" "),
        getStyleAsClassName: getStyleAsClassName(state),
        getStyle: getStyle(state)
    }
}

const withVanillaCellPropsForType = type => Component =>
    function WithVanillaCellPropsForType(props) {
        const inputClassName = ["validate"].concat(
            props.isValid ? "valid" : "invalid"
        )
        const styles = useStyles()
        const definedStyle = findStyleAsClassName(styles)(type)
        if (definedStyle) {
            inputClassName.push(definedStyle)
        }

        return (
            <Component
                {...props}
                getStyleAsClassName={findStyleAsClassName(styles)}
                getStyle={findStyle(styles)}
                className={inputClassName.join(" ")}
            />
        )
    }

export const withVanillaCellProps = withVanillaCellPropsForType("control.input")

export const withVanillaEnumCellProps = withVanillaCellPropsForType(
    "control.select"
)

export const withVanillaBooleanCellProps = withVanillaCellPropsForType(
    "control.checkbox"
)
