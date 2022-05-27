import React, {Component} from 'react'
import axios from 'axios';
import { Card,Table } from 'antd';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
var columns1 = [
    {
        title: 'No.',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: 'X',
        dataIndex: 'x',
        key: 'x',
    },
    {
        title: 'Y',
        dataIndex: 'y',
        key: 'y',
    },
]
var x = [],
    y = [],
    tableTag = [],
    interpolatePoint = [],
    tempTag = [],
    fx
export default class Numer extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            nPoint: null,
            ans:[],
            X: null,
            interpolatePoint: null,
            showTableInput: false,
            showTableInput2: false,
        }
      };
    componentDidMount() {
        console.log(this.props.Token)
        if(this.props.Token !== ""){
          axios.get(`http://localhost:5000/api/newton`,{
            headers:{
              Authorization: 'Bearer ' + this.props.Token
            }
          })
          .then(res => {
            const data = res.data;
            console.log(data)
            this.setState({ 
                nPoints:data.n,
                X:data.x,
                interpolatePoint:data.interpo,
            });
          })
          .catch(err => {
            console.error(err)
          })
          this.createTableInput(this.state.nPoints)
        }
    };
    createInterpolatePointInput() {
        tempTag = []
        for (var i = 1; i <= this.state.interpolatePoint; i++) {
            tempTag.push(
                <TextField
                    style={{
                        width: '14%',
                        height: '50%',
                        backgroundColor: 'black',
                        marginInlineEnd: '5%',
                        marginBlockEnd: '5%',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: 'bold',
                    }}
                    id={'p' + i}
                    key={'p' + i}
                    placeholder={'p' + i}
                />
            )
        }
        this.setState({
            showTableInput2: true,
        })
    }
    createTableInput(n) {
        x = []
        y = []
        tableTag = []
        for (var i = 1; i <= n; i++) {
            x.push(
                <TextField
                    label={'x' + i}
                    id={'x' + i}
                    key={'x' + i}
                    placeholder={'x' + i}
                />
            )
            y.push(
                <TextField
                    label={'y' + i}
                    id={'y' + i}
                    key={'y' + i}
                    placeholder={'y' + i}
                />
            )
            tableTag.push({
                no: i,
                x: x[i - 1],
                y: y[i - 1],
            })
        }

        this.setState({
            showTableInput: true,
        })
        console.log(x, y, tableTag)
    };
    render(){
        return(
            <div>
                <h1>Newton Divided Difference</h1>
                <Box sx={{ height: 30, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
                <h1>Number of points (n)</h1>
                <TextField
                    label="n"
                    InputLabelProps={{
                        shrink: true,
                      }}
                    onChange={async (e) => {
                        await this.setState({
                            nPoints: e.target.value,
                        })
                        this.createTableInput(
                            parseInt(this.state.nPoints)
                        )
                        this.forceUpdate()
                    }}
                    value={this.state.nPoints}
                    name="nPoints"
                    placeholder="Number of points (n)"
                />
                <Box sx={{ height: 15, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
                <h1>X</h1>
                <Box sx={{ height: 15, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
                <TextField 
                    label="X" 
                    InputLabelProps={{
                        shrink: true,
                      }}
                    onChange={(ip) => {this.setState({X:ip.target.value})}}
                    value={this.state.X}
                    name="X"
                />
                <Box sx={{ height: 15, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
                <h1>InterpolatePoint</h1>
                <Box sx={{ height: 15, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
                <TextField 
                    label="interpolatePoint" 
                    InputLabelProps={{
                        shrink: true,
                      }}
                    onChange={(ip) => {this.setState({interpolatePoint:ip.target.value})}}
                    value={this.state.interpolatePoint}
                    name="interpolatePoint"
                />

                <Box sx={{ height: 50, backgroundColor: (theme) => theme.palette.mode === 'light' ? '': 'rgb(255 132 132 / 25%)',}}/>
                <div>
                    <Card>
                    {this.state.showTableInput && (
                            <div>
                                <Table
                                    columns={columns1}
                                    dataSource={tableTag}
                                    pagination={false}
                                    bordered={true}
                                    bodyStyle={{
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        color: 'white',
                                        overflowY: 'scroll',
                                        minWidth: 120,
                                        maxHeight: 300,
                                    }}
                                ></Table>
                            </div>
                        )}
                        {this.state.showTableInput2 && (
                    <div>
                        <h2>
                            interpolatePoint{' '}
                            {parseInt(this.state.interpolatePoint) === 2
                                ? '(Linear)'
                                : parseInt(this.state.interpolatePoint) === 3
                                ? '(Quadratic)'
                                : '(Polynomial)'}
                        </h2>
                        {tempTag}
                    </div>
                )}
                    </Card>
                </div>
            </div>
            
        )
    }
}