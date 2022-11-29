import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Component } from 'react/cjs/react.production.min';
import Header from './components/ui-components/Header';
import Navbar from './components/ui-components/Navbar';
import Footer from './components/ui-components/Footer';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Search from './components/Search';
import './App.css';
import Signin from './components/Signin';
import Work from './components/Work';
import Signup from './components/Signup';
import ManageArticles from './components/ManageArticles';
import ManageComments from './components/ManageComments';
import ManagePanel from './components/ManagePanel';
import TimelinePage from './components/TimelinePage';
import EditArticle from './components/EditArticle';
import ChatDot from './components/chat-components/ChatDot';
import BackUpPanel from './components/backup-components/BackUpPanel';



export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      memberID: "",
      jwt: "",
      email: "",
      isManager: false,
      API_IP: process.env.REACT_APP_API_ADDRESS,
    }
    this.handleJWTChange(this.handleJWTChange.bind(this))
    this.handleIsManagerChange(this.handleIsManagerChange.bind(this))
    this.handleEmailChange(this.handleEmailChange.bind(this))
    this.handleMemberID(this.handleMemberID.bind(this))
    this.logout(this.logout.bind(this))
  }

  componentDidMount() {
    let t = window.localStorage.getItem("jwt")
    if (t) {
      if (this.state.jwt === "") {
        this.setState({ jwt: JSON.parse(t) })
      }
    }
    let em = window.localStorage.getItem("email")
    if (em) {
      if (this.state.email === "") {
        this.setState({ email: JSON.parse(em) })
      }
    }
    let i = window.localStorage.getItem("memberID")
    if (i) {
      if (this.state.email === "") {
        this.setState({ email: JSON.parse(i) })
      }
    }
    let is = window.localStorage.getItem("isManager")
    if (is) {
      console.log("manager")
      if (JSON.parse(is) == 1) {
        this.setState({ isManager: 1 })
      }
    }
  }

  componentWillUnmount = () => {
    window.localStorage.removeItem("searchPage")
  }



  handleJWTChange = (jwt) => {
    this.setState({ jwt: jwt })
  }

  handleIsManagerChange = (isManager) => {
    this.setState({ isManager: isManager })
  }

  handleMemberID = (memberID) => {
    this.setState({ memberID: memberID })
  }

  handleEmailChange = (email) => {
    this.setState({ email: email })
  }




  logout = () => {
    console.log("do log out from header")
    this.setState({ jwt: "" })
    this.setState({ memberID: "" })
    this.setState({ isManager: false })
    window.localStorage.removeItem("jwt")
    window.localStorage.removeItem("memberID")
    window.localStorage.removeItem("isManager")
    window.localStorage.removeItem("email")

  }


  render() {
    return (
      <Router>
        <ChatDot />
        <div className="App">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
            integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
            crossOrigin="anonymous"></link>
          <link href="https://fonts.googleapis.com/css?family=Playfair+Display:700,900" rel="stylesheet"></link>
          <div className='container'>
            <Header isManager={this.state.isManager} jwt={this.state.jwt} logout={this.logout} API_IP={this.state.API_IP} />
            <Navbar />
          </div>
          <Switch>

            <Route path="/work/:id" component={(props) => <Work {...props} memberID={this.state.memberID} email={this.state.email} jwt={this.state.jwt} API_IP={this.state.API_IP} refresh={this.state.RefreshDOM} />}>
            </Route>

            <Route path="/search/:value" component={Search} key={this.state.current} API_IP={this.state.API_IP}>
            </Route>

            <Route path="/search" component={Search} API_IP={this.state.API_IP}>
            </Route>

            <Route path="/edit/article/:id" component={(props) => <EditArticle {...props} isManager={this.state.isManager} jwt={this.state.jwt} API_IP={this.state.API_IP} />}>
            </Route>

            <Route path="/edit/article" component={(props) => <EditArticle {...props} isManager={this.state.isManager} jwt={this.state.jwt} API_IP={this.state.API_IP} />}>
            </Route>

            <Route path="/manage/comments" component={(props) => <ManageComments {...props} isManager={this.state.isManager} jwt={this.state.jwt} API_IP={this.state.API_IP} />}>
            </Route>

            <Route path="/manage/articles" component={(props) => <ManageArticles {...props} isManager={this.state.isManager} jwt={this.state.jwt} API_IP={this.state.API_IP} />}>
            </Route>

            <Route path="/manage/backup" component={(props) => <BackUpPanel {...props} isManager={this.state.isManager} jwt={this.state.jwt} API_IP={this.state.API_IP} />}>
            </Route>

            <Route path="/manage" component={(props) => <ManagePanel {...props} isManager={this.state.isManager} jwt={this.state.jwt} API_IP={this.state.API_IP} />}>
            </Route>

            <Route path="/signin" component={(props) => <Signin {...props} handleJWTChange={this.handleJWTChange} handleIsManagerChange={this.handleIsManagerChange} handleMemberID={this.handleMemberID} API_IP={this.state.API_IP} handleEmailChange={this.handleEmailChange} />}>
            </Route>

            <Route path="/signup" component={Signup} API_IP={this.state.API_IP}>
            </Route>

            <Route path="/timeline" component={TimelinePage}>
            </Route>

            <Route path="/" component={Home}>
            </Route>

            <Route path="*" component={NotFound}>
            </Route>

            <ChatDot />
          </Switch>

          <Footer refresh={this.state.refresh} />

        </div>
      </Router >

    )
  }
}

