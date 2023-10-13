import React from 'react'
import {
    createForm,
    registerValidateLocale,
    setValidateLanguage
} from "@formily/core";
import { createSchemaField, FormProvider } from "@formily/react";
import {inputSchema} from "./schema/input.schema.js";
import AbFormInput from "@/components/form/AbFormInput.jsx";

const form = createForm({
    validateFirst: true,
    initialValues: {
        username: 'hello',
    },
})

// Register form components
const SchemaField = createSchemaField({
    components: {
        AbFormInput,
    },
})

// locale
setValidateLanguage('en-US')
registerValidateLocale({
    'en-US': {
        required: 'This field is required.',
    },
})

const SampleFormInput = () => {
    console.log('SampleFormInput')
    // const onSubmit = (values) => {
    //     console.log(values)
    // }

    return (
        <FormProvider form={form}>
            <SchemaField schema={inputSchema}/>
        </FormProvider>
    )
}

export default SampleFormInput
