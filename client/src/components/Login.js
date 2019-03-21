import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.json'
class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    handleChange = (event) => {
        let updateInput = {}
        updateInput[event.target.name] = event.target.value
        this.setState(updateInput)
    }

    handleSubmit = (event)=> {
        event.preventDefault()
        let newUser = this.state
        axios({
               method: "post",
               url: `${config.api}/users/login`, 
               data: newUser,
               withCredentials: true,
            })
            .then((response)=> {
                let data = response.data
                this.props.loggedIn({loggedIn: true, user: data})
                this.props.history.push("/profile")
            })
            .catch((err)=> {
                this.props.history.push({ pathname: "/login", state: {message: "unauthorized"}})
            })
    }

    render() {
        return(
        <>    
            <form onSubmit={this.handleSubmit}>
               <div className="field">
                    <div className="label">Username</div>
                    <div className="control">
                        <input className="input" onChange={this.handleChange} type="text" name="username" placeholder="username" value={this.state.username}/>
                    </div>
               </div>
               <div className="field">
                   <div className="label">Password</div>
                    <div className="control">
                        <input className="input" placeholder="password" onChange={this.handleChange} name="password" type="password" placeholder="password" value={this.state.password}/>
                    </div>
               </div>
               <div className="field">
                    <div className="control">
                        <input className="button" type="submit" value="Submit" />
                    </div>
                </div>
            </form>

            <p>{this.props.location && this.props.location.state? this.props.location.state.message:""}</p>
        </>    
        )
    }
}

export default Login