import React, {useEffect, useState} from 'react';
import {Card, List, Layout, Button, Tooltip, Typography,} from 'antd';
import {getTokenFromLocalStorage} from "../lib/common";
import api from "../api";
import {useNavigate} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";

const {Header, Content} = Layout;
const {Paragraph} = Typography;

const Home = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const token = getTokenFromLocalStorage();
        api.getEvents(token).then((result) => {
            setEvents(result.data);
        })
            .catch((error) => console.log(error));
    }, []);

    const goToDetail = (event) => {
        const id = event.currentTarget.dataset.id
        navigate(`/event/${id}`)
    }

    const goToProfile = () => navigate('/profile')

    return (
        <Layout>
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
                textAlign: 'center',
                minHeight: 120,
                lineHeight: '120px',
                color: '#fff',
                backgroundColor: '#ffffff',
            }}>
                <List
                    itemLayout="vertical"
                    size="large"
                    style={{marginTop: 20}}
                    grid={{gutter: 16, column: 4}}
                    dataSource={events}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                onClick={goToDetail}
                                data-id={item.id}
                                hoverable
                                style={{width: 240}}
                                cover={<img alt="example" src={item.image_url}/>}>
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
                /></Content>
        </Layout>
    );
}

export default Home;