import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from "./views/home/home";
import Header from "./components/header/header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Metrics from "./views/metrics/metrics";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const routing = (
    <React.StrictMode>
        <Header />
        <Router>
            <div className="content-wrapper">
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/metrics" component={Metrics} />
            </div>
        </Router>
    </React.StrictMode>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
