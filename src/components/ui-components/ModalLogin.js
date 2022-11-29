import React, { Component } from 'react';
export default class ModalLogin extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div className="modal fade" id={this.props.idv} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">{this.props.btn}</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}