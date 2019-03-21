
import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route, Redirect } from 'react-router-dom';
import config from '../config.json'
import AddTask from "./AddTask"


class ProjectDetails extends Component {

  state = {
    title: "",
    desscription: "",
    tasks: [],
    addTaskClicked: false
  }

  componentDidMount(){
    this.getSingleProject();
  }

  getSingleProject = () => {
      const id = this.props.match.params.id;
      axios({
        url: `${config.api}/projects/${id}`,
        withCredentials: true,
        method: "Get"
      })
      .then( responseFromApi =>{
          const theProject = responseFromApi.data;
          this.setState(theProject);
      })
      .catch((err)=>{
          console.log(err)
      })
  }

  toggleAddTask = ()=> {
    debugger
    this.setState({addTaskClicked: !this.state.addTaskClicked})
  }

  update = ()=> {
    this.getSingleProject()
  }

  render(){
    debugger
    return(
      <div className="section">
      <Link className="button" to='/project-list'>Back to projects</Link>
      <div className="tile is-ancestor box level">
        <div className="level-left">
          <h1>{this.state.title}</h1>
          <p>{this.state.description}</p>
        </div>

        <div className="level-right">
          {this.state.addTaskClicked?   
            <Link onClick={this.toggleAddTask} className="button" to={this.props.match.url}> Close </Link>:
            <Link onClick={this.toggleAddTask} className="button" to={`${this.props.match.url}/add-task/${this.props.match.params.id}`}>Add task</Link>
          }
        </div>
      </div>
      <Route path={`${this.props.match.path}/add-task/:projectId`} render={(props)=> <AddTask update={this.update} {...props}  />} />
      
      <div className="column is-full">
        {this.state.tasks.map((task)=> 
                <div className="tile is-child box">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <div className="tile">
                    <p>Assigned to: <Link to={`/users/${task.user._id}`}>{task.user.username}</Link></p>
                  </div>
                </div>
        )}
        </div>

      </div>
    )
  }
}

export default ProjectDetails;