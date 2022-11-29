import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Card.css'
export default class Card extends Component {

    constructor(props) {
        super(props)

    }
    render() {
        return (

            <div className="col-md-6 fadeIn">
                <div className="card flex-md-row mb-4 box-shadow h-md-250">
                    <div className="home-card-textZone card-body d-flex flex-column align-items-start">
                        <strong className={`d-inline-block mb-0 text-${this.props.color}`}>{this.props.category}</strong>
                        <h3 className="mb-0">
                            <p className="text-dark  home-card-title" href="#">{this.props.title}</p>
                        </h3>
                        <div className="mb-1 text-muted">{this.props.date}</div>
                        <p className="card-text mb-2 home-card-text">{this.props.text}</p>
                        <Link to={this.props.link}>{this.props.linkwords}</Link>
                    </div>
                    <div className='work-card-imageZone'>
                        <img className="card-img-right flex-auto d-none d-md-block home-card-imageFit" src={this.props.picture} alt="Card image cap" />
                    </div>

                </div>
            </div>
        );
    }
}