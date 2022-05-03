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
        this.state = {
            Text:'', 
            Function: '', 
            XR: null,
            ans: null,
            XL: null
            ,ans: null
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/api/Falseposition').then(res=>{
            const data = res.data;
            console.log(data);
            this.setState({
                Text:data.context,
                Function:data.fx,
                XL:data.xl,
                XR:data.xr,
            })
        })
    };

    cal(x){
        var result = math.evaluate(this.state.Function, { x: x })
        return result;
    }
    one_pst(){
        var cal = this.cal;
        var xl = this.state.XL;
        var xr = this.state.XR;
        var iter = 0;
        var Xn;
        var Xno;
        var error;
        var data = [];
        data['iter'] = [];
        data['Xn'] = [];
        data['Xno'] = [];
        data['xl'] = [];
        data['xr'] = [];
        data['error'] = [];

        console.log("XL: ",xl," XR : ",xr);
        
        Xn = (xl * cal(xr) - xr * cal(xl)) / (cal(xr) - cal(xl))
        if (cal(Xn) * cal(xr) > 0) {
            xr = Xn
        }
        if (cal(Xn) * cal(xr) < 0) {
            xl = Xn
        }
	    while(true){
            iter++
            Xno = Xn 
            Xn = (xl + xr) / 2
            error = Math.abs((Xn - Xno) / Xn);
            if(iter >500){
                data['iter'][iter] = iter
                data['Xn'][iter] = Xn
                data['Xno'][iter] = Xno
                data['xl'][iter] = xr
                data['xr'][iter] = xl
                data['error'][iter] = error
                break;
            }
            if (cal(Xn) * cal(xr) > 0) {
                xr = Xn
            }
            if (cal(Xn) * cal(xr) < 0) {
                xl = Xn
            }
            if(error < 0.000001){
                data['iter'][iter] = iter
                data['Xn'][iter] = Xn
                data['Xno'][iter] = Xno
                data['xl'][iter] = xr
                data['xr'][iter] = xl
                data['error'][iter] = error
                console.log(Xn," iter: ",iter)
                this.setState({ans:Xn.toFixed(6)})
                break
            }
            data['iter'][iter] = iter
            data['Xn'][iter] = Xn
            data['Xno'][iter] = Xno
            data['xl'][iter] = xr
            data['xr'][iter] = xl
            data['error'][iter] = error
	    }
        this.createdataset(data['iter'], data['Xn'], data['Xno'],data['xl'],data['xr'],data['error'])
        this.forceUpdate()
    };
    createdataset(iter,xn,xno,xl,xr,error){
        dataset = []
        for(var i = 0; i < iter.length; i++){
            dataset.push({
            Iter: iter[i],
            Xn: xn[i],
            Xno: xno[i],
            XL: xl[i],
            XR: xr[i],
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
                    label="XL"
                    type="number"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={(e) => {this.setState({ XL: e.target.value })
                    this.forceUpdate()}}value={this.state.XL}
                    placeholder="XL"
                />
                <ul/>
                <TextField
                    id="outlined-number"
                    label="XR"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {this.setState({ XR: e.target.value })
                    this.forceUpdate()}}value={this.state.XR}
                    placeholder="XR"
                />
                
                <ul/>
                <Button variant="contained" onClick={this.one_pst}>Submit</Button>
                <ul/>
                <TextField id="outlined-number" label="ans" InputLabelProps={{shrink: true,}} value={this.state.ans} placeholder="ans"/>
                <ul/>
                <Button variant="inherit"  onClick={() => {console.info({dataset})}}>console.log</Button>
                <ul/>
                <h1 >กราฟ XL, XR</h1>
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
                        <YAxis type="number" domain={['auto', 'auto']} />
                        <Tooltip cursor={{ stroke: 'red', strokeWidth: 1 }}/>
                        <Legend />
                        <Line
                            strokeWidth={3}
                            type="monotone"
                            dataKey="XL"
                            stroke="#FF2828"
                            activeDot={{ r: 8 }}
                        />
                        <Line 
                            strokeWidth={3}
                            type="monotone" 
                            dataKey="XR" 
                            stroke="#000000" 
                        />
                    </LineChart>
                    <ul/>
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
                        <YAxis type="number" />
                        <Tooltip cursor={{ stroke: 'red', strokeWidth: 1 }}/>
                        <Legend />
                        <Line
                            strokeWidth={3}
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