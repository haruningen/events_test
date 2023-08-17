import React from 'react';
import {useState} from 'react';
import {APP_ROUTES} from '../utils/constants';
import {useLocation, useNavigate} from 'react-router-dom';
import {getTokenFromLocalStorage, storeTokensInLocalStorage} from '../lib/common';
import {Button, Form, Input, Modal, QRCode} from 'antd';
import api from "../api";

const TFACode = () => {
    const navigate = useNavigate();

    const {state} = useLocation();
    const {enable} = state;

    const [code, setCode] = useState('');


    const switchTfa = async () => {
        try {
            const token = getTokenFromLocalStorage();
            if (enable) {
                const response = await api.tfaEnableWithCode(token, code)
                if (!response?.data) {
                    console.log('Something went wrong during enable TFA in: ', response);
                    return;
                }
                navigate(APP_ROUTES.PROFILE, {replace: true, state: {url: response?.data?.otp_auth_url}})
            }

            if (!enable) {
                const response = await api.tfaDisable(token, code)
                if (!response?.data) {
                    console.log('Something went wrong during disable TFA in: ', response);
                    return;
                }
                navigate(APP_ROUTES.PROFILE, {replace: true})
            }
        } catch (err) {
            console.log('Some error occured during switch TFA in: ', err);
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
        onFinish={switchTfa}
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

export default TFACode;