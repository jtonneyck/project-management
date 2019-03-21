import React from "react"
import {Link} from "react-router-dom"
import Logout from "./Logout"
export default (props) => (

<nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src={props.user.profilePicture} width="112" height="28"/>
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  </div>

  {props.loggedIn?
    <NavAuthenticated {...props} />:
    <NavUnauthenticated {...props} />
  }
</nav>
)

const NavUnauthenticated = (props)=> (
  <div id="navbarBasicExample" className="navbar-menu">

    <div className="navbar-start">

    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
            <Link className="button is-primary" to="/login"><strong>Login</strong></Link>
            <Link className="button is-light" to="/signup"><strong>Signup</strong></Link>
        </div>
      </div>
    </div>
  </div>
)

const NavAuthenticated = (props)=> (
  <div id="navbarBasicExample" className="navbar-menu">

    <div className="navbar-start">
    
      <Link className="navbar-item" to="/secret">Secret</Link>

      <Link className="navbar-item" to="/profile">Profile</Link>

      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          More
        </a>

        <div className="navbar-dropdown">
          <a className="navbar-item">
            About
          </a>
          <Link className="navbar-item" to="/add-project"><strong>Add Project</strong></Link>
          <Link className="navbar-item" to="/project-list"><strong>Project List</strong></Link>

          <hr className="navbar-divider"/>
          <a className="navbar-item">
          <Link className="navbar-item" to="/my-tasks"><strong>My Tasks</strong></Link>
          </a>
        </div>
    </div>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
            <Link className="navbar-item" to="/profile"><strong>{props.user.username}</strong></Link>
            <Logout logout={props.logout} />
        </div>
      </div>
    </div>
  </div>
)
