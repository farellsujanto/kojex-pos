import React from 'react';

import { Navbar, Button, Nav } from 'react-bootstrap';

import { firebaseApp } from '../utils/Firebase';

export default () => {

    function signOut() {
        firebaseApp.auth().signOut();
    }

    function getUsername() {
        return firebaseApp.auth().currentUser.email;
    }

    return (
        <Navbar variant="light" bg="light">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
                <Navbar.Text>
                    {getUsername()} <Button onClick={signOut} variant="link"> Keluar</Button>
                </Navbar.Text>
            </Nav>
        </Navbar>
    );
}