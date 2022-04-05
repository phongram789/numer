import React, { Component } from 'react'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const math = require('mathjs');

export default class Test extends Component {
  
  constructor(props) {
    super(props)
    this.cal = this.cal.bind(this)
    this.bitsection = this.bitsection.bind(this)
    this.state = { Function: '', XL: null, XR: null }
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/api/Bisection`)
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
    return math.evaluate(this.state.Function, { x: x })
  };
  result(){

  };
  bitsection(){
    var result = this.cal;
    var cal = this.cal
    console.log("fx: ",this.state.Function);
    var xl = Number(this.state.XL)
    var xr = Number(this.state.XR)
    var time = 0;
    var eps = 0.00001
    var xmn ;
    console.log("xl: ",xl,"xr: ",xr)
    var xmn = (xl + xr) / 2;
    if (cal(xmn) * cal(xr) > 0) {
      xr = xmn
    }
    else if (cal(xmn) * cal(xr) < 0) {
        xl = xmn
    }
    else {
      /*this.forceUpdate()*/
      return
    }
    while (true) {
      time++
      var xmo = xmn
      xmn = (xl + xr) / 2
      if (cal(xmn) * cal(xr) > 0) {
          xr = xmn
          console.log("Root of equation is " , xmn);
          console.log("Iterlation " , time);
      } else if (cal(xmn) * cal(xr) < 0) {
          xl = xmn
          console.log("Root of equation is " , xmn);
          console.log("Iterlation " , time);
      } else {
          console.log("reak is " , xmn);
          
          break
      }
      var err = Math.abs((xmn - xmo) / xmn)
      if (err <= eps) {

          console.log("Ans Root of equation is " , xmn);
          console.log("Iterlation " , time);
          break
      }
    }
    /*this.forceUpdate()*/
  };
  
  render() {
    
    return(
      <div>
        <br></br>
        <TextField 
            label="Function"
            onChange={(ip) => {
            this.setState({Function:ip.target.value})
            this.forceUpdate()}}
            value={this.state.Function}
            />
        <h1></h1>
        <TextField
            id="outlined-number"
            label="XL"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {this.setState({ XL: e.target.value })
            this.forceUpdate()}}value={this.state.XL}
        />

        <p></p>
        <TextField
            id="outlined-number"
            label="XR"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(ip) => {
            this.setState({ XR: ip.target.value })
            this.forceUpdate()}}
            value={this.state.XR}
            name="XR"
            placeholder="XR"
          />
        <h1></h1>
        <Button
          
          variant="contained" onClick={this.bitsection}>Submit
        </Button>
        <h1>HELLO WORD</h1>
      </div>
      
    )
  }
}