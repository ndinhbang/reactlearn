import { connect, mapProps, mapReadPretty } from "@formily/react"
import React from "react"
import { CFormInput } from "@coreui/react-pro";

const BridgeInput = (props) => {
    console.log('BridgeInput', props)
    return <CFormInput {...props}/>
}

const AbFormInput = connect(
    BridgeInput,
    mapProps((props, field) => {
        console.log('AbFormInput mapProps', props, field)
        return {
            ...props,
        //     suffix: (
        //         <span>
        //   {field?.["loading"] || field?.["validating"] ? (
        //       <LoadingOutlined />
        //   ) : (
        //       props.suffix
        //   )}
        // </span>
        //     )
        }
    }),
    mapReadPretty(({ value }) => <div>{value}</div>)
)

export default AbFormInput
