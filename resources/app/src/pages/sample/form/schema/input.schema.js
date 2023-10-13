export const inputSchema = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            // title: 'Username',
            required: true,
            // 'x-decorator': 'FormItem',
            'x-component': 'AbFormInput',
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
    },
}

