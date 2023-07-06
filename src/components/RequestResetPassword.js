import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Form, Input, Result} from 'antd';
import api from "../api";

const RequestResetPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [reset, setReset] = useState(false);


    const requestResetPassword = async () => {
        try {
            setIsLoading(true);
            const response = await api.requestResetPassword(email)
            if (response?.data) {
                setReset(true)
            }
        } catch (err) {
            console.log('Some error occurred during signing in: ', err);
        } finally {
            setIsLoading(false);
        }
    };

    const goToSignIn = () => navigate('/signin')

    return (
        <div>
            {!reset && <Form
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 12,
                }}
                style={{
                    maxWidth: 600,
                    padding: 12,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={requestResetPassword}
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

                <Form.Item>
                    <Button style={{
                        marginRight: 12
                    }} type="primary" htmlType="submit" className="login-form-button">
                        Reset password
                    </Button>
                </Form.Item>
            </Form>}
            {reset && <Result
                status="success"
                title="Successfully send reset password link!"
                subTitle="Follow instraction on your email"
                extra={[
                    <Button type="primary" onClick={goToSignIn}>
                        Go SignIn
                    </Button>,
                ]}
            />}
        </div>
    );
}

export default RequestResetPassword;