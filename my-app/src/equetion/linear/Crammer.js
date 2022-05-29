import React, { Component } from "react";
import "antd/dist/antd.css";
import { Card, Input, Table } from "antd";
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
const AlgebraLatex = require("algebra-latex");
const math = require("mathjs");



var dataInTable = [];
const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration",
  },
  {
    title: "X",
    dataIndex: "x",
    key: "x",
  },
];

var A = [],
  B = [],
  answer = [],
  matrixA = [],
  matrixB = [];

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.bi = this.bi.bind(this);
    this.Ex = this.Ex.bind(this);
    this.createTable = this.createTable.bind(this);
    this.initMatrix = this.initMatrix.bind(this);
    this.state = { Dimension: null, chDi: false };
  }
  //API
  async Ex() {
    console.log(this.props.Token)
    if(this.props.Token !== ""){
      axios.get(`http://localhost:5000/api/cramer`,{
        headers:{
          Authorization: 'Bearer ' + this.props.Token
        }
      })
      .then(res => {
        const data = res.data;
        console.log(data)
        this.setState({ 
          Dimension: data.dimension
        });
        this.createMatrix(this.state.Dimension, this.state.Dimension)
        
        for (var i = 0; i < this.state.Dimension; i++) {
            for (var j = 0; j < this.state.Dimension; j++) {
                document.getElementById('a' + (i + 1) + '' + (j + 1)).value =
                    data.A[i][j]
                document.getElementById('b' + (i + 1)).value =
                    data.B[i][0]
            }
        }
      })
      .catch(err => {
        console.error(err)
      })
    }
  }

  componentDidMount() {
    //ทำอัตโนมัติหลังจาก render เสร็จ
  }

  initMatrix() {
    for (var i = 0; i < this.state.Dimension; i++) {
      A[i] = [];
      for (var j = 0; j < this.state.Dimension; j++) {
        A[i][j] = parseFloat(
          document.getElementById("a" + (i + 1) + "" + (j + 1)).value
        );
      }
      B[i] = [];
      B[i].push(parseFloat(document.getElementById("b" + (i + 1)).value));
    }
    console.log("initMatrix");
  }

  cal() {
    var data = [];
    data["x"] = [];
    console.log(A);
    console.log(B);
    var a = math.matrix(A);
    var b = math.matrix(B);
    for (let i = 0; i < a.size()[0]; i++) {
      data["x"].push(
        math.round(
          math.det(
            math.subset(
              a,
              math.index(math.range(0, a.size()[0]), i),
              math.subset(b, math.index(math.range(0, a.size()[0]), 0))
            )
          )
        ) / math.round(math.det(a))
      );
    }
    this.createTable(data["x"]);
  }

  bi() {
    this.initMatrix();
    this.cal();
    // this.createTable(data["x"]);
    console.log("submit");
  }

  createTable(x) {
    dataInTable = [];
    for (var i = 0; i < x.length; i++) {
      dataInTable.push({
        iteration: "X" + i,
        x: x[i],
      });
    }
    this.forceUpdate();
  }

  createMatrix(row, column) {
    matrixA = [];
    matrixB = [];
    console.log(row + " " + column);
    for (var i = 1; i <= row; i++) {
      for (var j = 1; j <= column; j++) {
        matrixA.push(
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label ={"a" + i + "" + j}
            id={"a" + i + "" + j}
            key={"a" + i + "" + j}
            placeholder={"a" + i + "" + j}
          />
        );
      }
      matrixA.push(<Box sx={{ height: 15, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>);
      matrixB.push(
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label ={"b" + i + "" + j}
          id={"b" + i}
          key={"b" + i}
          placeholder={"b" + i}
        />
      );
      matrixB.push(<Box sx={{ height: 15, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>);
    }
    this.setState({ chDi: true });
    console.log(matrixA);
  }

  render() {
    return (
      <div>
        <h1>Cramer's Rule</h1>
        <div className="row">
          <div className="col">
          <Box sx={{ height: 30, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
            <div>
              <TextField
                label="Dimension"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={async (e) => {
                  await this.setState({ Dimension: e.target.value });
                  this.createMatrix(this.state.Dimension, this.state.Dimension);
                  this.forceUpdate();
                  //   console.log(this.state.Dimension);
                }}
                value={this.state.Dimension}
                name="Dimension"
                placeholder="Dimension"
              />
              <br></br>
              <br></br>
              <Button onClick={this.bi} variant="contained">
                Submit
              </Button>
              <Button
                style={{
                  marginLeft: "20%",
                }}
                variant="contained" color="success"
                onClick={this.Ex}
                type="primary"
              >
                Example
              </Button>
            </div>
            <br></br>
          </div>
          <Card>
            <div className="col">
              {this.state.chDi && (
                <div>
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
          </Card>
        </div>
        <br></br>
        <br></br>
        <Card>
          <Table
            pagination={{ defaultPageSize: 5 }}
            columns={columns}
            dataSource={dataInTable}
            bodyStyle={{
              fontWeight: "bold",
              fontSize: "18px",
              color: "black",
            }}
          ></Table>
        </Card>
      </div>
    );
  }
}
