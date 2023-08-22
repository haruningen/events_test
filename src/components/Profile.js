import React, {useEffect, useState} from "react";
import {
    getTokenFromLocalStorage,
    removeTokensFromLocalStorage
} from "../lib/common";
import api from "../api";
import {Avatar, Button, Upload, Layout, Typography, message, Card, List, Switch, Modal, QRCode} from "antd";
import {UploadOutlined, UserOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../utils/constants";

const {Content} = Layout;
const {Paragraph, Title} = Typography;

const Profile = () => {
    const [user, setUser] = useState(null);
    const [tfaEnabled, setTfaEnabled] = useState(false);
    const [events, setEvents] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tfaUrl, setTFAUrl] = useState('');

    const navigate = useNavigate()
    const {state} = useLocation();


    useEffect(() => {
        const token = getTokenFromLocalStorage();
        if (state?.url) {
            setTFAUrl(state?.url)
            setTfaEnabled(true)
            setIsModalOpen(true)
        }
        api.getUser(token).then((result) => {
            setUser(result.data);
            setTfaEnabled(result.data.tfa_enabled);
        })
            .catch((error) => console.log(error));
        api.getUserEvents(token).then((result) => {
            setEvents(result.data.items);
        })
            .catch((error) => console.log(error));
    }, []);

    const handleUpload = async () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('image', file);
        });
        setUploading(true);
        const token = getTokenFromLocalStorage();
        const response = await api.loadAvatar(token, formData)
        if (response?.data?.avatar_url) {
            user.avatar_url = response?.data?.avatar_url
            setUser({...user})
            setFileList([]);
            message.success('upload successfully.');
            setUploading(false);
        } else {
            message.error('upload failed.');
            setUploading(false);
        }
    };

    const logout = async () => {
        removeTokensFromLocalStorage()
        navigate('/signin')
    };

    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };

    const goToDetail = (event) => {
        const id = event.currentTarget.dataset.id
        navigate(`/event/${id}`)
    }
    const onChange = async (checked) => {
        setTfaEnabled(checked)
        console.log(user.tfa_enabled, checked)
        if (!tfaEnabled && checked) {
            const token = getTokenFromLocalStorage();
            const response = await api.tfaEnable(token)
            if (!response?.data) {
                console.log('Something went wrong during enable TFA in: ', response);
                setTfaEnabled(false)
            } else {
                setTFAUrl(response?.data.otp_auth_url)
                setIsModalOpen(true)
            }
        } else if (tfaEnabled && checked) {
            navigate(APP_ROUTES.TFA_CODE, {state: {enable: true}})
        } else if (tfaEnabled && !checked) {
            navigate(APP_ROUTES.TFA_CODE, {state: {enable: false}})
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (<Layout>
        <Modal title="Auth QR-code" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <QRCode value={tfaUrl || '-'} />
        </Modal>
        <Content style={{
            textAlign: "center",
            padding: 20,
            minHeight: 120,
            color: '#fff',
            backgroundColor: '#ffffff',
        }}>
            <div>
                {user?.avatar_url && <Avatar size={256} src={<img src={user?.avatar_url} alt="avatar"/>}/>}
                {!user?.avatar_url && <Avatar size={256} icon={<UserOutlined/>}/>}
            </div>
            <br/>
            <Upload {...props} maxCount={1}>
                <Button icon={<UploadOutlined/>}>Select Avatar File</Button>
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{marginTop: 16}}
            >
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
            <Title level={3}>{user?.email}</Title>
            <div style={{
                width: "auto",
                textAlign: "left",
                display: 'flex',
                alignItems: 'center',
                marginBottom: 20,
            }}>
                <Title style={{display: 'inline-block', margin: 0}} level={4}>Enable 2-Factor Auth</Title>
                <Switch style={{display: 'inline-block', marginLeft: 20}} checked={tfaEnabled} onChange={onChange}/>
            </div>
            <div style={{
                width: "auto",
                textAlign: "left",
            }}>
                <Button
                    type="primary"
                    onClick={logout}>
                    Logout
                </Button>
                <Title level={5}>My events</Title>
            </div>
            <br/>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={events}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            onClick={goToDetail}
                            data-id={item.id}
                            hoverable
                            style={{width: 240}}
                            cover={item.image_url && <img alt="example" src={item.image_url}/>}>
                            <List.Item.Meta
                                title={<a href={item.href}>{item.name}</a>}
                                description={item.description}
                            />
                            <Paragraph ellipsis={{rows: 2, expandable: true, symbol: 'more'}}>
                                {item.summary}
                            </Paragraph>
                        </Card>
                    </List.Item>
                )}
            />
        </Content>
    </Layout>);
}

export default Profile;