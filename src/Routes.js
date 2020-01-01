import React, { useContext } from 'react';

import { PathContext, AuthContext } from './store/Context';

import Drawer from './components/Drawer';
import NavbarComponent from './components/NavbarComponent';

import { Row, Col, Jumbotron } from 'react-bootstrap';

import LoginPage from './pages/LoginPage';

import HomePage from './pages/HomePage';
import CashierPage from './pages/CashierPage';
import NotFoundPage from './pages/404Page';

import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

function preparePage(children) {
	return (
		<>
			<AdminLayout>
				{children}
			</AdminLayout>
		</>

	);
}

function prepareAuthPage(children) {
	return (
		<AuthLayout>
			{children}
		</AuthLayout>
	);
}

function getLoggedInPath(path) {
	switch (path) {
		case '/':
			return <CashierPage />
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

	if (!auth) { return prepareAuthPage(getNotLoggedInPath(path)); }

	return preparePage(getLoggedInPath(path));
}