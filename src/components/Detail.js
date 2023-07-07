import React, {useEffect, useState} from 'react';
import {Button, Image, Layout, QRCode, Space, Tooltip, Typography} from 'antd';
import {getTokenFromLocalStorage} from "../lib/common";
import api from "../api";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";
import {FRONTEND_URL} from '../utils/constants';

const {Text, Title} = Typography;

const {Header, Content} = Layout;

const Detail = () => {
    const [event, setEvent] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const params = useParams();
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        const token = getTokenFromLocalStorage();
        api.getEventDetail(token, params.id).then((result) => {
            const now = new Date()
            if (result?.data?.end) {
                const end = new Date(result.data.end)
                setDisabled(now > end)
            } else {
                setDisabled(false)
            }
            setEvent(result.data);
        })
            .catch((error) => console.log(error));
    }, []);

    const attendEvent = () => {
        const token = getTokenFromLocalStorage();
        api.attendEvent(token, params.id).then((result) => {
            let newEvent = event;
            newEvent.want_go = !event.want_go
            setEvent({...newEvent});
        })
            .catch((error) => console.log(error));
    }

    const goToProfile = () => navigate('/profile')
    const changeQR = () => setShowQR(!showQR)

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    };

    return (<Layout>
        <Header style={{
            textAlign: 'right',
            color: '#fff',
            height: 64,
            paddingInline: 50,
            lineHeight: '64px',
            backgroundColor: '#7dbcea',
        }}>
            <Tooltip title="Profile">
                <Button style={{backgroundColor: '#ffffff', color: '#7dbcea'}}
                        onClick={goToProfile}
                        type="primary"
                        shape="circle"
                        icon={<UserOutlined/>}
                />
            </Tooltip>
        </Header>
        <Content style={{
            textAlign: "center",
            minHeight: 120,
            backgroundColor: '#ffffff',
            padding: 20,
        }}>
            <Image style={{maxHeight: 430}} src={event?.image_url}/>
            <br/><br/>
            <div style={{
                width: "auto",
                textAlign: "right",
            }}>
                {!event?.want_go && <Button disabled={disabled} onClick={attendEvent} type="primary" size='large'>
                    Want to go
                </Button>}
                {event?.want_go && <Button disabled={disabled} onClick={attendEvent} size='large'>
                    Don't want to go
                </Button>}
            </div>
            <Title level={3}>{event?.name}</Title>
            <div style={{
                width: "auto",
                textAlign: "left",
            }}>
                <Text>{event?.summary}</Text>
                <br/>
                {event?.start && <Text>Start at {formatDate(event?.start)}</Text>}
                <br/>
                {event?.end && <Text>End at {formatDate(event?.end)}</Text>}
                <br/><br/>
                {!showQR && <Button type="primary" size='large' disabled={disabled} onClick={changeQR}>
                    Get QR
                </Button>}
                {showQR && <Button type="dashed" size='large' onClick={changeQR}>
                    Hide QR
                </Button>}
                <br/><br/>
                {showQR && <QRCode
                    value={FRONTEND_URL + location.pathname}
                    color="#7dbcea"
                />}
            </div>
        </Content>
    </Layout>);
}

export default Detail;