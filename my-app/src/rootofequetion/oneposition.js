import React, {Component} from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const math = require('mathjs');

var dataset = [];

export default class Test extends Component {
    constructor(props){
        super(props)
        this.cal = this.cal.bind(this)
        this.one_pst = this.one_pst.bind(this)
        this.state = {Text:'', Function: '', X: null,ans: null}
    }
    componentDidMount(){
        axios.get('http://localhost:5000/api/Onepoint').then(res=>{
            const data = res.data;
            console.log(data);
            this.setState({
                Text:data.context,
                Function:data.fx,
                X:data.x,
            })
        })
    };

    cal(x){
        var result = math.evaluate(this.state.Function, { x: x })
        return result;
    }
    one_pst(){
        var cal = this.cal
        var data = []
        var time = 0;
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
            time = time+1
            error = math.abs((X-Xn)/X) ;
            data['Iter'][time] =time
            data['X'][time]=X
            data['Xn'][time] = Xn
            data['error'][time] = error
		    if(error < es){
			    console.log(X);
                this.setState({ ans: X })
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
            Iter: iter[i+1],
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
                    <XAxis dataKey="time" />
                    <YAxis type="number" />
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