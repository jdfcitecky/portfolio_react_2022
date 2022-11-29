import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import "./Comment.css"
import "./CommentManage.css"
export default class CommentManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            deleting: false,
            deleted: false,
            displayNone: false,
            reviewing: false,
            reviewed: false,
            isNew: true,
        }
        this.deleteFromCommentsArrays = this.deleteFromCommentsArrays.bind(this)
        this.updateFromCommentsArray = this.updateFromCommentsArray.bind(this)

    }

    deleteFromCommentsArrays = (id) => {
        this.props.deleteFromCommentsArrays(id)
    }

    updateFromCommentsArray = (id) => {
        this.props.updateFromCommentsArray(id)
    }

    handleSubmit = (evt) => {
        console.log('submit')
        evt.preventDefault()
        this.setState({ reviewing: true, })
        // client side validation
        let errors = []
        if (this.props.jwt == "") {
            errors.push("jwt")
        }
        this.setState({ errors: errors })
        if (errors.length > 0) {
            return false
        }
        // we passed, so post info
        const data = new FormData(evt.target)
        const payload = Object.fromEntries(data.entries())
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        myHeaders.append("Authorization", "Bearer " + this.props.jwt)
        myHeaders.append("token", this.props.jwt)
        payload["id"] = Number(this.props.commentId)
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: myHeaders,
        }
        fetch(`http://${process.env.REACT_APP_API_ADDRESS}/admin/comment/review`, requestOptions)
            .then((response) => {
                console.log("REVIEW", response)
                if (response.status != "200") {
                    let err = Error
                    err.message = "Invalid response code: " + response.status
                    this.setState({
                        error: err,
                        reviewing: false
                    })
                    return
                }
                this.setState({
                    reviewing: false,
                    reviewed: true,
                    isNew: false,
                })
                this.updateFromCommentsArray(Number(this.props.commentId))
                setTimeout(() => {
                    this.setState({
                        reviewed: false,
                    })
                }, 1000);
            })

    }


    confirmDelete = (e) => {
        e.preventDefault()
        console.log("would delete comment id", this.props.commentId)
        confirmAlert({
            title: "Delete Comment",
            message: "Are you sure?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.setState({ deleting: true, })
                        let myHeaders = new Headers()
                        myHeaders.append("Content-Type", "application/json")
                        myHeaders.append("Authorization", "Bearer " + this.props.jwt)
                        myHeaders.append("token", this.props.jwt)

                        const payload = {
                            id: Number(this.props.commentId),
                        }

                        const requestOptions = {
                            method: "POST",
                            body: JSON.stringify(payload),
                            headers: myHeaders,
                        }
                        fetch(`http://${process.env.REACT_APP_API_ADDRESS}/admin/comment/delete`, requestOptions)
                            .then((response) => {

                                if (response.status != "200") {
                                    let err = Error
                                    err.message = "Invalid response code: " + response.status
                                    this.setState({
                                        error: err,
                                        deleting: false
                                    })
                                    return
                                }
                                this.setState({ deleted: true })
                                setTimeout(() => {
                                    this.setState({
                                        displayNone: true,
                                    })
                                }, 1000);
                                this.deleteFromCommentsArrays(Number(this.props.commentId))
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        })
    }
    render() {
        if (this.state.displayNone === true) {
            return (
                <div className='row deleted'>
                    <div className="col-md-12">
                        <div className="commented-section mt-2">
                            <div className="d-flex flex-row align-items-center commented-user mb-2">
                                <h5 className="mr-2">{""}</h5><span className="dot mb-1"></span><span className="mb-1 ml-2">{""}</span></div>
                            <div className="comment-text-sm text-left" style={{ color: 'red', }}><span>{"This comment has been deleted"}</span></div>
                        </div>
                        <hr />
                    </div>
                </div>
            )
        }
        if (this.state.deleted === true) {
            return (
                <div className='row commentFade'>
                    <div className="col-md-12">
                        <div className="commented-section mt-2">
                            <div className="d-flex flex-row align-items-center commented-user mb-2">
                                <h5 className="mr-2">{""}</h5><span className="dot mb-1"></span><span className="mb-1 ml-2">{""}</span></div>
                            <div className="comment-text-sm text-left" style={{ color: 'red', }}><span>{"This comment has been deleted"}</span></div>
                        </div>
                        <hr />
                    </div>
                </div>
            )
        }
        if (this.state.reviewed === true) {
            return (
                <div className='row commentFade'>
                    <div className="col-md-12">
                        <div className="commented-section mt-2">
                            <div className="d-flex flex-row align-items-center commented-user mb-2">
                                <h5 className="mr-2">{""}</h5><span className="dot mb-1"></span><span className="mb-1 ml-2">{""}</span></div>
                            <div className="comment-text-sm text-left" style={{ color: 'green', }}><span>{"This comment has been reviewed"}</span></div>
                        </div>
                        <hr />
                    </div>
                </div>
            )
        }
        if (this.state.isNew === false) {
            return (<div className='row'>
                <div className="col-md-12">
                    <div className="commented-section mt-2">
                        <div className="d-flex flex-row align-items-center commented-user mb-2">
                            <h5 className="mr-2">{this.props.name}</h5><span className="dot mb-1"></span><span className="mb-1 ml-2">{this.props.date}</span></div>
                        <div className="comment-text-sm text-left"><span>{this.props.text}</span></div>
                        <div className="d-flex flex-row mt-3">
                            <form onSubmit={this.handleSubmit} className=''>

                                {this.state.deleting == false && (
                                    <a href='' onClick={(e) => this.confirmDelete(e)} className='btn btn-danger ms-1 ml-1' style={{ color: 'white' }}>
                                        Delete
                                    </a>
                                )}
                                {this.state.deleting == true && (
                                    <a href='' onClick={(e) => { e.preventDefault() }} className='btn btn-danger ms-1 ml-1' style={{ color: 'white' }}>
                                        Deleting...
                                    </a>
                                )}
                            </form>

                        </div>
                    </div>
                    <hr />
                </div>
            </div>
            )
        }

        if (this.props.isNew === true) {
            return (
                <div className='row'>
                    <div className="col-md-12">
                        <div className="commented-section mt-2">
                            <div className="d-flex flex-row align-items-center commented-user mb-2">
                                <h5 className="mr-2">{this.props.name}</h5><span className="dot mb-1"></span><span className="mb-1 ml-2">{this.props.date}</span></div>
                            <div className="comment-text-sm text-left"><span>{this.props.text}</span></div>
                            <div className="d-flex flex-row mt-3">
                                <form onSubmit={this.handleSubmit} className=''>

                                    {this.state.reviewing == false && (
                                        <button className="btn btn-success" type="submit">Approve</button>
                                    )}
                                    {this.state.reviewing == true && (
                                        <button className="btn btn-success" type="">Reviewing...</button>
                                    )}
                                    {/* <a className='btn btn-primary' style={{ color: 'white' }}>Save</a> */}
                                    {this.state.deleting == false && (
                                        <a href='' onClick={(e) => this.confirmDelete(e)} className='btn btn-danger ms-1 ml-1' style={{ color: 'white' }}>
                                            Delete
                                        </a>
                                    )}
                                    {this.state.deleting == true && (
                                        <a href='' onClick={(e) => { e.preventDefault() }} className='btn btn-danger ms-1 ml-1' style={{ color: 'white' }}>
                                            Deleting...
                                        </a>
                                    )}

                                </form>
                                {/* <button type="button" className="btn btn-success mx-2">Approve</button>
                                <button type="button" className="btn btn-danger">Delete</button> */}
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            )
        }

        else {
            return (<div className='row'>
                <div className="col-md-12">
                    <div className="commented-section mt-2">
                        <div className="d-flex flex-row align-items-center commented-user mb-2">
                            <h5 className="mr-2">{this.props.name}</h5><span className="dot mb-1"></span><span className="mb-1 ml-2">{this.props.date}</span></div>
                        <div className="comment-text-sm text-left"><span>{this.props.text}</span></div>
                        <div className="d-flex flex-row mt-3">
                            <form onSubmit={this.handleSubmit} className=''>

                                {this.state.deleting == false && (
                                    <a href='' onClick={(e) => this.confirmDelete(e)} className='btn btn-danger ms-1 ml-1' style={{ color: 'white' }}>
                                        Delete
                                    </a>
                                )}
                                {this.state.deleting == true && (
                                    <a href='' onClick={(e) => { e.preventDefault() }} className='btn btn-danger ms-1 ml-1' style={{ color: 'white' }}>
                                        Deleting...
                                    </a>
                                )}
                            </form>

                        </div>
                    </div>
                    <hr />
                </div>
            </div>
            )
        }
        return (
            <div className='row'>
                <div className="col-md-12">
                    <div className="commented-section mt-2">
                        <div className="d-flex flex-row align-items-center commented-user mb-2">
                            <h5 className="mr-2">{this.props.name}</h5><span className="dot mb-1"></span><span className="mb-1 ml-2">{this.props.date}</span></div>
                        <div className="comment-text-sm text-left"><span>{this.props.text}</span></div>
                        <div className="d-flex flex-row mt-3">
                            <button type="button" className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        );




    }
}