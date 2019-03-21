import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
export default class TaskList extends Component {

  state = {
      tasks: [],
      err: ""
  }  

  componentDidMount() {
      debugger
    axios({
        url: `${config.api}/tasks`,
        withCredentials: true,
    })
    .then((response)=> {
        this.setState({tasks: response.data.tasks})
    })
    .catch((err)=> {
        this.setState({err: err})
    })
  }
  
  remove

  render() {
    debugger
    return (
      <div  className="container" style={{width: '60%', float:"left"}}>
          {this.state.tasks.map((task)=> 
            <div className="tile is-ancestor">
                <div className="tile is-child box">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <option></option>
                </div>
            </div>    
          )}
          {this.state.err?
              this.state.err.message:
              <></>
          }
      </div>
    )
  }
}
