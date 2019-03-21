import React, { Component } from 'react';
import Signup from "./components/Signup"
import Login from "./components/Login"
import Profile from "./components/Profile"
import AddProject from "./components/AddProject"
import ProjectList from "./components/ProjectList"
import {Switch, Route, Link, Redirect} from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import TaskList from "./components/TaskList"
import LandingPage from "./components/LandingPage"
import "bulma"
import Nav from "./components/Nav"
import ProjectDetails from './components/ProjectDetails';

class App extends Component {

  state = {
    loggedIn: false,
    user: {}
  }

  loggedIn = (loginState) => {
    const {loggedIn, user} = loginState
    this.setState({loggedIn: loggedIn, user: user})
    localStorage.setItem("state", JSON.stringify(loginState))
  }

  logout = ()=> {
    debugger
    this.setState({user: {}, loggedIn: false})
    localStorage.setItem("state", "{}")
  }

  componentDidMount() {
    this.setState(JSON.parse(localStorage.getItem("state")))
  }

  render() {
    return (
      <div className="container">
        <section className="section">
          <div className="container">
            <Nav {...this.state} logout={this.logout} />
          </div>
        </section>

        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" render={(props)=> <Login {...props} loggedIn={this.loggedIn}/>} />
          <Route path="/signup" render={(props)=> <Signup {...props} loggedIn={this.loggedIn}/>} />
          <PrivateRoute path="/profile" component={Profile} loggedIn={this.state.loggedIn}/>
          <PrivateRoute path="/secret" component={SuperSecret} loggedIn={this.state.loggedIn}/>
          <PrivateRoute path="/my-tasks" component={TaskList} loggedIn={this.state.loggedIn}/>
          <PrivateRoute path="/add-project" component={AddProject} loggedIn={this.state.loggedIn}/>
          <PrivateRoute path="/project-list" component={ProjectList} loggedIn={this.state.loggedIn}/>
          <PrivateRoute path="/projects/:id" component={ProjectDetails} loggedIn={this.state.loggedIn}/>
        </Switch>

      </div>
    );
  }
}

export default App;


const SuperSecret = (props) => <h1>Ssssst</h1>