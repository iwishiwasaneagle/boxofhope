import { Button, Card, Alert, Row, Col, Table, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';

import API from '../../util/api';
import './statsCard.css';

export default class StatsCard extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.state = {
            time: Date.now()
        };
    }

    tick() {
        this.setState(state => ({
            time: Date.now()
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 10000);
        this.tick();

        const data = [];
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            data: {
                datasets: [{ label: "Masks data", data: data, lineTension:0, borderColor:"red", fill:false}, { label: "Door data", data: data, lineTension:0, borderColor:"blue", fill:false}, { label: "User Home data", data: data, lineTension:0, borderColor:"green", fill:false}]
            },
            options: {
                elements: {
                    point:{
                        radius: 0
                    }
                },
                scales: {
                    yAxes:[{
                        ticks:{
                            callback: (value, index, values) => value == 1 ? "True" : (value == 0 ? "False" : "")
                        }
                    }],
                    xAxes: [{
                        type: 'time',
                        time: {
                            parser: 'YYYY-MM-DDTHH:mm:ss.SSSZ', //2021-03-30T10:41:47.756Z
                            tooltipFormat: 'll HH:mm',
                            unit: 'hour'
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10
                        }
                    }]
                }
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate() {
        
        fetch("/userHome/since/5", { method: "GET" })
            .then(res => res.json())
            .then(res => {
                const data = res.map(state=>({x:state.createdAt, y:state.user_status[0]==="User Home"}));
                this.myChart.data.datasets.forEach((dataset) => {
                    if(dataset.label=="User Home data"){
                        dataset.data = data;
                    }
                });
                this.myChart.update();
            });
        fetch("/state/mask/since/5", { method: "GET" })
            .then(res => res.json())
            .then(res => {
                const data = res.map(state=>({x:state.createdAt, y:state.state==="on"}));
                this.myChart.data.datasets.forEach((dataset) => {
                    if(dataset.label=="Masks data"){
                        dataset.data = data;
                    }
                });
                this.myChart.update();
            });
        
        fetch("/state/door/since/5", { method: "GET" })
            .then(res => res.json())
            .then(res => {
                const data = res.map(state=>({x:state.createdAt, y:state.state==="close"}));
                this.myChart.data.datasets.forEach((dataset) => {
                    if(dataset.label=="Door data"){
                        dataset.data = data;
                    }
                });
                this.myChart.update();
            });

    }

    render() {
        return (<Card>
            <Card.Title>Stats</Card.Title>
            <Card.Body>
                <Card.Text>
                <div className="wrapper">
                    <canvas id="statsChart" ref={this.chartRef}></canvas>
                </div>
                </Card.Text>
            </Card.Body>
        </Card>);
    }
}
