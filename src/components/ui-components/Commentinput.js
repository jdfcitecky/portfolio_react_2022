import React, { Component } from 'react';
import Comment from './Comment';
import './Comment.css'
import "./Commentinput.css"
export default class Commentinput extends Component {
    // state = {
    //     textValue: "",
    //     email: "",
    //     error: null,
    //     errors: [],
    // }

    constructor(props) {
        super(props)
        this.state = {
            API_IP: process.env.REACT_APP_API_ADDRESS,
            textValue: "",
            id: 0,
            workName: this.props.workName,
            email: this.props.email,
            memberID: this.props.memberID,
            workID: this.props.workID,
            sended: false,
            error: null,
            errors: [],
        }
    }

    handleSubmit = (evt) => {
        console.log('submit')
        evt.preventDefault()
        // client side validation
        let errors = []
        if (this.state.textValue == "") {
            errors.push("comment")
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
        payload["member_id"] = this.state.memberID
        payload["member_name"] = this.state.email
        payload["work_name"] = this.state.workName
        payload["work_id"] = Number(this.state.workID)
        // console.log("ppppp", payload)
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: myHeaders,
        }
        fetch(`http://${this.state.API_IP}/work/comment`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    this.setState({
                        alert: {
                            type: "alert-danger",
                            message: data.error.message,
                        }
                    })
                } else {
                    // console.log(data)
                    this.setState({ sended: true, textValue: "" })
                    setTimeout(() => {
                        this.setState({
                            sended: false
                        })
                    }, 3000);
                }
            })
    }


    render() {
        let { sended, error, errors } = this.state
        let email = window.localStorage.getItem("email")
        let errorMessage
        if (errors.length > 0) {
            let errorMessageText = errors.join()
            errorMessage = <div className='' style={{ color: 'red' }}>{`Error: ${errorMessageText} is blank!`}</div>
        }
        if (error) {
            return <p>Error: {error}</p>
        } else if (email == "" || email == null || email == undefined) {
            return <div className='row'>
                <div className="col-md-12">
                    <div className="coment-bottom bg-white p-2 px-4">
                        <form className='d-flex flex-row add-comment-section mt-4 mb-4'>
                            <div type="text" className="input-like mr-3" placeholder="Add comment" >Please sign in to comment.</div>
                            <button className="btn btn-secondary my-2 commentSendBtnWidth" type="text" onClick={(e) => { e.preventDefault() }}>Comment</button>
                        </form>
                    </div>
                </div>
            </div>

        } else if (sended) {
            return <div className='row'>
                <div className="col-md-12">
                    <div className="coment-bottom bg-white p-2 px-4">
                        <form className='d-flex flex-row add-comment-section mt-4 mb-4'>
                            <div type="text" className="input-like mr-3" placeholder="Add comment" >Your comment is waiting review</div>
                            <button className="faded btn btn-success my-2 commentSendBtnWidth" type="text" onClick={(e) => { e.preventDefault() }}>Success</button>
                        </form>

                    </div>
                </div>
            </div>


        }
        return (
            <div className='row'>
                <div className="col-md-12">
                    <div className="coment-bottom bg-white p-2 px-4">
                        {errorMessage}
                        <form onSubmit={this.handleSubmit} className='d-flex flex-row add-comment-section mt-4 mb-4'>


                            <input name="text" id="text" value={this.state.textValue} onChange={(event) => this.setState({ textValue: event.target.value })} type="text" className="form-control mr-3" placeholder="Add comment" />

                            <button className="btn btn-primary my-2 commentSendBtnWidth" type="submit">Comment</button>
                            {/* <a className='btn btn-primary my-2' style={{ color: 'white' }}>Comment</a> */}
                        </form>
                    </div>
                </div>
            </div>



        );
    }
}