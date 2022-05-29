import React, { Component } from "react";
import "antd/dist/antd.css";
import { Card, Input, Button, Table } from "antd";
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
    // const url = "https://api.randomuser.me/";
    const url = "http://localhost:8000/Gauss_Jordan";
    // const url = "http://127.0.0.1/Json/item.json";
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    this.setState({
      Dimension: data.Gauss_Jordan.Dimension,
    });
    this.createMatrix(this.state.Dimension, this.state.Dimension);

    for (var i = 0; i < this.state.Dimension; i++) {
      for (var j = 0; j < this.state.Dimension; j++) {
        document.getElementById("a" + (i + 1) + "" + (j + 1)).value =
          data.Gauss_Jordan.A[i][j];
        document.getElementById("b" + (i + 1)).value =
          data.Gauss_Jordan.B[i][0];
      }
    }
  }

  componentDidMount() {
    //ทำอัตโนมัติหลังจาก render เสร็จ
  }

  initMatrix() {
    A = [];
    B = [];
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
    console.log("A", A);
    console.log("B", B);
    this.initMatrix();
    if (A[0][0] === 0) {
      //pivoting
      var tempRow = JSON.parse(JSON.stringify(A[0]));
      var tempColumn = B[0];
      A[0] = A[1];
      A[1] = tempRow;
      B[0] = B[1];
      B[1] = tempColumn;
    }
    //Forward eliminate
    for (var k = 0; k < n; k++) {
      for (var i = k + 1; i < n; i++) {
        var factor = A[i][k] / A[k][k];
        for (var j = k; j < n; j++) {
          A[i][j] = A[i][j] - factor * A[k][j];
        }
        B[i] = B[i] - factor * B[k];
      }
    }
    //Backward Substitution
    for (k = n - 1; k >= 0; k--) {
      for (i = k; i >= 0; i--) {
        if (i === k) {
          //Identity matrix
          factor = 1 / A[i][k];

          for (j = 0; j < n; j++) {
            A[i][j] = A[i][j] * factor;
          }
          B[i] = math.round(B[i] * factor);
        } else {
          factor = A[i][k] / A[k][k];
          for (j = 0; j < n; j++) {
            A[i][j] = A[i][j] - factor * A[k][j];
          }
          B[i] = B[i] - factor * B[k];
        }
      }
    }
    this.createTable(B);
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
          <Input
            style={{
              width: "15%",
              height: "50%",
              backgroundColor: "black",
              marginInlineEnd: "5%",
              marginBlockEnd: "5%",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
            }}
            id={"a" + i + "" + j}
            key={"a" + i + "" + j}
            placeholder={"a" + i + "" + j}
          />
        );
      }
      matrixA.push(<br />);
      matrixB.push(
        <Input
          style={{
            width: "15%",
            height: "50%",
            backgroundColor: "black",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          id={"b" + i}
          key={"b" + i}
          placeholder={"b" + i}
        />
      );
      matrixB.push(<br />);
    }
    this.setState({ chDi: true });
    console.log(matrixA);
  }

  render() {
    return (
      <div>
        <h1>Gauss Jordan</h1>
        <div className="row">
          <div className="col">
            <div>
              <p>Dimension</p>
              <Input
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
              <Button onClick={this.bi} type="primary">
                Submit
              </Button>
              <Button
                style={{
                  marginLeft: "50%",
                  backgroundColor: "#76D7C4",
                  borderColor: "#76D7C4",
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
                  textAlign: "right",
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
        <br></br>
        <br></br>
        {/* {this.state.ans.map((data, i) => {
          return (
            <p>
              Iteration No.{i + 1} Root of equation is {data}
            </p>
          );
        })} */}
        <Card
          title={"Output"}
          bordered={true}
          style={{
            width: "100%",
            background: "#2196f3",
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
