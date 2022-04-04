import React, { Component } from 'react'
import axios from 'axios';
import {Button} from 'antd';
const math = require('mathjs');

export default class Test extends Component {
  constructor(props) {
    super(props)
    this.cal = this.cal.bind(this)
    this.bitsection = this.bitsection.bind(this)
    this.state = { ans: [],Function: '', XL: null, XR: null }
  };
  componentDidMount() {
    axios.get(`http://localhost:8000/api/Bisection`)
      .then(res => {
        const data = res.data;
        this.setState({ 
            Function:data.fx,
            XL:data.xL,
            XR:data.xR,
        });
      })
      .catch(err => {
        console.error(err)
      })
  }
  cal(x){
    return math.evaluate(this.state.Function, { x: x })
  };
  bitsection(){
    var cal = this.cal
    console.log(cal)
    var xl = Number(this.state.XL)
    var xr = Number(this.state.XR)
    var xmn ;
    console.log("xl: ",xl,"xr: ",xr)


  };
  
  render() {
    
    return(
      <div>
        <Button onClick={this.bitsection}>Submit</Button>
        <h1>HELLO WORD</h1>
      </div>
      
    )
  }
}