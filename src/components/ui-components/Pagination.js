import React, { Component } from 'react';

import ReactLoading from 'react-loading';

export default class Pagination extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageTags: [1],
            maxRecordsNumber: this.props.maxPageNumber,
            numberOfRecordsinPage: this.props.numberOfRecordsinPage,
            currentPage: 1,
            maxPage: 1,

        }
        this.handleChange = this.handleChange.bind(this)
        this.handlePageStart = this.handlePageStart.bind(this)
        this.calculateMaxPage = this.calculateMaxPage.bind(this)
        this.handlePreviousClick = this.handlePreviousClick.bind(this)
        this.handleNextClick = this.handleNextClick.bind(this)
        this.handleTagClick = this.handleTagClick.bind(this)
        this.handlePageTags = this.handlePageTags.bind(this)

    }

    componentDidMount() {
        this.setState({
            maxPage: this.calculateMaxPage(this.state.maxRecordsNumber, this.state.numberOfRecordsinPage),
        })
    }

    handleChange = () => {
        // if (!this.props.paginationLoaded) 
        {
            this.setState({
                maxRecordsNumber: this.props.maxPageNumber,
                numberOfRecordsinPage: this.props.numberOfRecordsinPage,
                // maxPage: this.calculateMaxPage(this.props.maxRecordsNumber, this.props.numberOfRecordsinPage),
            })
        }
    }

    calculateMaxPage = (maxRecordsNumber, numberOfRecordsinPage) => {
        if (maxRecordsNumber < numberOfRecordsinPage) {
            return 1
        }

        if (maxRecordsNumber % numberOfRecordsinPage == 0) {
            return Math.floor(maxRecordsNumber / numberOfRecordsinPage)
        }

        return Math.ceil(maxRecordsNumber / numberOfRecordsinPage)
    }

    handlePageStart = (page) => {
        if (page > this.state.maxRecordsNumber) {
            page = this.state.maxRecordsNumber
        }
        if (page < 0) {
            page = 0
        }
        this.props.handlePageStart(page)
    }

    handlePreviousClick = () => {
        let newCurrentPage = this.state.currentPage - 1
        if (newCurrentPage < 1) {
            return
        }
        this.setState({
            currentPage: newCurrentPage,
        })
        this.handlePageTags(newCurrentPage)
        this.handlePageStart(0 + this.state.numberOfRecordsinPage * (newCurrentPage - 1))
    }

    handleNextClick = () => {
        let newCurrentPage = this.state.currentPage + 1
        if (newCurrentPage > this.state.maxPage) {
            return
        }
        this.setState({
            currentPage: newCurrentPage,
        })
        this.handlePageTags(newCurrentPage)
        this.handlePageStart(0 + this.state.numberOfRecordsinPage * (newCurrentPage - 1))
    }

    handleTagClick = (e) => {
        let newCurrentPage = e.value
        if (newCurrentPage > this.state.maxPage) {
            return
        }
        if (newCurrentPage < 1) {
            return
        }
        this.setState({
            currentPage: newCurrentPage,
        })
        this.handlePageTags(newCurrentPage)
        this.handlePageStart(0 + this.state.numberOfRecordsinPage * (newCurrentPage - 1))
    }

    handlePageTags = (currentPage) => {
        let newTags = this.state.pageTags
        newTags.push(this.state.maxPage)
        if (currentPage - 1 > 1) {
            newTags.push(currentPage - 1)
        }
        if (currentPage + 1 < this.state.maxPage) {
            newTags.push(currentPage + 1)
        }
        newTags.concat(this.state.pageTags)
        let tagSet = newTags.filter((item, index) => newTags.indexOf(item) === index).sort()
        if (currentPage - 2 > 2) {
            tagSet.splice(0, 2, "...")
        }
        if (currentPage + 2 < this.state.maxPage) {
            tagSet.splice(0, this.state.maxPage - 1, "...")
        }
        this.setState({
            pageTags: tagSet
        })
    }
    // 1
    // 1 2
    // 1 2 3
    // 1 2 3 4
    // 1 2 ... 4 ... 5

    render() {
        // this.handleChange()
        console.log("pppppppppppppp Render1", this.state)
        console.log("pppppppppppppp Render2", this.state.maxRecordsNumber)
        console.log("pppppppppppppp Render3", this.props)
        let style = this.calculateMaxPage(this.props.maxPageNumber, this.props.numberOfRecordsinPage)
        console.log("pppppppppppppp Render4", style)
        if (style == 1) {
            return <div>
                <ul className={`pagination ${this.props.className}`}>
                    <li key="pagination-p" className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li key="pagination-1" className="page-item"><a className="page-link" href="#">1</a></li>
                    <li key="pagination-n" className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </div>
        }
        return (
            <div>
                <ul className="pagination pt-3 ml-2">

                    <li key="pagination-p" className="page-item"><a className="page-link" href="#" onClick={this.handlePreviousClick}>Previous</a></li>
                    {this.state.pageTags.map((t, index) => (
                        <li key={`pagination-${index}`} className="page-item"><a className="page-link" href="#" onClick={this.handleTagClick}>{t}</a></li>
                    ))}
                    <li key="pagination-n" className="page-item"><a className="page-link" href="#" onClick={this.handleNextClick}>Next</a></li>
                </ul>
            </div>

        );
    }
}
