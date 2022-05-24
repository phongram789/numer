import React, {Component} from 'react'
import axios from 'axios';
import { Card } from 'antd';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {Table } from 'antd'
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
    constructor(props){
        super(props)
        this.bi = this.bi.bind(this)
        this.createTable = this.createTable.bind(this)
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
            this.createMatrix(this.state.Row, this.state.Col)

            for (var i = 0; i < this.state.Row; i++) {
                for (var j = 0; j < this.state.Col; j++) {
                    document.getElementById('a' + (i + 1) + '' + (j + 1)).value =
                        data.A[i][j]
                    document.getElementById('b' + (i + 1)).value =
                        data.B[0]
                    document.getElementById('x' + (i + 1)).value =
                        data.X[i]
                }
            }
            this.initialSchema(this.state.Row)

        })
    };
    createMatrix(row, column) {
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
                id={"b" + i} key={"b" + i} placeholder={"b" + i}/>
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
    cal() {
        var n = this.state.Dimension
        this.initMatrix()
        var xold
        epsilon = new Array(n)
        do {
            xold = JSON.parse(JSON.stringify(x))
            for (var i = 0; i < n; i++) {
                var sum = 0
                for (var j = 0; j < n; j++) {
                    if (i !== j) {
                        //else i == j That is a divide number
                        sum = sum + A[i][j] * x[j]
                    }
                }
                x[i] = (B[i] - sum) / A[i][i] //update x[i]
            }
            console.log('count', count)
            if (count >= 1000) {
                break
            }
        } while (this.error(x, xold)) //if true , continue next iteration
        this.setState({
            showOutputCard: true,
        })
    }

    error(xnew, xold) {
        for (var i = 0; i < xnew.length; i++) {
            epsilon[i] = Math.abs((xnew[i] - xold[i]) / xnew[i])
            if (x[i] == null) {
                return true
            }
        }

        this.appendTable(x, epsilon)
        for (i = 0; i < epsilon.length; i++) {
            if (epsilon[i] > 0.000001) {
                return true
            }
        }
        return false
    }

    appendTable(x, error) {
        console.log('appendTable')
        console.log(x, error)
        var tag = ''
        tag += '{"iteration": ' + count++ + ','
        for (var i = 0; i < x.length; i++) {
            tag +=
                '"x' +
                (i + 1) +
                '": ' +
                x[i].toFixed(8) +
                ', "error' +
                (i + 1) +
                '": ' +
                error[i].toFixed(8)
            if (i !== x.length - 1) {
                tag += ','
            }
        }
        tag += '}'
        dataInTable.push(JSON.parse(tag))
        console.log(dataInTable)
        this.forceUpdate()
    }

    bi() {
        this.cal()
        // this.createTable(data["x"]);
        console.log('submit')
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

    render() {
        return(
            
            <div>
                <h1>Gauss Seidel</h1>
                <div className="row">
                    <div className="col">
                        <div>
                            <p>Dimension</p>
                            <TextField
                                onChange={async (e) => {
                                    await this.setState({
                                        Dimension: e.target.value,
                                    })
                                    this.createMatrix(
                                        this.state.Dimension,
                                        this.state.Dimension
                                    )

                                    this.forceUpdate()
                                    //   console.log(this.state.Dimension);
                                }}
                                value={this.state.Dimension}
                                name="Dimension"
                                placeholder="Dimension"
                            />
                            <br></br>
                            <br></br>
                            <Button onClick={this.bi} type="primary">
                                Submit
                            </Button>
                            <Button
                                style={{
                                    marginLeft: '50%',
                                    backgroundColor: '#d580ff',
                                    borderColor: '#76D7C4',
                                }}
                                onClick={this.Ex}
                                type="primary"
                            >
                                Example
                            </Button>
                        </div>
                        <br></br>
                    </div>
                    <div className="col">
                        {this.state.chDi && (
                            <div
                                style={{
                                    textAlign: 'right',
                                }}
                            >
                                <h2>Input Matrix A</h2>
                                {matrixA}
                            </div>
                        )}
                    </div>
                    <div className="col">
                        {this.state.chDi && (
                            <div>
                                <h2>Input Matrix B</h2>
                                {matrixB}
                            </div>
                        )}
                    </div>
                </div>
                {this.state.chDi && (
                    <div>
                        <h2>Input Matrix X</h2>
                        {matrixX}
                    </div>
                )}
                {this.state.showOutputCard && (
                    <Card
                        title={'Output'}
                        bordered={true}
                        style={{
                            width: '100%',
                            background: '#2196f3',
                            color: '#FFFFFFFF',
                        }}
                        id="outputCard"
                    >
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
                )}
            </div>
            
        )
    }
}