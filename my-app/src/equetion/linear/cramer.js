import React, {Component} from 'react'
import axios from 'axios';
import { Card } from 'antd';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const math = require('mathjs');
var dataset = [];
var A = [],
    B = [],
    answer = [],
    matrixA = [],
    matrixB = []
export default class Numer extends Component {
    constructor(props){
        super(props)
        this.creatmatrix = this.creatmatrix.bind(this)
        this.bi = this.bi.bind(this)
        this.initMatrix = this.initMatrix.bind(this)
        this.state = {
            Text:'', A: null,B: null ,
            Matrixa:[],
            Matrixb:[],
            Col: null,
            Row: null,
            answer: null,
            showMatrixForm: false
        }
    };

    componentDidMount(){
        axios.get('http://localhost:5000/api/cramer').then(res=>{
            const data = res.data;
            console.log(data);
            this.setState({
                Text:data.context,
                A:data.A,
                Col:data.col,
                Row:data.row
            })
            this.creatmatrix()
            for (var i = 0; i < this.state.Row; i++) {
            for (var j = 0; j < this.state.Dimension; j++) {
                document.getElementById('a' + (i + 1) + '' + (j + 1)).value =
                    data.A[i][j]
                document.getElementById('b' + (i + 1)).value =
                    data.B[i][0]
            }
        }
        
        })
    };
    
    creatmatrix(){
        let row = this.state.Row
        let col = this.state.Col
        matrixA = []
        matrixB = []
        for(var i = 1 ; i <= row; i++){
            for(var j = 1 ; j <= col ; j++){
                matrixA.push(
                    <TextField
                        type="number"
                        label={"a" + i + "" + j}
                        id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={"a" + i + "" + j}
                     />
                     
                )
            }
            matrixA.push(<Box sx={{ height: 15, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>)
            matrixB.push(<TextField
                type="number"
                label={"b" + i + "" + j}
                id={"b" + i} key={"b" + i} placeholder={"b" + i}/>)
                matrixB.push(<Box sx={{ height: 15, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>)
        }
        this.setState({showMatrixForm:true})
    }
    initMatrix() {
        for (var i = 0; i < this.state.Row; i++) {
            A[i] = []
            for (var j = 0; j < this.state.Col; j++) {
                A[i][j] = parseFloat(
                    document.getElementById('a' + (i + 1) + '' + (j + 1)).value
                )
            }
            B[i] = []
            B[i].push(parseFloat(document.getElementById('b' + (i + 1)).value))
        }
        console.log('initMatrix')
    }
    cal() {
        var data = []
        data['x'] = []
        console.log(A)
        console.log(B)
        var a = math.matrix(A)
        var b = math.matrix(B)
        for (let i = 0; i < a.size()[0]; i++) {
            data['x'].push(
                math.round(
                    math.det(
                        math.subset(
                            a,
                            math.index(math.range(0, a.size()[0]), i),
                            math.subset(
                                b,
                                math.index(math.range(0, a.size()[0]), 0)
                            )
                        )
                    )
                ) / math.round(math.det(a))
            )
        }
    }
    bi() {
        this.initMatrix()
        this.cal()
        // this.createTable(data["x"]);
        console.log('submit')
    }

    render() {
        return(
            <div>
                <div>
                    <div>
                            <TextField
                                id="outlined-number"
                                label="ROWS"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                onChange={async (e) => {
                                    await this.setState({
                                        Row: e.target.value,
                                    })
                                }}
                                value={this.state.Row}
                                name="Row"
                                placeholder="Row"
                            />
                            <TextField
                                id="outlined-number"
                                label="Column"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                onChange={async (e) => {
                                    await this.setState({
                                        Col: e.target.value,
                                    })
                                }}
                                value={this.state.Col}
                                name="Column"
                                placeholder="Dimension"
                            />
                        <Button
                             variant="contained" onClick={this.creatmatrix}>Submit
                        </Button>
                    </div>
                <br/>
                <Button variant="inherit"  onClick={() => {console.info({dataset}," col: ",this.state.Col," row:  ",this.state.Row,this.state.Matrixa)}}>console.log</Button>
                <br/>
                <Card className="col">
                        {
                            this.state.showMatrixForm &&
                            <div>
                                <h2>Matrix [A]</h2> <br/>{matrixA}
                                <h2>Vector [B]<br/></h2>{matrixB}<br/>
                            </div>

                        }
                        
                </Card>
                <br/>
                <Button
                    variant="contained" onClick={this.bi}>Submit
                </Button>
                </div>
            </div>
            
        )
    }
}