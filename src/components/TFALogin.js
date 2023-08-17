import React from 'react';
import {useState} from 'react';
import {APP_ROUTES} from '../utils/constants';
import {useLocation, useNavigate} from 'react-router-dom';
import {storeTokensInLocalStorage} from '../lib/common';
import {Button, Form, Input} from 'antd';
import api from "../api";

const TFALogin = () => {
    const navigate = useNavigate();

    const {state} = useLocation();
    const {email} = state;

    const [code, setCode] = useState('');


    const signIn = async () => {
        console.log('email', email)
        try {
            const response = await api.tfaLogin(email, code)
            if (!response?.data) {
                console.log('Something went wrong during signing in: ', response);
                return;
            }
            storeTokensInLocalStorage(response.data.access_token, response.data.refresh_token);
            navigate(APP_ROUTES.HOME)
        } catch (err) {
            console.log('Some error occured during signing in: ', err);
        }
    };

    const handleChange = (e) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            setCode(inputValue);
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
            name="Code"
            rules={[{required: true, message: 'Please input your Code!'}]}
        >
            <Input
                value={code}
                maxLength={6}
                onChange={(e) => handleChange(e)}
                placeholder="Code"
            />
        </Form.Item>
        <Form.Item>
            <Button style={{
                marginRight: 12
            }} type="primary" htmlType="submit" className="login-form-button">
                Send code
            </Button>
        </Form.Item>
    </Form>);
}

export default TFALogin;