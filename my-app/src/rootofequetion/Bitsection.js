import React, { Component } from 'react'
import axios from 'axios';
import { Button, TextField } from '@mui/material';



const math = require('mathjs');

export default class Test extends Component {
  
  constructor(props) {
    super(props)
    this.cal = this.cal.bind(this)
    this.bitsection = this.bitsection.bind(this)
    this.state = { Function: '', XL: null, XR: null , ans: null, iterlatoin: [],Error: []}
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
    var cal = this.cal
    console.log("fx: ",this.state.Function);
    var xl = Number(this.state.XL)
    var xr = Number(this.state.XR)
    var ErrorA = [];
    var iter = [];
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
      time = time + 1 
      var xmo = xmn
      xmn = (xl + xr) / 2
      if (cal(xmn) * cal(xr) > 0) {
          xr = xmn
          console.log("Root of equation is " , xmn);
          console.log("Iterlation " , time);
          iter.push(xmn)
      }
      if (cal(xmn) * cal(xr) < 0) {
          xl = xmn
          console.log("Root of equation is " , xmn);
          console.log("Iterlation " , time);
          iter.push(xmn)
      }
      var err = Math.abs((xmn - xmo) / xmn)
      ErrorA.push(err);
      if(err <= eps) {
        iter.push(xmn)
        console.log("Ans Root of equation is " , xmn);
        console.log("Iterlation " , time);
        this.setState({ ans: xmn })
        ErrorA.push(err);
        break
      }

    }
    this.setState({ iterlatoin: iter })
    this.setState({ Error: ErrorA })
  };
  
  render() {
    
    return(
      <ul>
        <br></br>
        <TextField 
            label="Function"
            onChange={(ip) => {
            this.setState({Function:ip.target.value})
            this.forceUpdate()}}
            value={this.state.Function}
            name="FUNCTION"
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
            placeholder="XL"
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
        
        <TextField
            id="outlined-number"
            label="ans"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.ans}
            placeholder="ans"
          />
          <ul></ul>
          <Button color="inherit" onClick={() => {
        console.info("Ans: ",this.state.iterlatoin,"Error: ",this.state.Error)
      }}>เช็คError</Button>
      </ul>
      
    )
  }
}