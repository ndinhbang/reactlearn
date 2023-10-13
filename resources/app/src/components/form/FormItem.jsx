import React from'react'

const AbiFormItem = (props) => {
    console.log('FormItem', props)
    return <div className={`abi-form-item`}>{props.children}</div>
}

export default AbiFormItem
