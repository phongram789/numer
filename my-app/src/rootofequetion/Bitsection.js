import React, { Component } from 'react'
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const math = require('mathjs');
export default class Test extends Component {
  constructor(props) {
    super(props)
    this.cal = this.cal.bind(this)
    this.bitsection = this.bitsection.bind(this)
    this.state = { Context: " ",Function: '', XL: null, XR: null , ans: null, iterlatoin: [],Error: []}
  };

  componentDidMount() {
    console.log(this.props.Token)
    if(this.props.Token !== ""){
      axios.get(`http://localhost:5000/api/Bisection`,{
        headers:{
        Authorization: 'Bearer ' + this.props.Token
      }})
      .then(res => {
        const data = res.data;
        console.log(data)
        this.setState({ 
            Context:data.text,
            Function:data.fx,
            XL:data.xL,
            XR:data.xR,
        });
      })
      .catch(err => {
        console.error(err)
      })
    }
  }
  cal(x){
    return math.evaluate(this.state.Function, { x: x })
  };
  result(){

  };
  bitsection(){
    var data = []
    data['error'] = []
    data['time'] = []
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
    data['error'][time] = 0
    data['time'][time] = 0
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
      data['time'][time] = time
      data['error'][time] = Math.abs(err).toFixed(6)
      ErrorA.push(err);
      if(err <= eps) {
        iter.push(xmn)
        console.log("Ans Root of equation is " , xmn);
        console.log("Iterlation " , time);
        this.setState({ ans: xmn.toFixed(6) })
        data['error'][time] = err
        ErrorA.push(err);
        break
      }

    }
    this.setState({ iterlatoin: iter })
    this.setState({ Error: data })
    console.log("data: ",data);

  };
  
  render() {
    
    return(
      <ul>
        <br />
        <h1>{this.state.Context}</h1>
        <br />
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
            this.forceUpdate()}}
            value={this.state.XL}
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
        <Button variant="contained" onClick={this.bitsection}>Submit</Button>
        <ul></ul>
        <div><br></br></div>

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

      <LineChart width={600} height={300} data={this.state.Error}>
          <Line type="monotone" dataKey="time" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="error" />
          <YAxis />
        </LineChart>

      </ul>
      
    )
  }
}