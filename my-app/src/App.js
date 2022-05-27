import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Bitsection from './equetion/root/Bitsection';
import Falsposition from './equetion/root/falseposition';
import Oneposition from './equetion/root/oneposition';
import Cramer from './equetion/linear/cramer'
import Conjugate from './equetion/linear/Conjugate';
import Jacobi from './equetion/linear/jacobi';
import Gaussseidel from './equetion/linear/gaussseidel';
import Newton from './equetion/interpolation/newton';
import { Menu, Dropdown, Button } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import {Space,Layout} from 'antd';
import axios from 'axios';

const { Content , Header} = Layout;

const menu1 = (
  <Menu>
    <Menu.Item >
      <Link to="/Bisection">Bisection</Link>
    </Menu.Item>
    <Menu.Item >
      <Link to="/Falsposition">Falsposition</Link>
    </Menu.Item>
    <Menu.Item >
      <Link to="/Oneposition">Oneposition</Link>
    </Menu.Item>
  </Menu>
);
const menu2 = (
  <Menu>
    <Menu.Item >
      <Link to="/Cramer">Cramer's rule</Link>
    </Menu.Item>
    <Menu.Item >
      <Link to="/Conjugate">Conjugate Gradient</Link>
    </Menu.Item>
    <Menu.Item >
      <Link to="/Jacobi">Jacobi Iteration</Link>
    </Menu.Item>
    <Menu.Item >
      <Link to="/gaussseidel">Gauss Seidel</Link>
    </Menu.Item>
  </Menu>
);
const menu3 = (
  <Menu>
    <Menu.Item >
      <Link to="/Newton">Newton Divided Difference</Link>
    </Menu.Item>
  </Menu>
);

function App(){
  const [Token,setToken] = useState("");
  //let Token
  axios.post(`http://localhost:5000/login`,{
    "email":"good@gmail.com",
    "password":"999999"
  }).then(res=>{setToken(res.data.accessToken)})
  console.log(Token)
  

  return(
    <Router>
      <Layout>
        <Header>
        <Space>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['8']}>
            
            <Dropdown overlay={menu1}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <Button>Root of Equation </Button>
                </a>
              </Dropdown>
              
              <Dropdown overlay={menu2}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <Button>LINEAR ALGEBRAIC EQUATIONS</Button>
                </a>
              </Dropdown>
              <Dropdown overlay={menu3}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <Button>Divided Difference</Button>
                </a>
              </Dropdown>

              <Dropdown overlay={menu2}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <Button>LINEAR ALGEBRAIC EQUATIONS</Button>
                </a>
              </Dropdown>
          </Menu>
          </Space>
        </Header>

        <Content className="site-layout-background" style={{ padding: 40,margin: 0,minHeight: 1000, }}>
          <Routes>
            <Route exact path="/Bisection" element={<Bitsection Token={Token}/>}/>
            <Route exact path="/Falsposition" element={<Falsposition Token={Token}/>}/>
            <Route exact path="/Oneposition" element={<Oneposition Token={Token}/>}/>
            <Route exact path="/Cramer" element={<Cramer Token={Token}/>}/>
            <Route exact path="/Conjugate" element={<Conjugate Token={Token}/>}/>
            <Route exact path="/jacobi" element={<Jacobi Token={Token}/>}/>
            <Route exact path="/gaussseidel" element={<Gaussseidel Token={Token}/>}/>
            <Route exact path="/newton" element={<Newton Token={Token}/>}/>
          </Routes>
        </Content>

      </Layout>
    </Router>
  )
}
export default App;