import React, { Component } from 'react';
import Sidebar from './ui-components/Sidebar';
import CardManage from './ui-components/CardManage';
import ReactLoading from 'react-loading';
import './Manage.css'
import './ManageArticles.css'
export default class ManageArticles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            works: [],
            worksMain: [],
            worksShow: [],
            isLoaded: false,
            error: null,
            errors: [],
            isManager: this.props.isManager,
            alert: {
                type: "d-done",
                message: "",
            },
            category: "All",
            pageStart: 0,
            pageLimit: 3,
            maxPage: 0,
            // For pagination
            pageTags: [1],
            maxRecordsNumber: 1,
            numberOfRecordsInPage: 3,
            currentPage: 1,
            maxPageForP: 3,
            enableClick: true,


        }
        this.getWorks = this.getWorks.bind(this)
        this.colorAssign = this.colorAssign.bind(this)
        this.handleCategory = this.handleCategory.bind(this)
        this.handlePageStart = this.handlePageStart.bind(this)
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
        //To retrive works
        this.getWorks()
    }
    getWorks = () => {
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
        fetch(`http://${process.env.REACT_APP_API_ADDRESS}/admin/work/list`, requestOptions)
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
                    works: this.state.works.concat(json["data"]).map(work => this.colorAssign(work)),
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
    colorAssign = (work) => {
        switch (work.category) {
            case "Backend":
                work["color"] = "primary"
                break;
            case "Frontend":
                work["color"] = "success"
                break;
            case "Design":
                work["color"] = "warning"
                break;
            case "M.S Project":
                work["color"] = "info"
                break;
            default:
                work["color"] = "secondary"
                break;
        }
        return work

    }
    handlePageStart = (pageStart, maxPage, worksWithCategory) => {
        if (pageStart == maxPage - 1) {
            this.setState({
                pageStart: maxPage,
                worksShow: worksWithCategory.slice(pageStart),
            })
        } else if (pageStart + this.state.pageLimit > maxPage) {
            this.setState({
                pageStart: maxPage,
                worksShow: worksWithCategory.slice(pageStart, maxPage),
            })
        } else {
            this.setState({
                pageStart: pageStart,
                worksShow: worksWithCategory.slice(pageStart, pageStart + this.state.pageLimit),
            })
        }
    }

    handleCategory = (cate) => {
        let newWorksMain = []
        if (cate == "All") {
            newWorksMain = this.state.works
            this.setState({
                category: cate,
                worksMain: newWorksMain,
                currentPage: 1,
                maxPageForP: this.calculateMaxPage(newWorksMain.length, this.state.pageLimit),

            })
        } else {
            newWorksMain = this.state.works.filter(w => w.category == cate)
            this.setState({
                category: cate,
                worksMain: newWorksMain,
                currentPage: 1,
                maxPageForP: this.calculateMaxPage(newWorksMain.length, this.state.pageLimit),
            })
        }
        this.handlePageStart(0, newWorksMain.length, newWorksMain)
        this.handlePageTags(1, this.calculateMaxPage(newWorksMain.length, this.state.pageLimit))

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
        if (page > this.state.worksMain.length) {
            page = this.state.worksMain.length
        }
        if (page < 0) {
            page = 0
        }
        this.handlePageStart(page, this.state.worksMain.length, this.state.worksMain)
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
        let { isLoaded, error, isManager, worksShow } = this.state
        if (error) {
            return <p>Error: {error.message}</p>
        } else if (!isManager) {
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
                                <h1 className="h2">Articles</h1>
                                <div className='d-flex justify-content-between'>
                                    <div className='py-3'>
                                        <select onChange={(e) => { this.handleCategory(e.target.value) }}>
                                            <option value="All">All</option>
                                            <option value="Backend">Backend</option>
                                            <option value="Frontend">Frontend</option>
                                            <option value="M.S Project">M.S Project</option>
                                            <option value="Design">Design</option>
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

                            {worksShow.map((w) => (
                                <div className='row'>
                                    <CardManage key={w.id} color={w.color} category={w.category} title={w.title} date={w.date} text={w.text} id={w.id} pictureone={w.pictureone} />
                                </div>

                            ))}


                        </main>
                    </div>

                </div >
            </div >

        );
    }
}
