import React, { Component } from 'react'
import 'antd/dist/antd.css'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Card,Table } from 'antd';
import { lusolve, format } from 'mathjs';
import Box from '@mui/material/Box';
import { det, add, subtract, multiply, transpose } from 'mathjs'

const AlgebraLatex = require('algebra-latex')
const math = require('mathjs')

var dataInTable = []

var A = [],
    B = [],
    answer = [],
    matrixA = [],
    matrixB = [],
    matrixX = [],
    epsilon,
    output,
    count = 1,
    x = []

var columns = [
    {
        title: 'Iteration',
        dataIndex: 'iteration',
        key: 'iteration',
    },
]

export default class Numer extends Component {
    constructor(props) {
        super(props)
        this.createTable = this.createTable.bind(this)
        this.initMatrix = this.initMatrix.bind(this)
        this.state = { showMatrixForm: false, showOutputCard: false,
            Text:'', A: null,B: null,
            Matrixa:[],
            Matrixb:[],
            Col: null,
            Row: null,
            answer: null,
            showMatrixForm: false,
            showOutputCard: false
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/api/jacobi').then(res=>{
            const data = res.data;
            console.log(data);
            this.setState({
                Text:data.context,
                Col:data.col,
                Row:data.row,
            })
            this.createMatrix()
            for (var i = 0; i < this.state.Row; i++) {
                for (var j = 0; j < this.state.Col; j++) {
                    document.getElementById('a' + (i + 1) + '' + (j + 1)).value =
                        data.A[i][j]
                    document.getElementById('b' + (i + 1)).value =
                        data.B[i][0]
                    document.getElementById('x' + (i + 1)).value = data.X[i]
                }
            }
            this.initialSchema(this.state.Row)
        
        })
    };
    createMatrix() {
        let row = this.state.Row
        let column = this.state.Col
        matrixA = []
        matrixB = []
        matrixX = []
        console.log(row + ' ' + column)
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(
                    <TextField
                        type="number"
                        label={"a" + i + "" + j}
                        id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={"a" + i + "" + j}
                     />
                )
            }
            matrixA.push(<Box sx={{ height: 15, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>)
            matrixB.push(
                <TextField
                    type="number"
                    label={"b" + i + "" + j}
                    id={"b" + i} key={"b" + i} placeholder={"b" + i}
                />
            )
            matrixB.push(<Box sx={{ height: 15, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>)
            matrixX.push(
                <TextField
                    type="number"
                    label={"x" + i + "" + j}
                    id={"x" + i} key={"x" + i} placeholder={"x" + i}
                />
            )
        }
        this.setState({ showMatrixForm: true })
        console.log('matrixX')
        console.log(matrixX)
    }
    cal() {
        // var n = this.state.Dimension;
        this.initMatrix()
        if (!this.positive_definite(1)) {
            output = "This matrix doesn't positive definite"
            this.setState({
                showOutputCard: true,
            })
            return false
        }
        //find {R0}
        var R = subtract(multiply(A, x), B)
        console.log(R)
        //find D0
        var D = multiply(R, -1)
        console.log(D)
        do {
            //find λ
            var λ =
                multiply(multiply(transpose(D), R), -1) /
                multiply(multiply(transpose(D), A), D)
            console.log(λ)
            /*------------------------------------------------------------------*/

            //find new {X}
            x = add(x, multiply(λ, D))
            console.log(x)
            //find new {R}
            R = subtract(multiply(A, x), B)
            console.log(R)
            //find epsilon
            epsilon = Math.sqrt(multiply(transpose(R), R)).toFixed(8)
            this.appendTable(
                λ,
                JSON.stringify(x).split(',').join(',\n'),
                epsilon
            )
            console.log(epsilon)
            var α =
                multiply(multiply(transpose(R), A), D) /
                multiply(transpose(D), multiply(A, D)).toFixed(8)
            console.log(α)
            D = add(multiply(R, -1), multiply(α, D))
            console.log(D)
        } while (epsilon > 0.000001)
        output = x
        this.setState({
            showOutputCard: true,
        })
        this.forceUpdate()
    }
    positive_definite(dimention) {
        console.log('A', dimention)
        console.log(A)
        var tempMatrix = []
        for (var i = 0; i < dimention; i++) {
            tempMatrix[i] = []
            for (var j = 0; j < dimention; j++) {
                tempMatrix[i][j] = A[i][j]
            }
        }
        if (det(tempMatrix) <= 0) {
            return false
        }
        if (dimention !== this.state.Dimension - 1) {
            return this.positive_definite(++dimention)
        }
        return true
    }
    initMatrix() {
        for (var i = 0; i < this.state.Dimension; i++) {
            A[i] = []
            for (var j = 0; j < this.state.Dimension; j++) {
                A[i][j] = parseFloat(
                    document.getElementById('a' + (i + 1) + '' + (j + 1)).value
                )
            }
            B.push(parseFloat(document.getElementById('b' + (i + 1)).value))
            x.push(parseFloat(document.getElementById('x' + (i + 1)).value))
        }
        console.log('initMatrix')
        console.log(x)
    }
    appendTable(lambda, x, error) {
        dataInTable.push({
            iteration: count++,
            lambda: lambda,
            X: x,
            error: error,
        })
    }
    createTable(x) {
        dataInTable = []
        for (var i = 0; i < x.length; i++) {
            dataInTable.push({
                iteration: 'X' + i,
                x: x[i],
            })
        }
        this.forceUpdate()
    }
    initialSchema(n) {
        for (var i = 1; i <= n; i++) {
            columns.push({
                title: 'X' + i,
                dataIndex: 'x' + i,
                key: 'x' + i,
            })
        }
        for (i = 1; i <= n; i++) {
            columns.push({
                title: 'Error' + i,
                dataIndex: 'error' + i,
                key: 'error' + i,
            })
        }
        console.log('initialSchema')
        console.log(columns)
    }

    render(){
        return(
            <div>
                <h1>Jacobi Iteration</h1>
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
                            await this.setState({Col: e.target.value,
                            })
                        }}
                        value={this.state.Col}
                         name="Column"
                        placeholder="Dimension"
                        />
                        <Button
                            color="success"
                            variant="contained" onClick={this.createMatrix}>Submit
                        </Button>
                </div>
                <div>
                    <Card>
                        {
                            this.state.showMatrixForm &&
                            <div>
                                <h2>Matrix [A]</h2> <br/>{matrixA}
                                <h2>Vector [B]<br/></h2>{matrixB}<br/>
                                <h2>Input Matrix X</h2>{matrixX}
                            </div>
                        }
                    </Card>
                    <Button
                        variant="contained" onClick={this.cal}>Submit
                    </Button>
                    <Card>
                    <Table
                            pagination={{ defaultPageSize: 5 }}
                            columns={columns}
                            // bordered
                            dataSource={dataInTable}
                            bodyStyle={{
                                fontWeight: 'bold',
                                fontSize: '18px',
                                color: 'black',
                            }}
                        ></Table>
                    </Card>
                </div>
            </div>
        )
    }
}