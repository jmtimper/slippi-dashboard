import React, {useState} from "react";
import Header from "./components/header/header";
import Home from "./views/home/home";
import {Route, BrowserRouter as Router} from "react-router-dom";
import Metrics from "./views/metrics/metrics";

const App = () => {

    return (
        <div>
            <Header/>
            <Router>
                <div className="content-wrapper">
                    <Route exact path="/" render={() => (<Home/>)}/>
                    <Route path="/home" render={() => (<Home/>)}/>
                    <Route path="/metrics" component={Metrics}/>
                </div>
            </Router>
        </div>
    )
}

export default App