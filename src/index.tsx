import React from 'react';
import ReactDOM from 'react-dom';
import './index/index.css';
import App from './index/app';
import { BrowserRouter as Router } from "react-router-dom";
import './index/serviceWorker';

const basename = '/shamir-secret-splitter'

ReactDOM.render(<Router basename={basename}><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
