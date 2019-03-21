import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from "../config"

class ProjectList extends Component {
  constructor(){
      super();
      this.state = { listOfProjects: [] };
  }

  getAllProjects = () =>{
    debugger
    axios({
      method: "get",
      url: `${config.api}/projects`,
      withCredentials: true
    })
    .then(responseFromApi => {
      debugger
      this.setState({
        listOfProjects: responseFromApi.data
      })
    })
  }

  componentDidMount() {
    this.getAllProjects();
  }

  render(){
    return(
        <div className="container" style={{width: '60%', float:"left"}}>
          { this.state.listOfProjects.map( project => {
            return (
              <div key={project._id}>
                <div className="tile is-ancestor">
                  <div className="tile is-child box">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <Link className="button" to={`/projects/${project._id}`}>
                      <div className="tile">
                          <p>Project details</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )})
          }
        </div>
    )
  }
}

export default ProjectList;