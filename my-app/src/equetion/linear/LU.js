import React, { Component } from "react";
import "antd/dist/antd.css";
import { Card, Input, Table } from "antd";
import { lusolve, format } from "mathjs";
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
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
      axios.get(`http://localhost:5000/api/lu`,{
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
    /*
    // const url = "https://api.randomuser.me/";
    const url = "http://localhost:8000/LU";
    // const url = "http://127.0.0.1/Json/item.json";
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    this.setState({
      Dimension: data.LU.Dimension,
    });
    this.createMatrix(this.state.Dimension, this.state.Dimension);

    for (var i = 0; i < this.state.Dimension; i++) {
      for (var j = 0; j < this.state.Dimension; j++) {
        document.getElementById("a" + (i + 1) + "" + (j + 1)).value =
          data.LU.A[i][j];
        document.getElementById("b" + (i + 1)).value = data.LU.B[i][0];
      }
    }*/
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
      B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
    }
    console.log("initMatrix");
  }

  cal() {
    var n = this.state.Dimension;
    console.log(A);
    console.log(B);
    this.initMatrix();
    var decompose = lusolve(A, B);
    var ans = [];
    for (var i = 0; i < this.state.Dimension; i++) {
      ans.push(math.round(decompose[i]));
    }
    this.createTable(ans);
  }

  bi() {
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
            label={"a" + i + "" + j}
            id={"a" + i + "" + j}
            key={"a" + i + "" + j}
            placeholder={"a" + i + "" + j}
          />
        );
      }
      matrixA.push(<Box sx={{ height: 15, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>);
      matrixB.push(
        <TextField
          label={"b" + i}
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
        <h1>LU Decomposition</h1>
        <div className="row">
          <div className="col">
            <div>
            <Box sx={{ height: 30, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
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
                onClick={this.Ex}
                variant="contained"
                color="success"
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

        <Card
          title={"Output"}
          bordered={true}
          style={{
            width: "100%",
            color: "#FFFFFFFF",
          }}
          id="outputCard"
        >
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
