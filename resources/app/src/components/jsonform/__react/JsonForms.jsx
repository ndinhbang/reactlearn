import maxBy from "lodash/maxBy"
import React, { useMemo } from "react"
import { UnknownRenderer } from "./UnknownRenderer.jsx"
import { createId, Generate, isControl, removeId } from "@jsonforms/core"
import {
    JsonFormsStateProvider,
    withJsonFormsRendererProps
} from "./JsonFormsContext.jsx"

export class JsonFormsDispatchRenderer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: isControl(props.uischema) ? createId(props.uischema.scope) : undefined
        }
    }

    componentWillUnmount() {
        if (isControl(this.props.uischema)) {
            removeId(this.state.id)
        }
    }

    render() {
        const {
            schema,
            rootSchema,
            uischema,
            path,
            enabled,
            renderers,
            cells,
            config
        } = this.props

        return (
            <TestAndRender
                uischema={uischema}
                schema={schema}
                rootSchema={rootSchema}
                path={path}
                enabled={enabled}
                renderers={renderers}
                cells={cells}
                id={this.state.id}
                config={config}
            />
        )
    }
}

const TestAndRender = React.memo(function TestAndRender(props) {
    const testerContext = useMemo(
        () => ({
            rootSchema: props.rootSchema,
            config: props.config
        }),
        [props.rootSchema, props.config]
    )
    const renderer = useMemo(
        () =>
            maxBy(props.renderers, r =>
                r.tester(props.uischema, props.schema, testerContext)
            ),
        [props.renderers, props.uischema, props.schema, testerContext]
    )
    if (
        renderer === undefined ||
        renderer.tester(props.uischema, props.schema, testerContext) === -1
    ) {
        return <UnknownRenderer type={"renderer"} />
    } else {
        const Render = renderer.renderer
        return (
            <Render
                uischema={props.uischema}
                schema={props.schema}
                path={props.path}
                enabled={props.enabled}
                renderers={props.renderers}
                cells={props.cells}
                id={props.id}
            />
        )
    }
})

/**
 * @deprecated Since Version 3.0 this optimization renderer is no longer necessary.
 * Use `JsonFormsDispatch` instead.
 * We still export it for backward compatibility
 */
export class ResolvedJsonFormsDispatchRenderer extends JsonFormsDispatchRenderer {
    constructor(props) {
        super(props)
    }
}

export const JsonFormsDispatch = withJsonFormsRendererProps(
    JsonFormsDispatchRenderer
)

/**
 * @deprecated Since Version 3.0 this optimization component is no longer necessary.
 * Use `JsonFormsDispatch` instead.
 * We still export it for backward compatibility
 */
export const ResolvedJsonFormsDispatch = withJsonFormsRendererProps(
    ResolvedJsonFormsDispatchRenderer
)

export const JsonForms = props => {
    const {
        ajv,
        data,
        schema,
        uischema,
        renderers,
        cells,
        onChange,
        config,
        uischemas,
        readonly,
        validationMode,
        i18n,
        additionalErrors
    } = props
    const schemaToUse = useMemo(
        () => (schema !== undefined ? schema : Generate.jsonSchema(data)),
        [schema, data]
    )
    const uischemaToUse = useMemo(
        () =>
            typeof uischema === "object" ? uischema : Generate.uiSchema(schemaToUse),
        [uischema, schemaToUse]
    )

    return (
        <JsonFormsStateProvider
            initState={{
                core: {
                    ajv,
                    data,
                    schema: schemaToUse,
                    uischema: uischemaToUse,
                    validationMode: validationMode,
                    additionalErrors: additionalErrors
                },
                config,
                uischemas,
                renderers,
                cells,
                readonly,
                i18n
            }}
            onChange={onChange}
        >
            <JsonFormsDispatch />
        </JsonFormsStateProvider>
    )
}
