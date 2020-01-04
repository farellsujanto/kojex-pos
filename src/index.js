import React from 'react';
import { render } from 'react-dom';

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/argon-dashboard-react.css";
import "./assets/fonts/Rubik/Rubik-Black.ttf";

import App from './App';
import Store from './store/Store'

const Index = () => (
    <Store>
        <App />
    </Store>
);

render(<Index />, document.getElementById('root'));