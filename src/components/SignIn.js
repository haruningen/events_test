import React from 'react';
import {useState} from 'react';
import {APP_ROUTES} from '../utils/constants';
import {Link, useNavigate} from 'react-router-dom';
import {useUser} from '../lib/customHooks';
import {storeTokensInLocalStorage} from '../lib/common';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import api from "../api";

const SignIn = () => {
    const navigate = useNavigate();
    const {user, authenticated} = useUser();
    if (user || authenticated) {
        navigate(APP_ROUTES.HOME)
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const signIn = async () => {
        try {
            setIsLoading(true);
            const response = await api.signIn(email, password)
            if (!response?.data?.tokens) {
                console.log('Something went wrong during signing in: ', response);
                return;
            }
            storeTokensInLocalStorage(response.data.tokens.access, response.data.tokens.refresh);
            navigate(APP_ROUTES.HOME)
        } catch (err) {
            console.log('Some error occured during signing in: ', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (<Form
        name="basic"
        labelCol={{
            span: 4,
        }}
        wrapperCol={{
            span: 12,
        }}
        style={{
            maxWidth: 600, padding: 12,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={signIn}
        autoComplete="off"
    >
        <Form.Item
            name="email"
            rules={[{
                type: 'email', message: 'The input is not valid E-mail!',
            }, {
                required: true, message: 'Please input your E-mail!',
            },]}
        >
            <Input
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                prefix={<UserOutlined className="site-form-item-icon"/>}
                placeholder="Email"
            />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[{required: true, message: 'Please input your Password!'}]}
        >
            <Input
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                prefix={<LockOutlined className="site-form-item-icon"/>}
                type="password"
                placeholder="Password"
            />
        </Form.Item>
        <Form.Item>
            <Link className="login-form-forgot" to="/request_reset_password">
                Forgot password
            </Link>
        </Form.Item>

        <Form.Item>
            <Button style={{
                marginRight: 12
            }} type="primary" htmlType="submit" className="login-form-button">
                Log in
            </Button>
            Or <Link to="/signup">register now!</Link>
        </Form.Item>
    </Form>);
}

export default SignIn;