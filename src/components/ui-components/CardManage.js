import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './CardManage.css'
import ReactLoading from 'react-loading';
export default class CardManage extends Component {

    constructor(props) {
        super(props)

    }



    isLetter = (c) => {
        return c.toLowerCase() != c.toUpperCase();
    }

    render() {
        let text = this.props.text

        // shorten the text
        if (this.isLetter(text[0])) {
            if (this.props.text.length > 130) {
                let lastIndexOfSpace = this.props.text.slice(0, 130).lastIndexOf(" ")
                text = this.props.text.slice(0, lastIndexOfSpace)
            }

        }
        else {
            if (this.props.text.length > 90) {
                text = this.props.text.slice(0, 90)
            }
        }


        return (
            <div className="col-md-10">
                <div className="card flex-md-row mb-4 box-shadow h-md-250">
                    <div className="manage-card-textZone card-body d-flex flex-column align-items-start">
                        <strong className={`d-inline-block mb-2 text-${this.props.color}`}>{this.props.category}</strong>
                        <h3 className="mb-0">
                            <p className="text-dark manage-card-title" href="#">{this.props.title}</p>
                        </h3>
                        <div className="mb-1 text-muted">{this.props.date}</div>
                        <p className="card-text mb-2 manage-card-text">{`${text}...`}</p>
                        <Link className="btn btn-primary" to={`/edit/article/${this.props.id}`} role="button">Edit</Link>

                    </div>
                    <div className='manage-card-imageZone'>
                        <img className="card-img-right flex-auto d-none d-md-block manage-card-imageFit" src={this.props.pictureone} width="200px" alt="Card image cap" />
                    </div>
                </div>
            </div>
        );

    }
}