import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './CardWork.css'
export default class CardWork extends Component {

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
            } else {
                text = this.props.text
            }

        }
        else {
            if (this.props.text.length > 90) {
                text = this.props.text.slice(0, 90)
            } else {
                text = this.props.text
            }
        }
        return (
            <div className="col-md-10">
                <div className="card flex-md-row mb-4 box-shadow h-md-250">
                    <div className="work-card-textZone card-body d-flex flex-column align-items-start">
                        <div class="d-flex flex-row">
                            <strong className={`d-inline-block mb-2 text-${this.props.color}`}>{this.props.category}</strong>
                            <span className="dot mx-2 my-2"></span><span className=" mr-2">{this.props.date}</span>
                        </div>
                        <h3 className="mb-0">
                            <p className="text-dark work-card-title" href="#">{this.props.title}</p>
                        </h3>
                        <p className="card-text mb-2 work-card-text">{`${text}...`}</p>
                        <Link to={`/work/${this.props.id}`}>Read more...</Link>

                    </div>
                    <div className='work-card-imageZone'>
                        <img className="card-img-right flex-auto d-none d-md-block work-card-imageFit" src={this.props.pictureone} width="200px" alt="Card image cap" />
                    </div>
                </div>
            </div>
        );
    }
}