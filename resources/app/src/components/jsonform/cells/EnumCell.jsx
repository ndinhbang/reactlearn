import React, { useMemo } from "react"
import { isEnumControl, rankWith } from "@jsonforms/core"
import {
    withJsonFormsEnumCellProps,
    withTranslateProps
} from "@jsonforms/react"
import { i18nDefaults, withVanillaEnumCellProps } from "../util/index.jsx"

export const EnumCell = props => {
    const {
        data,
        className,
        id,
        enabled,
        schema,
        uischema,
        path,
        handleChange,
        options,
        t
    } = props
    const noneOptionLabel = useMemo(
        () => t("enum.none", i18nDefaults["enum.none"], { schema, uischema, path }),
        [t, schema, uischema, path]
    )
    return (
        <select
            className={className}
            id={id}
            disabled={!enabled}
            autoFocus={uischema.options && uischema.options.focus}
            value={data || ""}
            onChange={ev =>
                handleChange(
                    path,
                    ev.target.selectedIndex === 0 ? undefined : ev.target.value
                )
            }
        >
            {[
                <option value={""} key={"jsonforms.enum.none"}>
                    {noneOptionLabel}
                </option>
            ].concat(
                options.map(optionValue => (
                    <option
                        value={optionValue.value}
                        label={optionValue.label}
                        key={optionValue.value}
                    />
                ))
            )}
        </select>
    )
}
/**
 * Default tester for enum controls.
 */
export const enumCellTester = rankWith(2, isEnumControl)

export default withJsonFormsEnumCellProps(
    withTranslateProps(withVanillaEnumCellProps(EnumCell))
)
