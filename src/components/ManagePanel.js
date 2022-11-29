import React, { Component } from 'react';
import Sidebar from './ui-components/Sidebar';
import CommentManage from './ui-components/CommentManage';
import ReactLoading from 'react-loading';
import c3 from 'c3';
import './Manage.css'
import './ManagePanel.css'
export default class ManageComments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: [],
            // !!!!!! When API done please set isLoaded false
            isLoaded: true,
            error: null,
            errors: [],
            isManager: this.props.isManager,
            jwt: this.props.jwt,
            alert: {
                type: "d-done",
                message: "",
            },
            chartDaily: {
                column1: [],
                column1Show: [],
                column2: [],
                column2Show: [],
                axis: [],
                axisShow: [],
                currentPage: 0,
            },
            chartTopBrowse: {
                column1: [],
                column1Show: [],
                axis: [],
                axisShow: [],
                currentPage: 0,

            },
            chartTopComment: {
                column1: [],
                column1Show: [],
                axis: [],
                axisShow: [],
                currentPage: 0,
            },
        }
        this.getChartData = this.getChartData.bind(this)
        //Edit comments array

    }

    componentDidMount() {
        //To retrive comments
        this.getChartData()
        // this.renderChart()
    }

    componentDidUpdate() {
        this.renderChart()
    }

    getChartData = () => {
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
        fetch(`http://${process.env.REACT_APP_API_ADDRESS}/admin/statistic/get`, requestOptions)
            .then((response) => {
                if (response.status != "200") {
                    let err = Error
                    err.message = "Invalid response code: " + response.status
                    this.setState({ error: err })
                }
                return response.json()
            })
            .then((json) => {
                console.log(json.data)
                let dailyBrowse = []
                let dailyBrowseAxis = []
                let dailyComment = []
                let dailyCommentAxis = []
                json.data.daily_browse.forEach(r => {
                    dailyBrowse.push(r.count)
                    let stringDate = String(r.date)
                    let formatDate = stringDate.slice(0, 4) + "-" + stringDate.slice(4, 6) + "-" + stringDate.slice(-2) //20220905
                    dailyBrowseAxis.push(String(formatDate))
                });
                json.data.daily_comment.forEach(r => {
                    dailyComment.push(r.count)
                    let stringDate = String(r.date)
                    let formatDate = stringDate.slice(0, 4) + "-" + stringDate.slice(4, 6) + "-" + stringDate.slice(-2) //20220905
                    dailyCommentAxis.push(String(formatDate))
                });
                let topBrowseArticle = []
                let topBrowseArticleAxis = []
                let topCommentArticle = []
                let topCommentArticleAxis = []
                json.data.top_browse_works.forEach(r => {
                    topBrowseArticle.push(r.count)
                    topBrowseArticleAxis.push(r.title)
                });
                json.data.top_comment_works.forEach(r => {
                    topCommentArticle.push(r.count)
                    topCommentArticleAxis.push(r.title)
                });
                if (dailyBrowseAxis.length > 7) {
                    this.setState({
                        chartDaily: {
                            column1: dailyBrowse,
                            column1Show: ["Browse"].concat(dailyBrowse.slice(-7)),
                            column2: dailyComment,
                            column2Show: ["Comment"].concat(dailyComment.slice(-7)),
                            axis: dailyBrowseAxis,
                            axisShow: dailyBrowseAxis.slice(-7),
                            currentPage: dailyBrowse.length - 1,
                        },
                        chartTopBrowse: {
                            column1: topBrowseArticle,
                            column1Show: ["Browse"].concat(topBrowseArticle.slice(0, 5)),
                            axis: topBrowseArticleAxis,
                            axisShow: topBrowseArticleAxis.slice(0, 5),
                            currentPage: 0,
                        },
                        chartTopComment: {
                            column1: topCommentArticle,
                            column1Show: ["Comment"].concat(topCommentArticle.slice(0, 5)),
                            axis: topCommentArticleAxis,
                            axisShow: topCommentArticleAxis.slice(0, 5),
                            currentPage: 0,

                        },
                        isLoaded: true,
                    },
                        () => {
                            this.renderChart()
                        })

                } else {
                    this.setState({
                        chartDaily: {
                            column1: dailyBrowse,
                            column1Show: ["Browse"].concat(dailyBrowse),
                            column2: dailyComment,
                            column2Show: ["Comment"].concat(dailyComment),
                            axis: dailyBrowseAxis,
                            axisShow: dailyBrowseAxis,
                            currentPage: 0,
                        },
                        chartTopBrowse: {
                            column1: topBrowseArticle,
                            column1Show: ["Browse"].concat(topBrowseArticle.slice(0, 5)),
                            axis: topBrowseArticleAxis,
                            axisShow: topBrowseArticleAxis.slice(0, 5),
                            currentPage: 0,
                        },
                        chartTopComment: {
                            column1: topCommentArticle,
                            column1Show: ["Comment"].concat(topCommentArticle.slice(0, 5)),
                            axis: topCommentArticleAxis,
                            axisShow: topCommentArticleAxis.slice(0, 5),
                            currentPage: 0,

                        },
                        isLoaded: true,
                    },
                        () => {
                            this.renderChart()
                        })
                }

            })
    }


    renderChart() {
        c3.generate({
            bindto: "#chart1",

            data: {
                x: 'x',
                columns: [['x'].concat(this.state.chartDaily.axisShow), this.state.chartDaily.column1Show, this.state.chartDaily.column2Show],
            },
            axis: {
                x: {
                    label: {
                        text: 'Date',
                        position: 'outer-center',
                    },
                    type: 'timeseries',
                    categories: this.state.chartDaily.axisShow,

                },
                y: {
                    label: {
                        text: 'Times',
                        position: 'outer-middle'
                    },
                    min: 0,
                    padding: {
                        top: 0,
                        bottom: 0
                    }
                }
            },
        });
        c3.generate({
            bindto: "#chart2",
            data: {
                columns: [
                    this.state.chartTopBrowse.column1Show
                ],
                type: 'bar'
            },
            axis: {
                x: {
                    label: {
                        text: '',
                        position: 'outer-center',
                    },
                    type: 'category',
                    categories: this.state.chartTopBrowse.axisShow,
                    tick: {
                        centered: true
                    }
                },
                y: {
                    label: {
                        text: 'Times',
                        position: 'outer-middle'
                    },
                    min: 0,
                    padding: {
                        top: 0,
                        bottom: 0
                    }
                }
            },
            legend: {
                show: false
            }
        });

        c3.generate({
            bindto: "#chart3",
            data: {
                columns: [
                    this.state.chartTopComment.column1Show
                ],
                type: 'bar'
            },
            axis: {
                x: {
                    label: {
                        text: '',
                        position: 'outer-center',
                    },
                    type: 'category',
                    categories: this.state.chartTopComment.axisShow,
                    tick: {
                        centered: true
                    }
                },
                y: {
                    label: {
                        text: 'Times',
                        position: 'outer-middle'
                    },
                    min: 0,
                    padding: {
                        top: 0,
                        bottom: 0
                    }
                }
            },
            legend: {
                show: false
            }
        });
    }

    handleDailyChartClick(page) {
        let currentPage = this.state.chartDaily.currentPage
        let newCurrentPage = currentPage + (page * 7)
        console.log(currentPage)
        console.log(newCurrentPage)
        if (newCurrentPage >= this.state.chartDaily.column1.length) {
            console.log("case 1")
            this.setState((prevState) => ({
                ...prevState,
                chartDaily: {
                    ...prevState.chartDaily,
                    column1Show: ["Browse"].concat(this.state.chartDaily.column1.slice(-7)),
                    column2Show: ["Comment"].concat(this.state.chartDaily.column2.slice(-7)),
                    axisShow: this.state.chartDaily.axis.slice(-7),
                }
            }))
            return
        }
        if (newCurrentPage <= 0) {
            console.log("case 2")
            this.setState((prevState) => ({
                ...prevState,
                chartDaily: {
                    ...prevState.chartDaily,
                    column1Show: ["Browse"].concat(this.state.chartDaily.column1.slice(0, 7)),
                    column2Show: ["Comment"].concat(this.state.chartDaily.column2.slice(0, 7)),
                    axisShow: this.state.chartDaily.axis.slice(0, 7),
                }
            }))
            return
        }
        if (newCurrentPage > currentPage) {
            console.log("case 3")
            this.setState((prevState) => ({
                ...prevState,
                chartDaily: {
                    ...prevState.chartDaily,
                    column1Show: ["Browse"].concat(this.state.chartDaily.column1.slice(currentPage, newCurrentPage)),
                    column2Show: ["Comment"].concat(this.state.chartDaily.column2.slice(currentPage, newCurrentPage)),
                    axisShow: this.state.chartDaily.axis.slice(currentPage, newCurrentPage),
                    currentPage: newCurrentPage
                }
            }))
            return
        }
        if (newCurrentPage < currentPage) {
            console.log("case 4")
            this.setState((prevState) => ({
                ...prevState,
                chartDaily: {
                    ...prevState.chartDaily,
                    column1Show: ["Browse"].concat(this.state.chartDaily.column1.slice(newCurrentPage, currentPage)),
                    column2Show: ["Comment"].concat(this.state.chartDaily.column2.slice(newCurrentPage, currentPage)),
                    axisShow: this.state.chartDaily.axis.slice(newCurrentPage, currentPage),
                    currentPage: newCurrentPage
                }
            }))
            return
        }
    }

    handleTopBrowseChartClick(page) {
        let currentPage = this.state.chartTopBrowse.currentPage
        let newCurrentPage = currentPage + (page * 5)
        if (newCurrentPage >= this.state.chartTopBrowse.column1.length) {
            this.setState((prevState) => ({
                ...prevState,
                chartTopBrowse: {
                    ...prevState.chartTopBrowse,
                    column1Show: this.state.chartTopBrowse.column1.slice(-5),
                    axisShow: this.state.chartTopBrowse.axis.slice(-5),
                }
            }))
            return
        }
        if (newCurrentPage <= 0) {
            this.setState((prevState) => ({
                ...prevState,
                chartTopBrowse: {
                    ...prevState.chartTopBrowse,
                    column1Show: this.state.chartTopBrowse.column1.slice(0, 5),
                    axisShow: this.state.chartTopBrowse.axis.slice(0, 5),
                }
            }))
            return
        }
        if (newCurrentPage > currentPage) {
            this.setState((prevState) => ({
                ...prevState,
                chartTopBrowse: {
                    ...prevState.chartTopBrowse,
                    column1Show: this.state.chartTopBrowse.column1.slice(currentPage, newCurrentPage),
                    axisShow: this.state.chartTopBrowse.axis.slice(currentPage, newCurrentPage),
                    currentPage: newCurrentPage
                }
            }))
            return
        }
        if (newCurrentPage < currentPage) {
            this.setState((prevState) => ({
                ...prevState,
                chartTopBrowse: {
                    ...prevState.chartTopBrowse,
                    column1Show: this.state.chartTopBrowse.column1.slice(newCurrentPage, currentPage),
                    axisShow: this.state.chartTopBrowse.axis.slice(newCurrentPage, currentPage),
                    currentPage: newCurrentPage
                }
            }))
            return
        }
    }

    handleTopCommentChartClick(page) {
        let currentPage = this.state.chartTopComment.currentPage
        let newCurrentPage = currentPage + (page * 5)
        if (newCurrentPage >= this.state.chartTopComment.column1.length) {
            this.setState((prevState) => ({
                ...prevState,
                chartTopComment: {
                    ...prevState.chartTopComment,
                    column1Show: this.state.chartTopComment.column1.slice(-5),
                    axisShow: this.state.chartTopComment.axis.slice(-5),
                }
            }))
            return
        }
        if (newCurrentPage <= 0) {
            this.setState((prevState) => ({
                ...prevState,
                chartTopComment: {
                    ...prevState.chartTopComment,
                    column1Show: this.state.chartTopComment.column1.slice(0, 5),
                    axisShow: this.state.chartTopComment.axis.slice(0, 5),
                }
            }))
            return
        }
        if (newCurrentPage > currentPage) {
            this.setState((prevState) => ({
                ...prevState,
                chartTopComment: {
                    ...prevState.chartTopComment,
                    column1Show: this.state.chartTopComment.column1.slice(currentPage, newCurrentPage),
                    axisShow: this.state.chartTopComment.axis.slice(currentPage, newCurrentPage),
                    currentPage: newCurrentPage
                }
            }))
            return
        }
        if (newCurrentPage < currentPage) {
            this.setState((prevState) => ({
                ...prevState,
                chartTopComment: {
                    ...prevState.chartTopComment,
                    column1Show: this.state.chartTopComment.column1.slice(newCurrentPage, currentPage),
                    axisShow: this.state.chartTopComment.axis.slice(newCurrentPage, currentPage),
                    currentPage: newCurrentPage
                }
            }))
            return
        }
    }


    render() {

        let { chartData, isLoaded, error, isManager } = this.state
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
                                <h1 className="h2">Statistical panel</h1>
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
                                <h1 className="h2">Statistical panel</h1>
                            </div>

                            <div className='container'>
                                <div className='row'>
                                    <div className='col-12 p-2'>
                                        <div className='card fadeIn box-shadow p-2'>
                                            <p className="text-dark" href="#">Browse and comment table</p>
                                            <div id="chart1"></div>
                                            <div class="d-flex justify-content-end">
                                                <div className="btn btn-outline-secondary m-1" onClick={() => { this.handleDailyChartClick(-1) }}>&#8249;</div>
                                                <div className="btn btn-outline-secondary m-1" onClick={() => { this.handleDailyChartClick(1) }}>&#8250;</div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6 p-2'>
                                        <div className='card fadeIn box-shadow p-2'>
                                            <p className="text-dark" href="#">Most browse articles</p>
                                            <div id="chart2"></div>
                                            <div class="d-flex justify-content-center">
                                                <div className="btn btn-outline-secondary m-1" onClick={() => { this.handleTopBrowseChartClick(-1) }}>&#8249;</div>
                                                <div className="btn btn-outline-secondary m-1" onClick={() => { this.handleTopBrowseChartClick(1) }}>&#8250;</div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className='col-6 p-2'>
                                        <div className='card fadeIn box-shadow p-2'>
                                            <p className="text-dark" href="#">Most comment articles</p>
                                            <div id="chart3"></div>
                                            <div class="d-flex justify-content-center">
                                                <div className="btn btn-outline-secondary m-1" onClick={() => { this.handleTopCommentChartClick(-1) }}>&#8249;</div>
                                                <div className="btn btn-outline-secondary m-1" onClick={() => { this.handleTopCommentChartClick(1) }}>&#8250;</div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </main>
                    </div>

                </div>
            </div>

        );
    }
}