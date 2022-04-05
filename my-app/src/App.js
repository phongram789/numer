/*import { BrowserRouter as Link,Router } from 'react-router-dom'*/
import BisectionS from './rootofequetion/Bitsection';

import * as React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import {Layout} from 'antd';
const { Content , Header} = Layout;


function App(){
  return(
    <div className = "App">
      <Layout>
      <Header style={{background:'#a0d911'}}>

      </Header>

      <Content style={{ padding: '0 50px' ,background:'#ffffff' }}>
      <BisectionS/>
      </Content>
    </Layout>
    
    </div>
  )
}
export default App;