import React from 'react';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Form, Input, Result} from 'antd';
import api from "../api";

const ResetPassword = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [new_password, setNewPassword] = useState('');
    const [re_new_password, setReNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [reset, setReset] = useState(false);


    const requestResetPassword = async () => {
        try {
            setIsLoading(true);
            const response = await api.confirmResetPassword(params.token, new_password, re_new_password)
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
                    maxWidth: 1500,
                    padding: 12,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={requestResetPassword}
                autoComplete="off"
            >
                <Form.Item
                    name="new_password"
                    label="New Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        value={new_password}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="re_new_password"
                    label="Confirm New Password"
                    dependencies={['new_password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('new_password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        value={re_new_password}
                        onChange={(e) => {
                            setReNewPassword(e.target.value);
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
                title="Successfully reset password!"
                subTitle="Now you can login with your new password"
                extra={[
                    <Button type="primary" onClick={goToSignIn}>
                        Go SignIn
                    </Button>,
                ]}
            />}
        </div>
    );
}

export default ResetPassword;