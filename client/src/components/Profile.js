import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.json'
import loading from "../images/200.gif"

class Profile extends Component {
    state = {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        profilePic: ""
    }

    componentDidMount = ()=> {
        
        axios({
               method: "get",
               url: `${config.api}/users/profile`, 
               withCredentials: true,
            })
            .then((response)=> {
                debugger
                this.setState({
                    username: response.data.username,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    profilePic: response.data.profilePicture
                })
            })
            .catch((err)=> {
                this.props.history.push("/login")
            })
    }

    render() {
        return(
            <div className="container">
            { !this.state.username? <img src={loading} alt="loading" />:
                <>
                <h1>Username:   {this.state.username}</h1>
                <h3>Firstname:  {this.state.firstname}</h3>
                <h3>Lastname:   {this.state.lastname}</h3>
                <img src={this.state.profilePic} alt="profile"/>
                </>
            }
            </div>
        )
    }
}

export default Profile


export class EditProfile extends Component {

    constructor(props) {
        super(props)
        this.state = props.user
    }
    state = {
        firstname: "",
        lastname: "",
        username: "",
        password: ""
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmit = (event)=> {
        event.preventDefault()
        let newUser = this.state
        axios({
                method: "post",
                url: `${config.api}/users`, 
                data: newUser,
                withCredentials: true,
            })
            .then((response)=> {
                debugger
                console.log("Success")
                this.props.loggedIn(true)
            })
            .catch((err)=> {
                console.log("Error error")
            })
    }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
               <div className="field">
                    <div className="label">Firstname</div>
                    <div className="control">
                        <input className="input" onChange={this.handleChange} type="text" name="firstname" placeholder="firstname" value={this.state.firstname}/>
                    </div>
               </div>
               <div className="field">
                   <div className="label">Lastname</div>
                    <div className="control">
                        <input className="input" onChange={this.handleChange} type="text" name="lastname" placeholder="lastname" value={this.state.lastname} />
                    </div>
               </div>
               <div className="field">
                   <div className="label">Username</div>
                    <div className="control">
                        <input className="input" onChange={this.handleChange} type="text" name="username" placeholder="username" value={this.state.username}/>
                    </div>
               </div>
               <div className="field">
                   <div className="label">Password</div>
                    <div className="control">
                        <input className="input" placeholder="password" onChange={this.handleChange} name="password" type="password" value={this.state.password}/>
                    </div>
               </div>
               <div className="field">
                    <div className="control">
                        <input className="button" type="submit" value="Submit" />
                    </div>
                </div>
            </form>
      </div>
    )
  }
}
