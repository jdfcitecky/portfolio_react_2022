import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
export default class Jumbotron extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
                <div className="col-md-6 px-0">
                    <h1 className="display-3 font-italic">Hi I'm Chuan Hsin Cho</h1>
                    <p className="lead my-3">UC Davis CS Master, 2019 Red Dot Design Award winner,<br />3 years experience full stack developer.<br />Creator with Design Thinking and Technology.</p>
                    <p className="lead mb-0"><Link className="text-white font-weight-bold" to="/timeline">More...</Link></p>
                </div>
            </div >
        );
    }
}