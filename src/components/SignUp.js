import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import {API_ROUTES, APP_ROUTES} from '../utils/constants';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Form, Input} from "antd";
import api from "../api";

const SignUp = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const signUp = async () => {
        try {
            setIsLoading(true);
            const response = await api.signUp(email, password)
            if (!response?.data?.token) {
                console.log('Something went wrong during signing up: ', response);
                return;
            }
            navigate(APP_ROUTES.SIGN_IN);
        } catch (err) {
            console.log('Some error occured during signing up: ', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 12,
            }}
            style={{
                maxWidth: 1200,
                padding: 12,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={signUp}
            autoComplete="off"
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item>
                <Button style={{
                    marginRight: 12
                }} type="primary" htmlType="submit" className="login-form-button">
                    Sign Up
                </Button>
                Or <Link to="/signin">login now!</Link>
            </Form.Item>
        </Form>
    );
}

export default SignUp;