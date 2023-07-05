import React, {useEffect, useState} from "react";
import api from "../api";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Alert, Button} from "antd";

const EmailVerification = () => {
    const [valid, setValid] = useState(null);
    const [message, setMessage] = useState(null);
    const params = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        api.verifyEmail(params.token).then((result) => {
            if (result.data.status === 'success') {
                setValid(1)
            } else if (result.data.status === 'failed') {
                setValid(2)
            }
            setMessage(result.data.message)
        })
            .catch((error) => console.log(error));
    }, null);

    const goToSignIn = () => {
        navigate('/signin')
    }

    return (
        <div className="container" style={{padding: 20}}>
            {valid === 1 && (
                <Alert
                    message="Success"
                    description={message}
                    type="success"
                    showIcon
                />
            )}
            {valid === 2 && (
                <Alert
                    message="Error"
                    description={message}
                    type="error"
                    showIcon
                />
            )}
            <Button type="link" onClick={goToSignIn}>Go to SignIn</Button>
        </div>
    );
}

export default EmailVerification;