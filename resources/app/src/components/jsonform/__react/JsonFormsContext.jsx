import {
    Actions,
    defaultMapStateToEnumCellProps,
    configReducer,
    coreReducer,
    mapStateToAllOfProps,
    mapStateToAnyOfProps,
    mapStateToArrayControlProps,
    mapStateToArrayLayoutProps,
    mapStateToCellProps,
    mapStateToControlProps,
    mapStateToControlWithDetailProps,
    mapStateToDispatchCellProps,
    mapStateToEnumControlProps,
    mapStateToJsonFormsRendererProps,
    mapStateToLayoutProps,
    mapStateToMasterListItemProps,
    mapStateToOneOfProps,
    mapStateToOneOfEnumControlProps,
    mapStateToOneOfEnumCellProps,
    mapDispatchToMultiEnumProps,
    mapStateToMultiEnumControlProps,
    mapDispatchToControlProps,
    mapDispatchToArrayControlProps,
    i18nReducer,
    defaultJsonFormsI18nState,
    mapStateToLabelProps
} from "@jsonforms/core"
import debounce from "lodash/debounce"
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef
} from "react"

const initialCoreState = {
    data: {},
    schema: {},
    uischema: undefined,
    errors: [],
    additionalErrors: [],
    validator: undefined,
    ajv: undefined
}

export const JsonFormsContext = React.createContext({
    core: initialCoreState,
    renderers: []
})

/**
 * Hook similar to `useEffect` with the difference that the effect
 * is only executed from the second call onwards.
 */
const useEffectAfterFirstRender = (effect, dependencies) => {
    const firstExecution = useRef(true)
    useEffect(() => {
        if (firstExecution.current) {
            firstExecution.current = false
            return
        }
        effect()
    }, dependencies)
}

export const JsonFormsStateProvider = ({ children, initState, onChange }) => {
    const {
        data,
        schema,
        uischema,
        ajv,
        validationMode,
        additionalErrors
    } = initState.core

    const [core, coreDispatch] = useReducer(coreReducer, undefined, () =>
        coreReducer(
            initState.core,
            Actions.init(data, schema, uischema, {
                ajv,
                validationMode,
                additionalErrors
            })
        )
    )
    useEffect(() => {
        console.log('coreDispatch', data)
        coreDispatch(
            Actions.updateCore(data, schema, uischema, {
                ajv,
                validationMode,
                additionalErrors
            })
        )
    }, [data, schema, uischema, ajv, validationMode, additionalErrors])

    const [config, configDispatch] = useReducer(configReducer, undefined, () =>
        configReducer(undefined, Actions.setConfig(initState.config))
    )
    useEffectAfterFirstRender(() => {
        configDispatch(Actions.setConfig(initState.config))
    }, [initState.config])

    const [i18n, i18nDispatch] = useReducer(i18nReducer, undefined, () =>
        i18nReducer(
            initState.i18n,
            Actions.updateI18n(
                initState.i18n?.locale,
                initState.i18n?.translate,
                initState.i18n?.translateError
            )
        )
    )
    useEffect(() => {
        i18nDispatch(
            Actions.updateI18n(
                initState.i18n?.locale,
                initState.i18n?.translate,
                initState.i18n?.translateError
            )
        )
    }, [
        initState.i18n?.locale,
        initState.i18n?.translate,
        initState.i18n?.translateError
    ])

    const contextValue = useMemo(
        () => ({
            core,
            renderers: initState.renderers,
            cells: initState.cells,
            config: config,
            uischemas: initState.uischemas,
            readonly: initState.readonly,
            i18n: i18n,
            // only core dispatch available
            dispatch: coreDispatch
        }),
        [
            core,
            initState.renderers,
            initState.cells,
            config,
            initState.uischemas,
            initState.readonly,
            i18n
        ]
    )

    const onChangeRef = useRef(onChange)
    useEffect(() => {
        onChangeRef.current = onChange
    }, [onChange])

    /**
     * A common pattern for users of JSON Forms is to feed back the data which is emitted by
     * JSON Forms to JSON Forms ('controlled style').
     *
     * Every time this happens, we dispatch the 'updateCore' action which will be a no-op when
     * the data handed over is the one which was just recently emitted. This allows us to skip
     * rerendering for all normal cases of use.
     *
     * However there can be extreme use cases, for example when using Chrome Auto-fill for forms,
     * which can cause JSON Forms to emit multiple change events before the parent component is
     * rerendered. Therefore not the very recent data, but the previous data is fed back to
     * JSON Forms first. JSON Forms recognizes that this is not the very recent data and will
     * validate, rerender and emit a change event again. This can then lead to data loss or even
     * an endless rerender loop, depending on the emitted events chain.
     *
     * To handle these edge cases in which many change events are sent in an extremely short amount
     * of time we debounce them over a short amount of time. 10ms was chosen as this worked well
     * even on low-end mobile device settings in the Chrome simulator.
     */
    const debouncedEmit = useCallback(
        debounce((...args) => onChangeRef.current?.(...args), 10),
        []
    )
    useEffect(() => {
        debouncedEmit({ data: core.data, errors: core.errors })
    }, [core.data, core.errors])

    return (
        <JsonFormsContext.Provider value={contextValue}>
            {children}
        </JsonFormsContext.Provider>
    )
}

export const useJsonForms = () => useContext(JsonFormsContext)

export const ctxToArrayLayoutProps = (ctx, props) =>
    mapStateToArrayLayoutProps({ jsonforms: { ...ctx } }, props)

export const ctxToArrayControlProps = (ctx, props) =>
    mapStateToArrayControlProps({ jsonforms: { ...ctx } }, props)

export const ctxToLayoutProps = (ctx, props) =>
    mapStateToLayoutProps({ jsonforms: { ...ctx } }, props)

export const ctxToControlProps = (ctx, props) =>
    mapStateToControlProps({ jsonforms: { ...ctx } }, props)

export const ctxToEnumControlProps = (ctx, props) => {
    const enumProps = mapStateToEnumControlProps({ jsonforms: { ...ctx } }, props)
    /**
     * Make sure, that options are memoized as otherwise the component will rerender for every change,
     * as the options array is recreated every time.
     */
    const options = useMemo(() => enumProps.options, [
        props.options,
        enumProps.schema,
        ctx.i18n?.translate
    ])
    return { ...enumProps, options }
}

export const ctxToOneOfEnumControlProps = (ctx, props) => {
    const enumProps = mapStateToOneOfEnumControlProps(
        { jsonforms: { ...ctx } },
        props
    )
    /**
     * Make sure, that options are memoized as otherwise the component will rerender for every change,
     * as the options array is recreated every time.
     */
    const options = useMemo(() => enumProps.options, [
        props.options,
        enumProps.schema,
        ctx.i18n?.translate
    ])
    return { ...enumProps, options }
}

export const ctxToMultiEnumControlProps = (ctx, props) => {
    const enumProps = mapStateToMultiEnumControlProps(
        { jsonforms: { ...ctx } },
        props
    )
    /**
     * Make sure, that options are memoized as otherwise the component will rerender for every change,
     * as the options array is recreated every time.
     */
    const options = useMemo(() => enumProps.options, [
        enumProps.schema,
        ctx.i18n?.translate
    ])
    return { ...enumProps, options }
}

export const ctxToControlWithDetailProps = (ctx, props) =>
    mapStateToControlWithDetailProps({ jsonforms: { ...ctx } }, props)

export const ctxToAllOfProps = (ctx, ownProps) => {
    const props = mapStateToAllOfProps({ jsonforms: { ...ctx } }, ownProps)
    return {
        ...props
    }
}

export const ctxDispatchToControlProps = dispatch =>
    useMemo(() => mapDispatchToControlProps(dispatch), [dispatch])

// context mappers

export const ctxToAnyOfProps = (ctx, ownProps) => {
    const props = mapStateToAnyOfProps({ jsonforms: { ...ctx } }, ownProps)
    const dispatchProps = ctxDispatchToControlProps(ctx.dispatch)
    return {
        ...props,
        ...dispatchProps
    }
}

export const ctxToOneOfProps = (ctx, ownProps) => {
    const props = mapStateToOneOfProps({ jsonforms: { ...ctx } }, ownProps)
    const dispatchProps = ctxDispatchToControlProps(ctx.dispatch)
    return {
        ...props,
        ...dispatchProps
    }
}

export const ctxToJsonFormsRendererProps = (ctx, ownProps) =>
    mapStateToJsonFormsRendererProps({ jsonforms: { ...ctx } }, ownProps)

export const ctxDispatchToArrayControlProps = dispatch => ({
    ...ctxDispatchToControlProps(dispatch),
    ...useMemo(() => mapDispatchToArrayControlProps(dispatch), [dispatch])
})

export const ctxToMasterListItemProps = (ctx, ownProps) =>
    mapStateToMasterListItemProps({ jsonforms: { ...ctx } }, ownProps)

export const ctxToCellProps = (ctx, ownProps) => {
    return mapStateToCellProps({ jsonforms: { ...ctx } }, ownProps)
}

export const ctxToEnumCellProps = (ctx, ownProps) => {
    const cellProps = defaultMapStateToEnumCellProps(
        { jsonforms: { ...ctx } },
        ownProps
    )
    /**
     * Make sure, that options are memoized as otherwise the cell will rerender for every change,
     * as the options array is recreated every time.
     */
    const options = useMemo(() => cellProps.options, [
        ownProps.options,
        cellProps.schema,
        ctx.i18n?.translate
    ])
    return { ...cellProps, options }
}

export const ctxToOneOfEnumCellProps = (ctx, props) => {
    const enumCellProps = mapStateToOneOfEnumCellProps(
        { jsonforms: { ...ctx } },
        props
    )
    /**
     * Make sure, that options are memoized as otherwise the cell will rerender for every change,
     * as the options array is recreated every time.
     */
    const options = useMemo(() => enumCellProps.options, [
        props.options,
        enumCellProps.schema,
        ctx.i18n?.translate
    ])
    return { ...enumCellProps, options }
}

export const ctxToDispatchCellProps = (ctx, ownProps) => {
    return mapStateToDispatchCellProps({ jsonforms: { ...ctx } }, ownProps)
}

export const ctxDispatchToMultiEnumProps = dispatch => ({
    ...ctxDispatchToControlProps(dispatch),
    ...useMemo(() => mapDispatchToMultiEnumProps(dispatch), [dispatch])
})

export const ctxToLabelProps = (ctx, ownProps) => {
    return mapStateToLabelProps({ jsonforms: { ...ctx } }, ownProps)
}

export const withJsonFormsContext = Component =>
    function WithJsonFormsContext(props) {
        const ctx = useJsonForms()
        return <Component ctx={ctx} props={props} />
    }

export const withContextToJsonFormsRendererProps = Component =>
    function WithContextToJsonFormsRendererProps({ ctx, props }) {
        const contextProps = ctxToJsonFormsRendererProps(ctx, props)
        return <Component {...props} {...contextProps} />
    }

const withContextToControlProps = Component =>
    function WithContextToControlProps({ ctx, props }) {
        const controlProps = ctxToControlProps(ctx, props)
        const dispatchProps = ctxDispatchToControlProps(ctx.dispatch)
        return <Component {...props} {...controlProps} {...dispatchProps} />
    }

const withContextToLayoutProps = Component =>
    function WithContextToLayoutProps({ ctx, props }) {
        const layoutProps = ctxToLayoutProps(ctx, props)
        return <Component {...props} {...layoutProps} />
    }

const withContextToOneOfProps = Component =>
    function WithContextToOneOfProps({ ctx, props }) {
        const oneOfProps = ctxToOneOfProps(ctx, props)
        const dispatchProps = ctxDispatchToControlProps(ctx.dispatch)
        return <Component {...props} {...oneOfProps} {...dispatchProps} />
    }

const withContextToAnyOfProps = Component =>
    function WithContextToAnyOfProps({ ctx, props }) {
        const oneOfProps = ctxToAnyOfProps(ctx, props)
        const dispatchProps = ctxDispatchToControlProps(ctx.dispatch)
        return <Component {...props} {...oneOfProps} {...dispatchProps} />
    }

const withContextToAllOfProps = Component =>
    function WithContextToAllOfProps({ ctx, props }) {
        const allOfProps = ctxToAllOfProps(ctx, props)
        const dispatchProps = ctxDispatchToControlProps(ctx.dispatch)
        return <Component {...props} {...allOfProps} {...dispatchProps} />
    }

const withContextToDetailProps = Component =>
    function WithContextToDetailProps({ ctx, props }) {
        const detailProps = ctxToControlWithDetailProps(ctx, props)
        return <Component {...props} {...detailProps} />
    }

const withContextToArrayLayoutProps = Component =>
    function WithContextToArrayLayoutProps({ ctx, props }) {
        const arrayLayoutProps = ctxToArrayLayoutProps(ctx, props)
        const dispatchProps = ctxDispatchToArrayControlProps(ctx.dispatch)
        return <Component {...props} {...arrayLayoutProps} {...dispatchProps} />
    }

const withContextToArrayControlProps = Component =>
    function WithContextToArrayControlProps({ ctx, props }) {
        const stateProps = ctxToArrayControlProps(ctx, props)
        const dispatchProps = ctxDispatchToArrayControlProps(ctx.dispatch)

        return <Component {...props} {...stateProps} {...dispatchProps} />
    }

const withContextToMasterListItemProps = Component =>
    function WithContextToMasterListItemProps({ ctx, props }) {
        const stateProps = ctxToMasterListItemProps(ctx, props)
        return <Component {...props} {...stateProps} />
    }

const withContextToCellProps = Component =>
    function WithContextToCellProps({ ctx, props }) {
        const cellProps = ctxToCellProps(ctx, props)
        const dispatchProps = ctxDispatchToControlProps(ctx.dispatch)

        return <Component {...props} {...dispatchProps} {...cellProps} />
    }

const withContextToDispatchCellProps = Component =>
    function WithContextToDispatchCellProps({ ctx, props }) {
        const cellProps = ctxToDispatchCellProps(ctx, props)
        const dispatchProps = ctxDispatchToControlProps(ctx.dispatch)

        return <Component {...props} {...dispatchProps} {...cellProps} />
    }

const withContextToEnumCellProps = Component =>
    function WithContextToEnumCellProps({ ctx, props }) {
        const cellProps = ctxToEnumCellProps(ctx, props)
        const dispatchProps = ctxDispatchToControlProps(ctx.dispatch)
        return <Component {...props} {...dispatchProps} {...cellProps} />
    }

const withContextToEnumProps = Component =>
    function WithContextToEnumProps({ ctx, props }) {
        const stateProps = ctxToEnumControlProps(ctx, props)
        const dispatchProps = ctxDispatchToControlProps(ctx.dispatch)

        return <Component {...props} {...dispatchProps} {...stateProps} />
    }

const withContextToOneOfEnumCellProps = Component =>
    function WithContextToOneOfEnumCellProps({ ctx, props }) {
        const cellProps = ctxToOneOfEnumCellProps(ctx, props)
        const dispatchProps = ctxDispatchToControlProps(ctx.dispatch)
        return <Component {...props} {...dispatchProps} {...cellProps} />
    }

const withContextToOneOfEnumProps = Component =>
    function WithContextToOneOfEnumProps({ ctx, props }) {
        const stateProps = ctxToOneOfEnumControlProps(ctx, props)
        const dispatchProps = ctxDispatchToControlProps(ctx.dispatch)
        return <Component {...props} {...dispatchProps} {...stateProps} />
    }

const withContextToMultiEnumProps = Component =>
    function WithContextToMultiEnumProps({ ctx, props }) {
        const stateProps = ctxToMultiEnumControlProps(ctx, props)
        const dispatchProps = ctxDispatchToMultiEnumProps(ctx.dispatch)
        return <Component {...props} {...dispatchProps} {...stateProps} />
    }

const withContextToLabelProps = Component =>
    function WithContextToLabelProps({ ctx, props }) {
        const stateProps = ctxToLabelProps(ctx, props)
        return <Component {...props} {...stateProps} />
    }

// --

// top level HOCs --

export const withJsonFormsRendererProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToJsonFormsRendererProps(
            memoize ? React.memo(Component) : Component
        )
    )

export const withJsonFormsControlProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToControlProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsLayoutProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToLayoutProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsOneOfProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToOneOfProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsAnyOfProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToAnyOfProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsAllOfProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToAllOfProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsDetailProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToDetailProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsArrayLayoutProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToArrayLayoutProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsArrayControlProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToArrayControlProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsMasterListItemProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToMasterListItemProps(
            memoize ? React.memo(Component) : Component
        )
    )

export const withJsonFormsCellProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToCellProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsDispatchCellProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToDispatchCellProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsEnumCellProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToEnumCellProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsEnumProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToEnumProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsOneOfEnumCellProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToOneOfEnumCellProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsOneOfEnumProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToOneOfEnumProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsMultiEnumProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToMultiEnumProps(memoize ? React.memo(Component) : Component)
    )

export const withJsonFormsLabelProps = (Component, memoize = true) =>
    withJsonFormsContext(
        withContextToLabelProps(memoize ? React.memo(Component) : Component)
    )

// TODO fix @typescript-eslint/ban-types
// eslint-disable-next-line @typescript-eslint/ban-types
export const withTranslateProps = Component =>
    function WithTranslateProps(props) {
        const ctx = useJsonForms()
        const locale = ctx.i18n?.locale ?? defaultJsonFormsI18nState.locale
        const t = ctx.i18n?.translate ?? defaultJsonFormsI18nState.translate

        return <Component {...props} locale={locale} t={t} />
    }
