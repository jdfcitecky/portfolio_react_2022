import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Sidebar.css'
import { FilePlus, MessageCircle, File, BarChart, Archive } from 'react-feather';
export default class Card extends Component {

    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div className="col-md-2 d-none d-md-block bg-light sidebar">

                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item" key='managepanel'>
                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                <span>Panel</span>
                                <a className="d-flex align-items-center text-muted" href="#">
                                    <span data-feather="plus-circle"></span>
                                </a>
                            </h6>
                        </li>
                        <li className="nav-item" key='panel'>
                            <Link className="nav-link text-left" to="/manage">
                                <BarChart size={24} className="mb-1 feather feather-file-text" />
                                Statistical
                            </Link>
                        </li>
                        <li className="nav-item" key='content'>
                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                <span>Content</span>
                                <a className="d-flex align-items-center text-muted" href="#">
                                    <span data-feather="plus-circle"></span>
                                </a>
                            </h6>
                        </li>
                        <li className="nav-item" key='articles'>
                            <Link className="nav-link text-left" to="/manage/articles">
                                <File size={24} className="mb-1 feather feather-file-text" />
                                Articles
                            </Link>
                        </li>
                        <li className="nav-item text-left" key='comments'>
                            <Link className="nav-link" to="/manage/comments">
                                <MessageCircle size={24} className="mb-1 feather feather-file-text" />
                                Comments
                            </Link>
                        </li>
                        <li className="nav-item" key='create'>
                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                <span>Create</span>
                                <a className="d-flex align-items-center text-muted" href="#">
                                    <span data-feather="plus-circle"></span>
                                </a>
                            </h6>
                        </li>
                        <li className="nav-item" key='article'>

                            <Link className="nav-link text-left" to="/edit/article">
                                <FilePlus size={24} className="mb-1 feather feather-file-text" />
                                Article
                            </Link>
                            <Link className="nav-link text-left" to="/manage/backup">
                                <Archive size={24} className="mb-1 feather feather-file-text" />
                                Backup
                            </Link>

                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}