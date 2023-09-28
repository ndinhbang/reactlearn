import {
    cellReducer,
    configReducer,
    coreReducer,
    i18nReducer,
    rendererReducer,
    uischemaRegistryReducer
} from "@jsonforms/core"
import { connect } from "react-redux"
import { combineReducers } from "redux"
import React from "react"
// This import will be aliased to '@jsonforms/react' via rollup
import { JsonFormsContext } from ".."

const JsonFormsReduxProvider = ({ children, dispatch, ...other }) => {
    return (
        <JsonFormsContext.Provider
            value={{
                dispatch,
                ...other
            }}
        >
            {children}
        </JsonFormsContext.Provider>
    )
}

export const JsonFormsReduxContext = connect(state => ({
    ...state.jsonforms
}))(JsonFormsReduxProvider)

export const jsonformsReducer = (additionalReducers = {}) =>
    combineReducers({
        core: coreReducer,
        renderers: rendererReducer,
        cells: cellReducer,
        config: configReducer,
        uischemas: uischemaRegistryReducer,
        i18n: i18nReducer,
        ...additionalReducers
    })
