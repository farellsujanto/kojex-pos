import React, { useContext } from 'react';

import { PathContext, AuthContext } from './store/Context';

import Drawer from './components/Drawer';
import NavbarComponent from './components/NavbarComponent';

import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

import LoginPage from './pages/LoginPage';

import HomePage from './pages/HomePage';
import CashierPage from './pages/CashierPage';
import NotFoundPage from './pages/404Page';


function preparePage(children) {
	return (
		<>
			<Row>
				<Col sm={3}>
					<Drawer />
				</Col>
				<Col sm={9}>
					<Col sm={12}>
						<NavbarComponent />
						<br />
					</Col>
					<Col sm={12}>
						<Jumbotron>
							{children}
						</Jumbotron>
					</Col>
				</Col>
			</Row>
		</>
	);
}

function getLoggedInPath(path) {
	switch (path) {
		case '/':
			return <HomePage />
		case '/cashier':
			return <CashierPage />
		default:
			return <NotFoundPage />;
	}
}

function getNotLoggedInPath(path) {
	switch (path) {
		case '/':
			return <LoginPage />
		default:
			return <LoginPage />;
	}
}

export default function Routes() {
	const [path] = useContext(PathContext);
	const [auth] = useContext(AuthContext);

	if (!auth) { return getNotLoggedInPath(path); }

	return preparePage(getLoggedInPath(path));
}