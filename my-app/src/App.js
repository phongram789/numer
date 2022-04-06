/*import { BrowserRouter as Link,Router } from 'react-router-dom'*/
import Bar from './componants/barmenu';
import Bit from './rootofequetion/Bitsection';
import { Menu, Dropdown, Button } from 'antd';


import * as React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import {Layout} from 'antd';
const { Content , Header} = Layout;

function App(){
  return(
    <div className = "App">
      <Layout>
      <Bar/>
      <Content>
      <Bit/>
      </Content>
    </Layout>
    
    </div>
  )
}
export default App;