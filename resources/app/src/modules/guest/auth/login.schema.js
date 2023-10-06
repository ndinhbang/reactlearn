const loginSchema = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            // title: 'Username',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
                'placeholder': 'Username',
                // prefix: '{{icon('UserOutlined')}}',
            },
            'x-validator': [
                {
                    required: true,
                    message: 'Please input your username!',
                },
            ],
        },
        password: {
            type: 'string',
            // title: 'Password',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Password',
            'x-component-props': {
                'placeholder': 'Password',
                // prefix: '{{icon('LockOutlined')}}',
            },
        },
    },
}

 export default loginSchema;
