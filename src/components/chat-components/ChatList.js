//this will be chatlist
import React, { Component } from 'react';
import ChatListItem from './ChatListItem';
import ReactLoading from 'react-loading';
import { Search, X } from 'react-feather';
import './ChatList.css'
export default class ChatList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            chatRoomList: [],
            chatRoomListShow: [],
            searchValue: "",
        }
        this.handleChatRoomClick = this.handleChatRoomClick.bind(this)
    }
    componentDidMount() {
        this.setState({
            isLoaded: true,
            chatRoomList: this.props.chatRoomList,
            chatRoomListShow: this.props.chatRoomList,
        })
    }


    handleChatRoomClick = (id) => {
        this.props.handleChatRoomClick(id)
    }


    handleCancelSearchClick = () => {
        this.setState({
            searchValue: "",
            chatRoomListShow: this.state.chatRoomList,
        })
    }

    handleSearchClick = () => {
        let searchValue = new RegExp(this.state.searchValue)
        let chatRoomAll = this.state.chatRoomList
        let newChatRoomList = []
        chatRoomAll.forEach((c) => {
            if (c.alias.match(searchValue) != null) {
                newChatRoomList.push(c)
            }
        })
        this.setState({
            chatRoomListShow: newChatRoomList,
        })

    }


    render() {
        let { isLoaded, chatRoomListShow, searchValue } = this.state
        if (!isLoaded) {
            return (
                <div>
                    <div className="align-items-center text-center row d-flex justify-content-center mt-5">
                        <ReactLoading className="align-items-center" type='spin' color='#BFBFBF' height={100} width={100} />
                    </div>
                    <div className="align-items-center text-center row d-flex justify-content-center">
                        <p>Loading...</p>
                    </div>
                </div>

            )
        }
        // if (chatRoomListShow.length == 0) {

        // }
        return (
            <div className="chatListFrame mt-2">
                <div className='row m-1'>
                    <div className='col-12'>
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xl-12">
                                <div className='d-flex flex-row mb-3 pos-relative mt-3'>
                                    {searchValue != "" && (
                                        <div className='searchCancelBtn'>
                                            <X color='#333333' size={8} className="feather-8 feather-file-text" onClick={this.handleCancelSearchClick} />
                                        </div>
                                    )}
                                    <input name="search" id="searchvalue" placeholder="Search" value={this.state.searchValue} onChange={(event) => this.setState({ searchValue: event.target.value })} type="text" className="form-control mr-2 ml-0 mt-0 chatListSearchInput" />
                                    <div onClick={this.handleSearchClick} className="chatListSearchBtn d-flex justify-content-center" >
                                        <Search color='#333333' className="feather-16 feather-file-text align-self-center" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xl-12 mb-3">
                                <div className='chatList'>
                                    <div className="list-unstyled mb-0">
                                        {chatRoomListShow.length == 0 && (
                                            <div className="d-flex flex-row justify-content-center border-top mt-2">
                                                <div className='mt-2'>
                                                    <p className="small me-3 mb-3 rounded-3 text-muted">There is no result.</p>
                                                </div>
                                            </div>
                                        )}
                                        {chatRoomListShow.map((i) => (

                                            <div className="p-2 border-bottom li-85" onClick={() => this.handleChatRoomClick(i.chat_room_id)}>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex flex-row li-80">
                                                        <div className='li-80-img'>
                                                            <img
                                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                                alt="avatar" className="d-flex align-self-center me-3 img-90" />
                                                            <span className="badge bg-success badge-dot"></span>
                                                        </div>
                                                        <div className="pt-1">
                                                            <p className="fw-bold mb-0">{i.alias}</p>

                                                        </div>
                                                        <div className="pt-1 ml-2">
                                                            {i.unread_number != 0 && (
                                                                <span className="badge bg-danger rounded-pill float-end" style={{ color: "white" }}>{i.unread_number}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                            </div>

                        </div>


                    </div>
                </div>
            </div>


        );
    }
}