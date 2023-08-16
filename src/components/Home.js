import React, {useEffect, useState} from 'react';
import {Card, List, Layout, Button, Tooltip, Typography, Pagination,} from 'antd';
import {getTokenFromLocalStorage, removeTokensFromLocalStorage} from "../lib/common";
import api from "../api";
import {useNavigate} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";

const {Header, Content} = Layout;
const {Paragraph} = Typography;

const Home = () => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const navigate = useNavigate()
    const perPage = 20

    useEffect(() => {
        api.getEvents().then((result) => {
            setEvents(result.data.items);
            setPage(page + 1);
            setTotalPage(result.data.count / perPage);
        })
            .catch((error) => console.log(error));
    }, []);

    const goToDetail = (event) => {
        const id = event.currentTarget.dataset.id
        navigate(`/event/${id}`)
    }

    const goToProfile = () => {
        const token = getTokenFromLocalStorage();
        if (token) {
            navigate('/profile')
        } else {
            navigate('/signin')
        }
    }

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
                <Pagination defaultCurrent={page} total={totalPage} />;
            </Content>
        </Layout>
    );
}

export default Home;