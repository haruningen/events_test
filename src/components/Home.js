import React, {useEffect, useState} from 'react';
import {Card, List} from 'antd';
import {getTokenFromLocalStorage} from "../lib/common";
import api from "../api";

const Home = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const token = getTokenFromLocalStorage();
        api.getEvents(token).then((result) => {
            setEvents(result.data);
        })
            .catch((error) => console.log(error));
    }, []);

    return (
        <List
            itemLayout="vertical"
            size="large"
            style={{marginTop: 20}}
            grid={{gutter: 16, column: 4}}
            dataSource={events}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        hoverable
                        style={{width: 240}}
                        cover={<img alt="example" src={item.image_url}/>}>
                        <List.Item.Meta
                            title={<a href={item.href}>{item.name}</a>}
                            description={item.description}
                        />
                        {item.summary}
                    </Card>
                </List.Item>
            )}
        />
    );
}

export default Home;