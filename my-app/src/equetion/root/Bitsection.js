import React, { Component } from 'react'
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


var dataset = []
const math = require('mathjs');

export default class Numer extends Component {
  constructor(props) {
    super(props)
    this.cal = this.cal.bind(this)
    this.bitsection = this.bitsection.bind(this)
    this.state = { Text:"",Function: '', XL: null, XR: null , ans: null, iterlatoin: [],Error: [],Checkans: null}
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/api/Bisection`)
      .then(res => {
        const data = res.data;
        console.log(data)
        this.setState({ 
            Function:data.fx,
            XL:data.xl,
            XR:data.xr,
            Text:data.context
        });
      })
      .catch(err => {
        console.error(err)
      })
  }
  cal(x){
    var result = math.evaluate(this.state.Function, { x: x })
    return result;
  };
  result(){

  };
  bitsection(){
    var cal = this.cal
    var xl = this.state.XL ,xr = this.state.XR
    var data = [];
    data['Iter'] = []
    data['xl'] = []
    data['xr'] = []
    data['error']=[];
    var Xm;
    var Xmo;
    var iter = 0;
    console.log("fx: ",this.state.Function);
    console.log("xl: ",xl,"xr: ",xr)
    Xm = (xl + xr) / 2;
    if(cal(Xm) * cal(xr) > 0){
        xr = Xm
    }
    if(cal(Xm) * cal(xr) < 0){
        xl = Xm
    }
            data['Iter'][iter] = iter
            data['xl'][iter] = xl
            data['xr'][iter] = xr
            data['error'][iter] = Number(error)
    while(true){
        iter++;
        Xmo = Xm
        Xm = (xl + xr) / 2
        var error = Math.abs((Xm-Xmo)/Xm)
        if(error<=0.000001){
            /*data['Iter'][iter] = iter
            data['xl'][iter] = xl.toFixed(6)
            data['xr'][iter] = xr.toFixed(6)
            data['error'][iter] = Number(error)*/
            this.setState({ans:Xm.toFixed(6)})
            console.log("Error: ",error.toFixed(10))
            console.log(Xm.toFixed(6))
            console.log(Xm)
            var check = math.evaluate(this.state.Function, { x: Xm })
            this.setState({Checkans:check})
            console.log(this.state.Function)
            console.log(check)
            console.log(check.toFixed(6))
            break;
        }
        else if(iter>500)
        {   
            data['Iter'][iter] = iter
            data['xl'][iter] = xl.toFixed(6)
            data['xr'][iter] = xr.toFixed(6)
            data['error'][iter] = Number(error)
            
            break;
        }
        else if(cal(Xm)*cal(xr)>0)
        {
            Xmo = xr;
            xr = Xm;
        }
        else{
            Xmo = xl;
            xl = Xm;
        }
        data['Iter'][iter] = iter
        data['xl'][iter] = xl.toFixed(6)
        data['xr'][iter] = xr.toFixed(6)
        data['error'][iter] = Number(error)

    }
    this.createdataset(data['Iter'], data['xl'], data['xr'],data['error'])
    this.forceUpdate()
};

  createdataset(Iter,xl,xr,error){
    dataset = []
    for(var i = 0; i < xl.length; i++){
      dataset.push({
        Iter: Iter[i],
        xl: xl[i],
        xr: xr[i],
        error: error[i],
      })
    }
  };
  render() {
    
    return(
      <div style={{ width: '100%' }}>
        <h1>{this.state.Text}</h1>
        <Box sx={{ height: 30, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
        <TextField 
            label="Function"
            onChange={(ip) => {
            this.setState({Function:ip.target.value})}}
            value={this.state.Function}
            name="FUNCTION"
            />
        <Box sx={{ height: 30, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
        <TextField
            id="outlined-number"
            label="XL"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {this.setState({ XL: e.target.value })}}value={this.state.XL}
            placeholder="XL"
        />
        <Box sx={{ height: 30, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
        <TextField
            id="outlined-number"
            label="XR"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(ip) => {
            this.setState({ XR: ip.target.value })}}
            value={this.state.XR}
            name="XR"
            placeholder="XR"
          />
        <Box sx={{ height: 30, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
        <Button
          variant="contained" onClick={this.bitsection}>Submit
        </Button>
        <Box sx={{ height: 30, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>

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
        <Button color="inherit" onClick={() => { console.info({dataset})}}>เช็คError</Button>

      <ul/>
      <h1 >กราฟ XL, XR</h1>

      <LineChart
        width={800}
        height={300}
        data={dataset}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
      }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Iter" />
      <YAxis type="number" />
      <Tooltip cursor={{ stroke: 'red', strokeWidth: 1 }}/>
      <Legend />
      <Line
        strokeWidth={3}
        type="monotone"
        dataKey="xl"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line strokeWidth={3}  type="monotone" dataKey="xr" stroke="#FF5733" />
    </LineChart>
    <h1 >กราฟ Error</h1>
    <LineChart
      width={800}
      height={500}
      data={dataset}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Iter" />
      <YAxis />
      <Tooltip cursor={{ stroke: 'red', strokeWidth: 1 }}/>
      <Legend />
      <Line
        strokeWidth={3}
        type="monotone"
        dataKey="error"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      
    </LineChart>
      </div>
    )
  }
}