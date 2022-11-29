import React, { Component } from 'react';
import "./Comment.css"
export default class Comment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: String(this.props.name),
            date: String(this.props.date),
            text: String(this.props.text),
            showMore: false,
        }
        this.handleShowMore = this.handleShowMore.bind(this)

    }

    handleShowMore = () => {
        this.setState({
            showMore: false,
        })
    }

    componentDidMount() {
        if (this.state.text.length > 100) {
            this.setState({
                showMore: true,
            })
        }
    }


    render() {
        let { name, date, text } = this.state
        let trimmedText = text
        if (!this.state.showMore) {
            return (
                <div className='row'>
                    <div className="col-md-12">
                        <div className="commented-section mt-2">
                            <div className="d-flex flex-row align-items-center commented-user">
                                <h5 className="mr-2">{name.substring(0, name.indexOf("@", 0))}</h5><span className="dot mb-1"></span><span className="mb-1 ml-2">{date.substring(0, date.indexOf("T", 0)) + " " + date.substring(date.indexOf("T", 0) + 1, date.indexOf("T", 0) + 6)}</span></div>
                            <div className="comment-text-sm text-left"><span className='break-word'>{this.props.text}</span></div>
                            <div
                                className="reply-section">
                                <div className="d-flex flex-row align-items-center voting-icons"><i className="fa fa-sort-up fa-2x mt-3 hit-voting"></i><i className="fa fa-sort-down fa-2x mb-3 hit-voting"></i><span className="dot ml-2"></span>

                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>

            );
        }
        if (text.lastIndexOf(" ") == -1) {
            trimmedText = text.substring(0, text.length - 10) + "..."
        } else {
            trimmedText = text.substring(90, text.lastIndexOf(" ") + "...")
        }
        return (
            <div className='row'>
                <div className="col-md-12">
                    <div className="commented-section mt-2">
                        <div className="d-flex flex-row align-items-center commented-user">
                            <h5 className="mr-2">{name.substring(0, name.indexOf("@", 0))}</h5><span className="dot mb-1"></span><span className="mb-1 ml-2">{date.substring(0, date.indexOf("T", 0)) + " " + date.substring(date.indexOf("T", 0) + 1, date.indexOf("T", 0) + 6)}</span></div>
                        <div className="comment-text-sm text-left "><span className='break-word'>{trimmedText} <div className='mt-2 link-style' onClick={this.handleShowMore}>Read More</div></span></div>
                        <div
                            className="reply-section">
                            <div className="d-flex flex-row align-items-center voting-icons"><i className="fa fa-sort-up fa-2x mt-3 hit-voting"></i><i className="fa fa-sort-down fa-2x mb-3 hit-voting"></i><span className="dot ml-2"></span>

                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>

        );

    }
}