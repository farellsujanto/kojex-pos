import React, { useState, useContext } from 'react';

import { AuthContext, RoleContext } from '../store/Context';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Container
} from "reactstrap";

export default () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setAuth] = useContext(AuthContext);
    const [, setRole] = useContext(RoleContext);

    function signIn() {
        if (password === 'hollywoof') {
            setRole(email);
            setAuth(true);
        }
    }

    return (
        <>

            <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
                    <Col lg="5" md="7">
                        <Card className="bg-secondary shadow border-0">
                            <CardHeader className="bg-transparent pb-5">
                                <div className="text-muted text-center mt-2 mb-3">
                                    <small>Sign in with</small>
                                </div>

                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5">
                                <Form role="form">
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Username" onChange={(e) => setEmail(e.target.value)} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                                        </InputGroup>
                                    </FormGroup>

                                    <div className="text-center">
                                        <Button className="my-4" color="primary" type="button" onClick={signIn}>
                                            Sign in
                                            </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>

        </>
    );
}