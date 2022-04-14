import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Bitsection from './rootofequetion/Bitsection';
import { Menu, Dropdown, Button } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import {Layout} from 'antd';
import { DownOutlined } from '@ant-design/icons';


const { Content , Header} = Layout;

const menu1 = (
  <Menu>
    <Menu.Item >
      <Link to="/Bitsection">Bitsection</Link>
    </Menu.Item>
    <Menu.Item >
      <Link to="/Falsposition">Falsposition</Link>
    </Menu.Item>
  </Menu>
);

function App(){
  return(
    <Router>
      <Layout>
        <Header>
          <div className="logo"  />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Dropdown overlay={menu1}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Root of Equation <DownOutlined />
                </a>
              </Dropdown>
          </Menu>
        </Header>

        <Content className="site-layout-background" style={{ padding: 24,margin: 0,minHeight: 600, }}>
          <Routes>
            <Route exact path="/Bitsection" element={<Bitsection/>}/>
          </Routes>
        </Content>

      </Layout>
    </Router>
  )
}
export default App;