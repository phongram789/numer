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
        this.state = {Text:'', A: null,B: null ,
            Col: null,
            Col2: null
        }
    };

    componentDidMount(){
        /*axios.get('http://localhost:5000/api/cramer').then(res=>{
            const data = res.data;
            console.log(data);
            this.setState({
                Text:data.context,
                A:data.A,
                Col:data.col
            })
        })*/
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
    creatmany(){
        
    }
    render() {
        return(
            <div>
                <div>
                <TextField
                    id="outlined-number"
                    label="SIZE X"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                      this.setState({ Col: e.target.value })}}
                      Value={this.state.Col}
                      placeholder="SIZE"
                />
                <TextField
                    id="outlined-number"
                    label="SXR"
                    type="number"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={(e) => {
                    this.setState({ Col2: e.target.value })}}
                    value={this.state.Col2}
                    name="XR"
                    placeholder="XR"
                />
                <Button
                    variant="contained" onClick={this.bitsection}>Submit
                </Button>
                </div>

                <div>
                
                </div>
            </div>
            
        )
    }
}