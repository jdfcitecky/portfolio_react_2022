// this will be chat dot
import React, { Component } from 'react';
import './ChatListItem.css'
export default class ChatListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            unReadNumber: 0,
            profileURL: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
            chatRoomID: -1,
        }
        this.handleChatRoomClick = this.handleChatRoomClick.bind(this)
    }
    componentDidMount() {
        this.setState({
            name: this.props.userName,
            unReadNumber: this.props.unReadNumber,
            chatRoomID: this.props.chatRoomID
        })
    }

    handleChatRoomClick = (id) => {
        this.props.handleChatRoomClick(id)
    }

    render() {
        let { name, unReadNumber, profileURL, chatRoomID } = this.state
        return (
            <div className="p-2 border-bottom li-85" onClick={() => this.handleChatRoomClick(this.state.chatRoomID)}>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row">
                        <div>
                            <img
                                src={profileURL}
                                alt="avatar" className="d-flex align-self-center me-3 img-30" />
                            <span className="badge bg-success badge-dot"></span>
                        </div>
                        <div className="pt-1">
                            <p className="fw-bold mb-0">{name}</p>

                        </div>
                        <div className="pt-1 ml-2">
                            {unReadNumber != 0 && (
                                <span className="badge bg-danger rounded-pill float-end" style={{ color: "white" }}>{unReadNumber}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}