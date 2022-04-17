import React, {Component} from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';

const math = require('mathjs');
export default class Test extends Component {
    constructor(props){
        super(props)
        this.cal = this.cal.bind(this)
        this.False_pst = this.False_pst.bind(this)
        this.state = {Text:'', Function: '', XL: null, XR: null , ans: null, iterlatoin: [],Error: []}
    }
    componentDidMount(){
        axios.get('http://localhost:5000/api/Falseposition').then(res=>{
            const data = res.data;
            console.log(data);
            this.setState({
                Text:data.context,
                Function:data.fx,
                XL:data.xL,
                XR:data.xR
            })
        })
    }
    cal(x){
        var result = math.evaluate(this.state.Function, { x: x })
        return result;
    };
    False_pst(){
        var cal = this.cal;
        var xl = Number(this.state.XL)
        var xr = Number(this.state.XR)
        var time = 0;
        var Xn = xl
        console.log("XL: ",xl," XR : ",xr)
        while(true){
            time = time + 1
            Xn = ((xl*cal(xr)-xr*cal(xl))/(cal(xr)-cal(xl)))
            var error = cal(Xn)
            if(error < 0.000001){
                console.log(Xn)
                break;
            }
            if(cal(Xn)*cal(xr) > 0){
                xl = Xn;
            }
            else{
                xr = Xn;
            }
        }
    };

    render() {
        return(
            <div>
                {this.state.Text}
                <Button variant="contained" onClick={this.False_pst}>Submit</Button>
            </div>
        )
    }
}