import { Menu, Dropdown, Button, Space } from 'antd';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Bit from '../rootofequetion/Bitsection';
import * as React from 'react';
import 'antd/dist/antd.css';

import {Layout} from 'antd';
const { Content , Header} = Layout;
const menu = (
  <Menu>
    <Menu.Item>
    <a>2nd menu it</a>
    <Router>
      <Routes>
      <Route path='/' exact component={Bit} />
      </Routes>
      </Router>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

function App(){
  return(
    <div className = "App">
      <Layout>
      <Header style={{background:'#a0d911'}}>
        <Space direction="vertical">
                    <Space wrap>
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <Button>root of equation</Button>
                        </Dropdown>
                        <Dropdown overlay={menu} placement="bottom">
                            <Button>bottom</Button>
                        </Dropdown>
                        <Dropdown overlay={menu} placement="bottomRight">
                            <Button>bottomRight</Button>
                        </Dropdown>
                    </Space>
        </Space>
      </Header>
    </Layout>
    
    </div>
  )
}
export default App;