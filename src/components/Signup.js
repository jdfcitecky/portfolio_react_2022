import React, { Component } from 'react';
import Jumbotron from './ui-components/Jumbotron';
import Card from './ui-components/Card';
import Timeline from './ui-components/Timeline';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "./Signin.css"
export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            API_IP: process.env.REACT_APP_API_ADDRESS,
            email: "",
            password: "",
            error: null,
            errors: [],
            alert: {
                type: "d-done",
                message: "",
            },
            msg: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (evt) => {
        let value = evt.target.value
        let name = evt.target.name
        this.setState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    handleSubmit = (evt) => {
        this.setState({
            errors: [],
            msg: "",
        })
        evt.preventDefault()
        let errors = []
        if (this.state.email === "") {
            errors.push("Email")
        }
        if (this.state.password === "") {
            errors.push("Password")
        }
        this.setState({ errors: errors })
        if (errors.length > 0) {
            return false
        }
        const data = new FormData(evt.target)
        let payload = Object.fromEntries(data.entries())
        payload.is_manager = false
        payload.id = 0
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(payload),
        }
        // console.log(requestOptions)
        fetch(`http://${this.state.API_IP}/member/update`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.msg != "") {
                    this.setState({
                        msg: data.msg + ".",
                    })
                    return
                } else {
                    console.log(data)
                    // this.handleJWTChange(Object.values(data)[0])
                    // window.localStorage.setItem("jwt", JSON.stringify(Object.values(data)[0]))
                    this.props.history.push({
                        pathname: "/"
                    })
                }
            })
            .catch((error) => {

            })

    }
    render() {
        if (this.state.errors.length === 1) {
            var errorWorld = this.state.errors[0] + " can not be empty!"
        }
        if (this.state.errors.length === 2) {
            var errorWorld = this.state.errors[0] + " and " + this.state.errors[1] + " can not be empty!"
        }
        return (
            <div>
                <div style={{ height: document.documentElement.clientHeight - 275 }} className='container'>
                    <div className='row align-items-center'>
                        <div className="wrapper fadeInDown mb-5 mt-5">
                            <div id="formContent">

                                <div className="fadeIn first mt-3">
                                    <p>Enter your information</p>
                                </div>
                                <div style={{ color: "red" }}>{errorWorld}</div>

                                <form onSubmit={this.handleSubmit}>
                                    <input type="email" id="email" className="fadeIn second" name="email" placeholder='email' value={this.state.email} onChange={this.handleChange} />
                                    <input type="password" id="password" className="fadeIn third hiddenText" name="password" placeholder='password' value={this.state.password} onChange={this.handleChange} />
                                    <input type="submit" className="fadeIn fourth mt-3" value="Sign Up" />
                                </form>

                                <div id="formFooter">
                                    <p>If you have an account please </p>
                                    <Link className="underlineHover" to="/signin">sign in</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

