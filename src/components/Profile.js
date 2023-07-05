import React, {useEffect, useState} from "react";
import {getTokenFromLocalStorage} from "../lib/common";
import api from "../api";
import {Image, Layout} from "antd";
const {Content} = Layout;

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = getTokenFromLocalStorage();
        api.getUser(token).then((result) => {
            setUser(result.data);
        })
            .catch((error) => console.log(error));
    }, []);

    return (<Layout>
        <Content style={{
            textAlign: 'center', minHeight: 120, lineHeight: '120px', color: '#fff', backgroundColor: '#ffffff',
        }}>
            <Image src={user?.avatar_url}/>
        </Content>
    </Layout>);
}

export default Profile;