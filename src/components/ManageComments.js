import React, { Component } from 'react';
import Sidebar from './ui-components/Sidebar';
import CommentManage from './ui-components/CommentManage';
import ReactLoading from 'react-loading';
import './Manage.css'
export default class ManageComments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            commentsMain: [],
            commentsShow: [],
            isLoaded: false,
            error: null,
            errors: [],
            isManager: this.props.isManager,
            jwt: this.props.jwt,
            alert: {
                type: "d-done",
                message: "",
            },
            category: "All",
            pageStart: 0,
            pageLimit: 5,
            maxPage: 0,
            // For pagination
            pageTags: [1],
            maxRecordsNumber: 1,
            numberOfRecordsInPage: 5,
            currentPage: 1,
            maxPageForP: 5,
            enableClick: true,
        }
        this.getComments = this.getComments.bind(this)
        this.handleCategory = this.handleCategory.bind(this)
        this.handlePageStart = this.handlePageStart.bind(this)
        //Edit comments array
        this.deleteFromCommentsArrays = this.deleteFromCommentsArrays.bind(this)
        this.removeItemOnce = this.removeItemOnce.bind(this)
        // For pagination
        this.transformPageStart = this.transformPageStart.bind(this)
        this.calculateMaxPage = this.calculateMaxPage.bind(this)
        this.handlePreviousClick = this.handlePreviousClick.bind(this)
        this.handleNextClick = this.handleNextClick.bind(this)
        this.handleTagClick = this.handleTagClick.bind(this)
        this.handlePageTags = this.handlePageTags.bind(this)
        this.cleanTagSet = this.cleanTagSet.bind(this)
    }

    componentDidMount() {
        //To retrive comments
        this.getComments()
    }
    getComments = () => {
        let myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        myHeaders.append("Authorization", "Bearer " + this.props.jwt)
        myHeaders.append("token", this.props.jwt)
        const payload = {
            work_id: 0,
        }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: myHeaders,
        }
        fetch(`http://${process.env.REACT_APP_API_ADDRESS}/admin/comment/list`, requestOptions)
            .then((response) => {
                if (response.status != "200") {
                    let err = Error
                    err.message = "Invalid response code: " + response.status
                    this.setState({ error: err })
                }
                return response.json()
            })
            .then((json) => {
                this.setState({
                    comments: this.state.comments.concat(json["data"]),
                    maxPage: json["data"].length,
                    isLoaded: true,
                },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    })
                this.handleCategory("All")
            })
    }
    deleteFromCommentsArrays = (id) => {
        console.log("DELETE", id, this.removeItemOnce(this.state.comments, id), this.removeItemOnce(this.state.commentsMain, id), this.removeItemOnce(this.state.commentsShow, id))
        this.setState({
            comments: this.removeItemOnce(this.state.comments, id),
            commentsMain: this.removeItemOnce(this.state.commentsMain, id),
            commentsShow: this.removeItemOnce(this.state.commentsShow, id),
        })
    }
    updateFromCommentsArray = (id) => {
        console.log("Review", id, this.reviewedArray(this.state.comments, id), this.reviewedArray(this.state.commentsMain, id), this.reviewedArray(this.state.commentsShow, id))
        this.setState({
            comments: this.reviewedArray(this.state.comments, id),
            commentsMain: this.reviewedArray(this.state.commentsMain, id),
            commentsShow: this.reviewedArray(this.state.commentsShow, id),
        })

    }
    removeItemOnce = (arr, value) => {
        let i = 0
        while (i < arr.length) {
            if (arr[i].id === value) {
                arr.splice(i, 1);
                return arr
            } else {
                ++i;
            }
        }
        return arr;
    }
    reviewedArray = (arr, value) => {
        let i = 0
        while (i < arr.length) {
            if (arr[i].id === value) {
                arr[i].is_new = false
                return arr
            } else {
                ++i;
            }
        }
        return arr;
    }


    handlePageStart = (pageStart, maxPage, commentsWithCategory) => {
        if (pageStart == maxPage - 1) {
            this.setState({
                pageStart: maxPage,
                commentsShow: commentsWithCategory.slice(pageStart),
            })
        } else if (pageStart + this.state.pageLimit > maxPage) {
            this.setState({
                pageStart: maxPage,
                commentsShow: commentsWithCategory.slice(pageStart, maxPage),
            })
        } else {
            this.setState({
                pageStart: pageStart,
                commentsShow: commentsWithCategory.slice(pageStart, pageStart + this.state.pageLimit),
            })
        }
    }
    handleCategory = (cate) => {
        let newcommentsMain = []
        if (cate == "All") {
            newcommentsMain = this.state.comments
            this.setState({
                category: cate,
                commentsMain: newcommentsMain,
                currentPage: 1,
                maxPageForP: this.calculateMaxPage(newcommentsMain.length, this.state.pageLimit),

            })
        } else if (cate == "New") {
            newcommentsMain = this.state.comments.filter(w => w.is_new == true)
            this.setState({
                category: cate,
                commentsMain: newcommentsMain,
                currentPage: 1,
                maxPageForP: this.calculateMaxPage(newcommentsMain.length, this.state.pageLimit),
            })
        } else if (cate == "Reviewed") {
            newcommentsMain = this.state.comments.filter(w => w.is_new == false)
            this.setState({
                category: cate,
                commentsMain: newcommentsMain,
                currentPage: 1,
                maxPageForP: this.calculateMaxPage(newcommentsMain.length, this.state.pageLimit),
            })
        }
        this.handlePageStart(0, newcommentsMain.length, newcommentsMain)
        this.handlePageTags(1, this.calculateMaxPage(newcommentsMain.length, this.state.pageLimit))

    }


    //For pagination
    calculateMaxPage = (maxRecordsNumber, numberOfRecordsinPage) => {
        if (maxRecordsNumber < numberOfRecordsinPage) {
            return 1
        }

        if (maxRecordsNumber % numberOfRecordsinPage == 0) {
            return Math.floor(maxRecordsNumber / numberOfRecordsinPage)
        }

        return Math.ceil(maxRecordsNumber / numberOfRecordsinPage)
    }

    transformPageStart = (page) => {
        if (page > this.state.commentsMain.length) {
            page = this.state.commentsMain.length
        }
        if (page < 0) {
            page = 0
        }
        this.handlePageStart(page, this.state.commentsMain.length, this.state.commentsMain)
    }

    handlePreviousClick = () => {
        if (this.state.enableClick) {
            this.setState({
                enableClick: false,
            })
            let newCurrentPage = this.state.currentPage - 1
            if (newCurrentPage < 1) {
                setTimeout(() => {
                    this.setState({
                        enableClick: true,
                    })
                }, 300);
                return
            }
            this.setState({
                currentPage: newCurrentPage,
            })
            this.handlePageTags(newCurrentPage, this.state.maxPageForP)
            this.transformPageStart(0 + this.state.numberOfRecordsInPage * (newCurrentPage - 1))
            setTimeout(() => {
                this.setState({
                    enableClick: true,
                })
            }, 1000);
        }
        return
    }

    handleNextClick = () => {
        if (this.state.enableClick) {
            this.setState({
                enableClick: false,
            })
            let newCurrentPage = this.state.currentPage + 1
            if (newCurrentPage > this.state.maxPageForP) {
                setTimeout(() => {
                    this.setState({
                        enableClick: true,
                    })
                }, 300);
                return
            }
            this.setState({
                currentPage: newCurrentPage,
            })
            this.handlePageTags(newCurrentPage, this.state.maxPageForP)
            this.transformPageStart(0 + this.state.numberOfRecordsInPage * (newCurrentPage - 1))
            setTimeout(() => {
                this.setState({
                    enableClick: true,
                })
            }, 1000);
        }
        return
    }

    handleTagClick = (e) => {
        if (this.state.enableClick) {
            this.setState({
                enableClick: false,
            })
            let innerHTML = e.target.innerHTML
            if (innerHTML == "...") {
                setTimeout(() => {
                    this.setState({
                        enableClick: true,
                    })
                }, 300);
                return
            }
            let newCurrentPage = Number(innerHTML)
            if (newCurrentPage > this.state.maxPageForP) {
                setTimeout(() => {
                    this.setState({
                        enableClick: true,
                    })
                }, 300);
                return
            }
            if (newCurrentPage < 1) {
                setTimeout(() => {
                    this.setState({
                        enableClick: true,
                    })
                }, 300);
                return
            }
            this.setState({
                currentPage: newCurrentPage,
            })
            this.handlePageTags(newCurrentPage, this.state.maxPageForP)
            this.transformPageStart(0 + this.state.numberOfRecordsInPage * (newCurrentPage - 1))
            setTimeout(() => {
                this.setState({
                    enableClick: true,
                })
            }, 500);
        }
        return
    }

    handlePageTags = (currentPage, endPage) => {
        let newTags = []
        newTags.push(endPage)
        newTags.push(1)
        newTags.push(currentPage)
        if (currentPage - 1 > 1) {
            newTags.push(currentPage - 1)
            if (currentPage - 2 > 1) {
                newTags.push(currentPage - 2)
            }
        }
        if (currentPage + 1 < endPage) {
            newTags.push(currentPage + 1)
            if (currentPage + 2 < endPage) {
                newTags.push(currentPage + 2)
            }
        }
        newTags.concat(this.state.pageTags)
        let tagSet = newTags.filter((item, index) => newTags.indexOf(item) === index).sort(function (a, b) {
            if (a === Infinity)
                return 1;
            else if (isNaN(a))
                return -1;
            else
                return a - b;
        })
        if (currentPage - 2 >= 2) {

            let arrf = tagSet.slice(0, 1)
            arrf.push("...")
            let arrb = tagSet.slice(1, tagSet.length)
            tagSet = arrf.concat(arrb)
        }
        if (currentPage + 2 < endPage) {
            let arrf = tagSet.slice(0, tagSet.length - 1)
            arrf.push("...")
            let arrb = tagSet.slice(-1)
            tagSet = arrf.concat(arrb)
        }
        // To show current page => let current page to be an object.
        let tagSetObj = []
        for (let i = 0; i < tagSet.length; i++) {
            if (tagSet[i] === currentPage) {
                tagSetObj[i] = [currentPage, "currentPageTag"]
            } else {
                tagSetObj[i] = [tagSet[i], ""]
            }

        }
        this.setState({
            pageTags: tagSetObj
        })

    }

    cleanTagSet = (arr, value) => {
        let i = 0;
        while (i < arr.length) {
            if (arr[i] === value) {
                arr.splice(i, 1);
            } else {
                ++i;
            }
        }
        return arr;
    }



    render() {
        let { comments, commentsShow, isLoaded, error, isManager } = this.state
        console.log(commentsShow)
        if (error) {
            return <p>Error: {error.message}</p>
        } else if (!isManager) {
            console.log("push to index")
            this.props.history.push({
                pathname: "/",
            })

        } else if (!isLoaded) {
            return <div>
                <link href="/docs/4.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
                <div className='container'>
                    <div className='row'>
                        <Sidebar />
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">Comments</h1>
                            </div>
                            <div className="align-items-center text-center row d-flex justify-content-center mt-5">
                                <ReactLoading className="align-items-center" type='spin' color='#BFBFBF' height={100} width={100} />
                            </div>
                            <div className="align-items-center text-center row d-flex justify-content-center">
                                <p>Loading...</p>
                            </div>
                        </main>
                    </div>

                </div>
            </div>

        }
        return (

            <div>
                <link href="/docs/4.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
                <div className='container'>
                    <div className='row'>
                        <Sidebar />
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">Comments</h1>
                                <div className='d-flex justify-content-between'>
                                    <div className='py-3'>
                                        <select onChange={(e) => { this.handleCategory(e.target.value) }}>
                                            <option value="All">All</option>
                                            <option value="New">New</option>
                                            <option value="Reviewed">Reviewed</option>
                                        </select>
                                    </div>

                                    <ul className="pagination pt-3 ml-2">

                                        <li key="pagination-p" className="page-item"><div className="page-link" onClick={this.handlePreviousClick}>Previous</div></li>
                                        {this.state.pageTags.map((t, index) => (
                                            <li key={`pagination-${index}`} className="page-item"><div className={`page-link page-${t[0]} ${t[1]}`} value={t[0]} onClick={this.handleTagClick}>{t[0]}</div></li>
                                        ))}
                                        <li key="pagination-n" className="page-item"><div className="page-link" onClick={this.handleNextClick}>Next</div></li>
                                    </ul>
                                </div>
                            </div>

                            {commentsShow.map((c) => (
                                <CommentManage key={c.id} name={c.member_name} date={c.updated_at} text={c.text} isNew={c.is_new} jwt={this.state.jwt} commentId={c.id} deleteFromCommentsArrays={this.deleteFromCommentsArrays} updateFromCommentsArray={this.updateFromCommentsArray} />
                            ))}


                        </main>
                    </div>

                </div>
            </div>

        );
    }
}