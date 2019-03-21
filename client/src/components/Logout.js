import React, { Component } from 'react';
import axios from "axios"
import config from "../config"
import {Redirect} from "react-router-dom"
class Logout extends Component {

    constructor(props){
        super(props)
    }
    logMeOut = ()=> {
        debugger
        axios({
            method: "GET",
            url: `${config.api}/users/logout`,
            withCredentials: true,
        })
        .then((response)=> {
            this.props.logout()
        })
        .catch((error)=> {
            console.log(error)
        })
    }
    render () {
        debugger
        return (
            <>
                <button className="button is-primary" onClick={this.logMeOut}>Logout</button>
            </>
        )        
    }
}

export default Logout