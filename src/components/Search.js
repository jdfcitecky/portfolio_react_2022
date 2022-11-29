import React, { Component } from 'react';
import CardWork from './ui-components/CardWork';
import ReactLoading from 'react-loading';
class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: "",
            works: [{ color: "primary", category: "Backend", title: "Default", year: "2022", text: "AAAA", id: "1" }, { color: "primary", category: "Backend", title: "Default", year: "2022", text: "AAAA", id: "2" }],
            worksMain: [],
            worksShow: [],
            isLoaded: true,
            error: null,
            errors: [],
            category: "All",
            pageStart: 0,
            pageLimit: 5,
            maxPage: 0,
            isEmpty: false,
            // For pagination
            pageTags: [1],
            maxRecordsNumber: 1,
            numberOfRecordsInPage: 5,
            currentPage: 1,
            maxPageForP: 5,
            enableClick: true,
        }
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
        let keyword = this.props.match.params.value
        if (keyword != null || keyword != undefined) {
            this.setState({
                searchValue: keyword
            }, () => {
                this.getWorks()
            })
        } else {
            this.getWorks()
        }
    }

    getWorks = () => {
        let myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        myHeaders.append("Authorization", "Bearer " + this.props.jwt)
        const payload = {
            keyWord: (this.state.searchValue).toLowerCase(),
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: myHeaders,
        }
        fetch(`http://${process.env.REACT_APP_API_ADDRESS}/search`, requestOptions)
            .then((response) => {
                if (response.status != "200") {
                    let err = Error
                    err.message = "Invalid response code: " + response.status
                    this.setState({ error: err })
                }
                return response.json()
            })
            .then((json) => {
                let workSet = this.makeSetFromArrays(json.data)
                if (workSet.length === 0) {
                    this.setState({
                        isEmpty: true,
                    })
                }
                this.setState({
                    works: workSet.map(work => this.colorAssign(work)),
                    maxPage: json["data"].length,
                    isLoaded: true,
                },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                        this.handleCategory("All")
                    })
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
    makeSetFromArrays = (...arrays) => {
        let result = []
        let map = new Map()
        arrays.forEach((array) => {
            array.forEach((item) => {
                if (!map.has(item.id)) {
                    result.push(item)
                    map.set(item.id, item)
                }
            })
        })
        return result
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
        let page = this.getPageFromLocalStorage()
        let newWorksMain = []
        if (cate == "All") {
            newWorksMain = this.state.works
            if (page > this.calculateMaxPage(newWorksMain.length, this.state.pageLimit)) {
                page = 1
                this.setPageToLocalStroage(1)
            }
            this.setState({
                category: cate,
                worksMain: newWorksMain,
                currentPage: page,
                maxPageForP: this.calculateMaxPage(newWorksMain.length, this.state.pageLimit),

            },
                () => {
                    this.transformPageStart(0 + this.state.numberOfRecordsInPage * (page - 1))
                    this.handlePageTags(page, this.calculateMaxPage(newWorksMain.length, this.state.pageLimit))
                })
        } else {
            newWorksMain = this.state.works.filter(w => w.category == cate)
            if (page > this.calculateMaxPage(newWorksMain.length, this.state.pageLimit)) {
                page = 1
                this.setPageToLocalStroage(1)
            }
            this.setState({
                category: cate,
                worksMain: newWorksMain,
                currentPage: page,
                maxPageForP: this.calculateMaxPage(newWorksMain.length, this.state.pageLimit),
            },
                () => {
                    this.transformPageStart(0 + this.state.numberOfRecordsInPage * (page - 1))
                    this.handlePageTags(page, this.calculateMaxPage(newWorksMain.length, this.state.pageLimit))
                })
        }

    }

    getPageFromLocalStorage = () => {
        let page = window.localStorage.getItem("searchPage")
        if (page == "" || page == null || page == undefined) {
            return 1
        }
        else {
            return Number(page)
        }

    }

    setPageToLocalStroage = (page) => {
        window.localStorage.setItem("searchPage", String(page))
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
            this.setPageToLocalStroage(newCurrentPage)
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
            this.setPageToLocalStroage(newCurrentPage)
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
            this.setPageToLocalStroage(newCurrentPage)
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
        let { worksShow, isLoaded, error, isEmpty } = this.state
        if (error) {
            return <p>Error: {error.message}</p>
        } else if (!isLoaded) {
            return <div>
                <div className='container'>
                    <div className='row align-items-left'>
                        <div className="col-4 pt-0">
                            <p className="text-left text-info">{`Search result for : ${this.state.searchValue}`}</p>
                        </div>
                    </div>

                </div>
                <div style={{ height: document.documentElement.clientHeight - 370 }} className='container'>
                    <div className="align-items-center text-center row d-flex justify-content-center mt-5">
                        <ReactLoading className="align-items-center" type='spin' color='#BFBFBF' height={100} width={100} />
                    </div>
                    <div className="align-items-center text-center row d-flex justify-content-center">
                        <p>Loading...</p>
                    </div>
                </div>
            </div>

        } else if (isEmpty) {
            return <div>
                <div className='container'>
                    <div className='row align-items-left'>
                        <div className="col-4 pt-0">
                            <p className="text-left text-info">{`Search result for : ${this.state.searchValue}`}</p>
                        </div>
                    </div>

                </div>
                <div style={{ height: document.documentElement.clientHeight - 370 }} className='container'>
                    There is no more results.
                </div>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className="col-4 pt-0">
                            <ul className="pagination pt-3 ml-2">

                                <li key="pagination-p" className="page-item"><div className="page-link" onClick={this.handlePreviousClick}>Previous</div></li>
                                {this.state.pageTags.map((t, index) => (
                                    <li key={`pagination-${index}`} className="page-item"><div className={`page-link page-${t[0]} ${t[1]}`} value={t[0]} onClick={this.handleTagClick}>{t[0]}</div></li>
                                ))}
                                <li key="pagination-n" className="page-item"><div className="page-link" onClick={this.handleNextClick}>Next</div></li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        }
        return (
            <div>
                <div className='container'>
                    <div className='row align-items-left'>
                        <div className="col-4 pt-0">
                            <p className="text-left text-info">{`Search result for : ${this.state.searchValue}`}</p>
                        </div>
                    </div>

                </div>
                <div style={{ height: document.documentElement.clientHeight + 150 }} className='container'>
                    {worksShow.map((w) => (
                        <div className='row'>
                            <CardWork color={w.color} category={w.category} title={w.title} date={w.year} text={w.text} id={w.id} pictureone={w.pictureone} />
                        </div>

                    ))}
                </div>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className="col-4 pt-0">
                            <ul className="pagination pt-3 ml-2">

                                <li key="pagination-p" className="page-item"><div className="page-link" onClick={this.handlePreviousClick}>Previous</div></li>
                                {this.state.pageTags.map((t, index) => (
                                    <li key={`pagination-${index}`} className="page-item"><div className={`page-link page-${t[0]} ${t[1]}`} value={t[0]} onClick={this.handleTagClick}>{t[0]}</div></li>
                                ))}
                                <li key="pagination-n" className="page-item"><div className="page-link" onClick={this.handleNextClick}>Next</div></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default (props) => <Search {...props} key={props.location.pathname} />
