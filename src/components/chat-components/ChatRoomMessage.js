// this will be chat dot
import React, { Component } from 'react';
import './ChatRoomMessage.css'
export default class ChatRoomMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            time: "",
            type: "sender",
            id: "",
            profileURL: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
        }
    }
    componentDidMount() {
        this.setState({
            text: this.props.text,
            time: this.props.time,
            type: this.props.type,
            id: this.props.id,
        })
    }

    render() {
        let { text, time, type, profileURL, id } = this.state
        let timeShow = time.slice(11, 15) + ' ' + time.slice(4, 7) + ' ' + time.slice(8, 11) + ' ' + time.slice(16, 21)
        if (type === "sender") {
            return (
                <div className="d-flex flex-row justify-content-end" id={id}>
                    <div>
                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{text}</p>
                        <p className="small me-3 mb-3 rounded-3 text-muted">{timeShow}</p>
                    </div>
                    <img src={profileURL} alt="avatar sent" className='chatRoomMessageAvatar' />
                </div>
            )
        }
        if (type === "other") {
            return (
                <div className="d-flex flex-row justify-content-start" id={id}>
                    <img src={profileURL}
                        alt="avatar receive" className='chatRoomMessageAvatar' />
                    <div>
                        <p className="small p-2 ms-3 mb-1 rounded-3 receiveBackground" >{text}</p>
                        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">{timeShow}</p>
                    </div>
                </div>
            )
        }
        return (
            <div>Type error</div>
        );
    }
}