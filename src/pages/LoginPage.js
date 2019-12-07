import React, { useState, useContext } from 'react';

import { AuthContext } from '../store/Context';

import { Container, Jumbotron, Row, Col, Form, Button } from 'react-bootstrap';

export default () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setAuth] = useContext(AuthContext);

    function signIn() {
        if (email === 'admin@admin.com' && password === 'adminadmin') {
            setAuth(true);
        }
    }

    return (
        <Container>
            <Row>
                <Col md={{span:'6', offset:'3'}}>
                    <Jumbotron>
                        <Col>
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="text" />
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setPassword(e.target.value)}  type="password" />
                            <Button className="mt-5" variant="primary" block onClick={signIn}>Login</Button>
                        </Col>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}