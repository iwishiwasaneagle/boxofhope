import { Button, Card, Alert, Row, Col, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import API from '../../util/api';

import './maskCard.css';

function MasksCard() {
    const [masks, setMasks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        API.mask.getAll().then(res => { setMasks(res); setLoading(false) }
        ).catch(err => console.error(err));
    }, [])


    const get_state_badge = (id, status) => {
        console.log(id, status);
        let badge;
        switch (status) {
            case "In Box":
                badge = <Alert variant="primary">In Box</Alert>
                break;
            case "Checked Out":
                badge = <Alert variant="success">Checked Out</Alert>
                break;
            case "Being Cleaned":
                badge = <Alert variant="danger">Being Cleaned</Alert>
                break;

        }
        return badge;
    }



    return (<Card>
                <Card.Title>Masks</Card.Title>
                <Card.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        {masks.map((mask, ind) =>
                            <tbody>
                                <tr>
                                    <td>{ind}</td>
                                    <td>{mask._id}</td>
                                    <td>{get_state_badge(mask._id, mask.status[0])}</td>
                                    <td><Button disabled={loading === mask._id} onClick={
                                        () => {
                                            setLoading(mask._id);
                                            API.mask.delete(mask._id).then(() =>
                                                API.mask.getAll()
                                                    .then(res => { setMasks(res); setLoading("") })
                                                    .catch(err => console.error(err)));
                                        }}>{loading === mask._id ? "Loading..." : "Delete"}</Button>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </Table>
                </Card.Body>
            </Card>);
}

export default MasksCard;