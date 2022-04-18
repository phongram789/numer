const math = require('mathjs');
function cal(x){
    var result = x*(43)-1;
    return result;
}
function False_pst(L,R){
    var xl = L
    var xr = R
    var time = 0;
    var Xn;
    var Xno;
    if (cal(Xn) * cal(xr) > 0) {
        xr = Xn
    }
    if (cal(Xn) * cal(xr) < 0) {
        xl = Xn
    }
    while(true){
        time++
        Xno = Xn 
        Xn = (xl + xr) / 2
        var error = Math.abs((Xn - Xno) / Xn)
        if (cal(Xn) * cal(xr) > 0) {
            xr = Xn
        }
        if (cal(Xn) * cal(xr) < 0) {
            xl = Xn
        }
        if(error < 0.000001){
            console.log(Xn," time: ",time)
            break
        }
    }
};

var L =0.02;
var R = 0.03;
False_pst(L,R);
//console.log(1/43);
import React, {Component} from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';

const math = require('mathjs');

export default class False extends Component {
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
            this.setState({ Text:data.context, Function:data.fx, XL:data.xL, XR:data.xR
            })
        })
    }
    cal(x){
        var result = math.evaluate(this.state.Function, { x: x })
        return result;
    };
    False_pst(){
        var cal = this.cal;
        var xl = this.state.XL
        var xr = this.state.XR
        var iter = 0;
        var Xn;
        var Xno;
        var data = []
        data['iter'] = []
        data['Xn'] = []
        data['Xno'] = []
        data['xr'] = []
        data['xl'] = []
        data['error'] = []

        console.log("XL: ",xl," XR : ",xr)
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
            var error = Math.abs((Xn - Xno) / Xn)

            data['iter'][iter] = iter
            data['Xnew'][Xn] = Xn
            data['Xnold'][Xno] = Xno
            data['xr'][xr] = xr
            data['xl'][xl] = xl
            data['error'][error] = error

            if (cal(Xn) * cal(xr) > 0) {
                xr = Xn
            }
            if (cal(Xn) * cal(xr) < 0) {
                xl = Xn
            }
            if(error < 0.000001){
                console.log(Xn," iter: ",iter)
                this.setState({ans:Xn})
                break
            }
            this.forceUpdate()
        }
    };

    render() {
        return(
            <div>
                {this.state.Text}
                <Button variant="contained" onClick={this.False_pst}>Submit</Button>
                <Button variant="inherit"  onClick={() => {console.info(" ",this.state.Text)}}>console.log</Button>
            </div>
        )
    }
}