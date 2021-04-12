import { Button, Card, Alert, Row, Col, Table, Modal, Spinner } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

import API from '../../util/api';
import './statusCard.css';



export default class StatusCard extends React.Component {

    StatusCardStates = {
        LOADING: "loading",
        TRUE: "true",
        FALSE: "false"
    }

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.state = {
            userHome: this.StatusCardStates.LOADING,
            mask: this.StatusCardStates.LOADING,
            door: this.StatusCardStates.LOADING,
            uvc: this.StatusCardStates.LOADING
        };
    }

    getStatuses() {
        fetch("/userHome/latest", { method: "GET" })
            .then(res => res.json())
            .then(res => {
                this.setState(prev => ({ ...prev, userHome: res.user_status[0]}))
            });
        fetch("/state/mask/latest", { method: "GET" })
            .then(res => res.json())
            .then(res => {

                console.log(res.state)
                this.setState(prev => ({ ...prev, mask: res[0].state }));
            });

        fetch("/state/door/latest", { method: "GET" })
            .then(res => res.json())
            .then(res => {
                this.setState(prev => ({ ...prev, door: res[0].state }));
            });

        fetch("/state/uvc/latest", { method: "GET" })
            .then(res => res.json())
            .then(res => {
                this.setState(prev => ({ ...prev, uvc: res[0]?.state || "off" }));
            });

    }

    componentDidMount() {
        this.interval = setInterval(() => this.getStatuses(), 10000);
        this.getStatuses();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    get_state_badge = (status, message) => {
        let badge;
        switch (status) {
            case true:
                badge = <Alert variant="primary">{message}</Alert>
                break;
            case false:
                badge = <Alert variant="danger">{message}</Alert>
                break;
            case this.StatusCardStates.LOADING:
                badge = (<Alert variant="dark">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Alert>)
                break
            default:
                badge = <Alert variant="light">{status}</Alert>

        }
        return badge;
    }
    render() {
        return (<Card>
            <Card.Title>Status at {new Date().toLocaleTimeString()} (updates every 10s)</Card.Title>
            <Card.Body>
                <Table borderless="true" responsive="md">
                    <tbody>
                        <tr>
                            <td>UVC</td>
                            <td>{this.get_state_badge(this.state.uvc=="on", this.state.uvc)}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Door</td>
                            <td>{this.get_state_badge(this.state.door == "open", this.state.door)}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Mask</td>
                            <td>{this.get_state_badge(this.state.mask == "on", this.state.mask)}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Is User Home</td>
                            <td>{this.get_state_badge(this.state.userHome == "User Home", this.state.userHome)}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>);
    }
}
