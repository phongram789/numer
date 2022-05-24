import React, {Component} from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const math = require('mathjs');

var dataset = [];

export default class Numer extends Component {
    constructor(props){
        super(props)
        this.cal = this.cal.bind(this)
        this.one_pst = this.one_pst.bind(this)
        this.state = {Text:'', Function: '', X: null,ans: null ,check: null}
    }

    componentDidMount(){
    console.log("Token is"+this.props.Token)
    if(this.props.Token !== ""){
      axios.get(`http://localhost:5000/api/Onepoint`,{
        headers:{
          Authorization: 'Bearer ' + this.props.Token
        }
      })
      .then(res => {
        const data = res.data;
        console.log(data)
        this.setState({ 
            Text:data.context,
            Function:data.fx,
            X:data.x,
        });
      })
      .catch(err => {
        console.error(err)
      })

      
    }
    
  }

    cal(x){
        var result = math.evaluate(this.state.Function, { x: x })
        return result;
    }
    one_pst(){
        var cal = this.cal
        var data = []
        var iter= 0;
        data['Iter'] = []
        data['X'] = []
        data['Xn'] = []
        data['error'] = []
        var X = this.state.X;
        console.log(X);
        var Xn = cal(X);
        var error;
        var es = 0.000001
	    while(true){
            iter = iter+1
            error = math.abs((X-Xn)/X) ;
            data['Iter'][iter] =iter
            data['X'][iter]=X
            data['Xn'][iter] = Xn
            data['error'][iter] = error
            if(iter >500){
                break;
            }
		    if(error < es){
                console.log(data)
			    console.log(X);
                this.setState({ ans: X.toFixed(6) })
                let check = math.evaluate(this.state.Function, { x: X })
                this.setState({ check: check })
			    break;
		    }
		    else{
                X = Xn;
                Xn = cal(X);
		    }
            this.createdataset(data['Iter'],data['X'],data['Xn'],data['error']);
            this.forceUpdate()
	    }
    };
    createdataset(iter,x,xn,error){
        dataset = []
        for(var i = 0; i < iter.length; i++){
            dataset.push({
            Iter: iter[i],
            X: x[i],
            Xn: xn[i],
            Error: error[i],
            })
        }
    };
    render() {
        return(
            <div style={{ width: '100%' }}>
                <h1>{this.state.Text}</h1>
                <h1></h1>
                <TextField 
                    label="Function"
                    onChange={(ip) => {
                    this.setState({Function:ip.target.value})
                    this.forceUpdate()}}
                    value={this.state.Function}
                    name="FUNCTION"
                />
                <ul/>
                <TextField
                    id="outlined-number"
                    label="X"
                    type="number"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={(e) => {this.setState({ X: e.target.value })
                    this.forceUpdate()}}value={this.state.X}
                    placeholder="XL"
                />
                <ul/>
                <Button variant="contained" onClick={this.one_pst}>Submit</Button>
                <ul/>
                <TextField id="outlined-number" label="ans" InputLabelProps={{shrink: true,}} value={this.state.ans} placeholder="ans"/>
                <ul/>
                <TextField label="ช่องตรวจคำตอบ" color="secondary" focused value={this.state.check}/>
                <Box sx={{ height: 30, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
                <Button variant="inherit"  onClick={() => {console.info({dataset}," ",this.state.ans)}}>console.log</Button>
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
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="X"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="Xn" stroke="#82ca9d" />
                    </LineChart>

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
                    <YAxis type="number" padding={{ top: 20, bottom: 20 }} allowDataOverflow={true} ticks={[0.001,0.01,0.03,0.05,0.06]} domain={[0.001, 0.1]} />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="Error"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    
                    </LineChart>
            </div>
            
        )
    }
}