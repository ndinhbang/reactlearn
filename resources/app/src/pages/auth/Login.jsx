import React from 'react'
import { Card, Col, Row, Space, Typography } from "antd";
import { createForm, registerValidateLocale, registerValidateRules, setValidateLanguage } from "@formily/core";
import { createSchemaField } from "@formily/react";
import { Form, FormItem, Input, Password, Submit } from '@formily/antd-v5'
import loginSchema from "@/modules/guest/auth/login.schema.js";
import { Link } from "react-router-dom";

const form = createForm({
    validateFirst: true,
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
                    <Form
                        form={form}
                        layout="vertical"
                        size="large"
                        onAutoSubmit={console.log}
                    >
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
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default Login
