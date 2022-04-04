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
        console.log(data)
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
    return math.evaluate(this.state.Function/*(x^4)-13*/, { x: x })
  };
  bitsection(){
    var cal = this.cal
    console.log(cal)
    var xl = Number(this.state.XL)
    var xr = Number(this.state.XR)
    var time = 0;
    var eps = 0.00001
    var xmn ;
    console.log("xl: ",xl,"xr: ",xr)
    xmn = (xl + xr) / 2;
    var xmn = (xl + xr) / 2;
    if (cal(xmn) * cal(xr) > 0) {
      xr = xmn
    }
    else if (cal(xmn) * cal(xr) < 0) {
        xl = xmn
    }
    else {
      return
    }
    while (true) {
      if (time >= 1000) {
          console.log('break')
          break
      }
      time++
      var xmo = xmn
      xmn = (xl + xr) / 2
      if (cal(xmn) * cal(xr) > 0) {
          xr = xmn
      } else if (cal(xmn) * cal(xr) < 0) {
          xl = xmn
      } else {
          break
      }
      var err = Math.abs((xmn - xmo) / xmn)
      if (err <= eps) {
          console.log("Root of equation is " , xmn);
          break
      }
    }
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