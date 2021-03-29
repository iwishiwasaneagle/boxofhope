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
        this.interval = setInterval(() => this.tick(), 1000);
        this.tick();

        const data = [];
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            data: {
                datasets: [{ label: "BTC (USD)", data: data }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'second'
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
        fetch("https://api.blockchain.com/v3/exchange/tickers/BTC-USD", { method: "GET" })
            .then(res => res.json())
            .then(res => {
                const data = { x: Date.now(), y: res.last_trade_price || 0 }
                this.myChart.data.datasets.forEach((dataset) => {
                    dataset.data.push(data);
                    if (dataset.data.length > 10 * 60) {
                        dataset.data.shift();
                    }
                });
                this.myChart.update();
            });

    }

    render() {
        return (<Card>
            <Card.Title>Stats</Card.Title>
            <Card.Body>
                <canvas id="statsChart" ref={this.chartRef} width="800" height="400"></canvas>
            </Card.Body>
        </Card>);
    }
}