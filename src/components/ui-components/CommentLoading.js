import React, { Component } from 'react';

import ReactLoading from 'react-loading';

export default class CommentLoading extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: this.props.show

        }
    }
    render() {
        if (!this.props.show) {
            return <div>
                <div className="align-items-center text-center row d-flex justify-content-center mt-5">
                    <ReactLoading className="align-items-center" type='spin' color='#BFBFBF' height={100} width={100} />
                </div>
                <div className="align-items-center text-center row d-flex justify-content-center">
                    <p>Loading...</p>
                </div>
            </div>
        }
        return (
            <div>
                <div className="align-items-center text-center row d-flex justify-content-center">
                    <p>There is no more comments</p>
                </div>
            </div>
        );
    }
}
