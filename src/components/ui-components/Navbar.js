import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    <Link className="p-2 text-muted" to="/" onClick={() => { window.localStorage.setItem("searchPage", String(1)) }}>Home</Link>
                    <Link className="p-2 text-muted" to="/timeline" onClick={() => { window.localStorage.setItem("searchPage", String(1)) }}>Time line</Link>
                    <Link className="p-2 text-muted" to="/search/frontend" onClick={() => { window.localStorage.setItem("searchPage", String(1)) }}>Forntend</Link>
                    <Link className="p-2 text-muted" to="/search/backend" onClick={() => { window.localStorage.setItem("searchPage", String(1)) }}>Backend</Link>
                    <Link className="p-2 text-muted" to="/search/m.s.%20project" onClick={() => { window.localStorage.setItem("searchPage", String(1)) }}>M.S.Project</Link>
                    <Link className="p-2 text-muted" to="/search/design" onClick={() => { window.localStorage.setItem("searchPage", String(1)) }}>Design</Link>

                </nav>
            </div>
        );
    }
}