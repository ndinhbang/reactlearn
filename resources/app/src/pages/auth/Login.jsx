import React from 'react'
import { Card, Col, Row, Space, Typography } from "antd";
import {
    createForm,
    onFormInit, onFormReact,
    registerValidateLocale,
    registerValidateRules,
    setValidateLanguage
} from "@formily/core";
import { createSchemaField, connect, mapProps, mapReadPretty, FormProvider } from "@formily/react";
import { Form, Input, Password, Submit, FormItem } from '@formily/antd-v5'
import loginSchema from "@/modules/guest/auth/login.schema.js";
import { Link } from "react-router-dom";

const form = createForm({
    validateFirst: true,
    effects() {
        // https://core.formilyjs.org/api/entry/form-effect-hooks
        onFormInit(() => {
            console.log('The form has been initialized')
        }),
        onFormReact((form) => {
            console.log(form.values)
        })
    },
    initialValues: {
        username: 'hello',
    },
})

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Password,
    },
})

const {Title} = Typography;

setValidateLanguage('en-US')

registerValidateLocale({
    'en-US': {
        required: 'This field is required.',
    },
})

registerValidateRules({
    gte100(value, rule, ctx) {
        // console.log('gte100', value, rule, ctx)
        return value < 100 ? 'must be greater than 100' : ''
    },
})


const Login = () => {
    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <Row justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col span={5}>
                <Card bordered>
                    {/*<Form*/}
                    {/*    form={form}*/}
                    {/*    layout="vertical"*/}
                    {/*    size="large"*/}
                    {/*    onAutoSubmit={console.log}*/}
                    {/*>*/}
                    <FormProvider form={form}>
                        <Space direction="vertical" size="small" style={{display: 'flex'}}>
                            <Title level={4} className={`mb-3`}>Guest Login</Title>
                            <SchemaField schema={loginSchema}/>

                            <Row justify="space-between">
                                <Col>
                                    <Submit size="large" onSubmit={onSubmit}>
                                        Log in
                                    </Submit>
                                </Col>
                                <Col>
                                    <Link className="btn btn-link px-0" to={`/auth/forgot-password`}>
                                        Forgot password?
                                    </Link>
                                </Col>
                            </Row>
                        </Space>
                    </FormProvider>
                    {/*</Form>*/}
                </Card>
            </Col>
        </Row>
    )
}

export default Login
