import React, { Component } from "react";
import "antd/dist/antd.css";
import { Card, Input, Table } from "antd";
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
const AlgebraLatex = require("algebra-latex");
const math = require("mathjs");



var dataInTable = [];
var columns2 = [
  {
    title: "Ans",
    dataIndex: "Ans",
    key: "Ans",
  },
];

var columns1 = [
  {
    title: "No.",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "X",
    dataIndex: "x",
    key: "x",
  },
  {
    title: "Y",
    dataIndex: "y",
    key: "y",
  },
];
var x = [],
  y = [],
  tableTag = [],
  interpolatePoint = [],
  tempTag = [],
  fx;

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.bi = this.bi.bind(this);
    this.Ex = this.Ex.bind(this);
    this.state = {
      nPoints: null,
      ans: [],
      X: null,
      interpolatePoint: null,
      showTableInput: false,
      showTableInpu2: false,
    };
    this.elt = {};
    this.calculator = {};
  }
  //API
  async Ex() {
    console.log(this.props.Token)
    if(this.props.Token !== ""){
      axios.get(`http://localhost:5000/api/nd`,{
        headers:{
          Authorization: 'Bearer ' + this.props.Token
        }
      })
      .then(res => {
        const data = res.data;
        console.log(data)
        this.setState({ 
          nPoints: data.col,
          X: data.Xi,
          interpolatePoint: data.i,
        });
        console.log("nPoints", this.state.nPoints);
        this.createTableInput(parseInt(this.state.nPoints));

        for (var i = 0; i < this.state.nPoints; i++) {
          document.getElementById("x" + (i + 1)).value = data.X[i];
          document.getElementById("y" + (i + 1)).value = data.Y[i];
        }
    
        this.createInterpolatePointInput();
        for (var i = 0; i < this.state.interpolatePoint; i++) {
          document.getElementById("p" + (i + 1)).value = data.p[i];
        }
        this.forceUpdate();
        
      })
      .catch(err => {
        console.error(err)
      })
    }
  }

  componentDidMount() {
    //ทำอัตโนมัติหลังจาก render เสร็จ
  }
  componentDidUpdate() {}

  initialValue() {
    x = [];
    y = [];
    for (var i = 1; i <= this.state.nPoints; i++) {
      x[i] = parseFloat(document.getElementById("x" + i).value);
      y[i] = parseFloat(document.getElementById("y" + i).value);
    }
    for (i = 1; i <= this.state.interpolatePoint; i++) {
      interpolatePoint[i] = parseInt(document.getElementById("p" + i).value);
    }
    console.log("initialValue");
  }

  L(X, index, n) {
    var numerate = 1 /*ตัวเศษ*/,
      denominate = 1; /*ตัวส่วน*/
    for (var i = 1; i <= n; i++) {
      if (i !== index) {
        numerate *= x[i] - X;
        denominate *= x[i] - x[index];
      }
    }
    console.log(numerate / denominate);
    return parseFloat(numerate / denominate);
  }

  lagrange(n, X) {
    fx = 0;
    this.initialValue();
    for (var i = 1; i <= n; i++) {
      fx += this.L(X, i, n) * y[i];
    }
    this.setState({
      showOutputCard: true,
    });
  }

  bi() {
    this.lagrange(
      parseInt(this.state.interpolatePoint),
      parseFloat(this.state.X)
    );
    dataInTable = [];
    dataInTable.push({
      Ans: fx,
    });

    console.log(fx);
    console.log("end");
  }

  createInterpolatePointInput() {
    tempTag = [];
    for (var i = 1; i <= this.state.interpolatePoint; i++) {
      tempTag.push(
        <TextField
          style={{
            width: "14%",
            height: "50%",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          label={"p" + i}
          id={"p" + i}
          key={"p" + i}
          placeholder={"p" + i}
        />
      );
    }
    this.setState({
      showTableInput2: true,
    });
  }

  createTableInput(n) {
    x = [];
    y = [];
    tableTag = [];
    for (var i = 1; i <= n; i++) {
      x.push(
        <TextField

          style={{
            width: "100%",
            height: "50%",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          label={"x" + i}
          id={"x" + i}
          key={"x" + i}
          placeholder={"x" + i}
        />
      );
      y.push(
        <TextField
          style={{
            width: "100%",
            height: "50%",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          label={"y"+i}
          id={"y" + i}
          key={"y" + i}
          placeholder={"y" + i}
        />
      );
      tableTag.push({
        no: i,
        x: x[i - 1],
        y: y[i - 1],
      });
    }

    this.setState({
      showTableInput: true,
    });
    console.log(x, y, tableTag);
  }

  render() {
    return (
      <div>
        <h1>Lagrange</h1>
        <div className="row">
          <div className="col">
            <div>
            <Box sx={{ height: 30, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
              <TextField
                label={"Number of points (n)"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={async (e) => {
                  await this.setState({ nPoints: e.target.value });
                  this.createTableInput(parseInt(this.state.nPoints));
                  this.forceUpdate();
                }}
                value={this.state.nPoints}
                name="nPoints"
                placeholder="Number of points (n)"
              />
              <Box sx={{ height: 30, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
              <TextField
                label={"X"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  this.setState({ X: e.target.value });
                  this.forceUpdate();
                }}
                value={this.state.X}
                name="X"
                placeholder="X"
              />
              <Box sx={{ height: 30, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
              <TextField
                label={"Interpolate Point"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={async (e) => {
                  await this.setState({ interpolatePoint: e.target.value });
                  this.createInterpolatePointInput();
                  this.forceUpdate();
                }}
                value={this.state.interpolatePoint}
                name="interpolatePoint"
                placeholder="interpolatePoint"
              />
              <br></br>
              <br></br>
              <Button onClick={this.bi} variant="contained">
                Submit
              </Button>
              <Button
                variant="contained" color="success"
                style={{
                  marginLeft: "20%",
                }}
                onClick={this.Ex}
              >
                Example
              </Button>
            </div>
            <br></br>
          </div>
          <div className="col">
            {this.state.showTableInput && (
              <div>
                <Table
                  columns={columns1}
                  dataSource={tableTag}
                  pagination={false}
                  bordered={true}
                  bodyStyle={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "white",
                    overflowY: "scroll",
                    minWidth: 120,
                    maxHeight: 300,
                  }}
                ></Table>
              </div>
            )}
          </div>
        </div>
        <Box sx={{ height: 30, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
        <Card>
          {this.state.showTableInput2 && (
            <div>
              <h2>
                Interpolate Point{" "}
                {parseInt(this.state.interpolatePoint) === 2
                  ? "(Linear)"
                  : parseInt(this.state.interpolatePoint) === 3
                  ? "(Quadratic)"
                  : "(Polynomial)"}
              </h2>
              {tempTag}
            </div>
          )}
        </Card>
        <Box sx={{ height: 30, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>          
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
            columns={columns2}
            dataSource={dataInTable}
            //pagination={false}
            bordered={true}
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
