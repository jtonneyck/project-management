import React, { Component } from 'react';
import axios from 'axios';
import config from '../config'
class AddProject extends Component {
  constructor(props){
      super(props);
      this.state = { title: "", description: "" };
  }
   
  handleSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    axios({
      method: "Post",
      url: `${config.api}/projects`, 
      data: { title, description }
    })
    .then( () => {
        this.props.history.push("/project-list");
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="field">
            <div className="label">Title</div>
            <div className="control">
                <input className="input" required onChange={this.handleChange}  type="text" name="title" placeholder="title" value={this.state.title}/>
            </div>
        </div>
        <div className="field">
            <div className="label">Description</div>
            <div className="control">
                <textarea className="textarea" onChange={this.handleChange} type="text" rows="10" name="description" placeholder="description" value={this.state.description}></textarea>
            </div>
        </div>
        <div className="field">
            <div className="control">
                <input className="button" type="submit" value="Submit" />
            </div>
        </div>
    </form>
    )
  }
}

export default AddProject;