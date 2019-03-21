import React, {Component} from "react"
import axios from "axios"
import config from "../config"
export default class AddTask extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
      }

    state = {
        users: [],
        title: "",
        description: "",
        userId: "",
        error: null
    }
    handleSubmit = (e)=> {
        e.preventDefault()
        debugger

        axios({
            method: "post",
            url: `${config.api}/tasks`,
            data: {
                title: this.state.title,
                description: this.state.description,
                projectId: this.props.match.params.projectId,
                userId: this.state.userId
            },
            withCredentials: true
        })
        .then((response)=> {
            this.props.update()
        })
        .catch((error)=> {
            this.setState({error})
        })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    componentDidMount(){
        axios({
            method: "get",
            url: `${config.api}/users`,
            withCredentials: true
        })
        .then((response)=> {
            this.setState({users: response.data, userId: response.data[0]._id})
        })
        .catch((error)=> {
            this.setState({error})
        })
    }

    render(){
        debugger    
    return (
    <div className="tile is-ancestor box ">
        <form onSubmit={this.handleSubmit}>
            <div className="field">
                    <div className="label">Title</div>
                    <div className="control">
                        <input className="input" onChange={this.handleChange} type="text" name="title" placeholder="title" value={this.state.title}/>
                    </div>
            </div>
            <div className="field">
                    <div className="label">Description</div>
                    <div className="control">
                        <input className="input" onChange={this.handleChange} type="text" name="description" placeholder="description" value={this.state.description}/>
                    </div>
            </div>
            <div className="field">
                <div className="label">Assign Task To:</div>
                    <div className="control">
                        <select className="select" onChange={this.handleChange}>
                            {this.state.users.map((user)=> 
                                <option value={user._id}>{user.username}</option>
                            )}
                        </select>
                    </div>
            </div>
            <div className="field">
                    <div className="control">
                        <input className="button" type="submit" value="Submit" />
                    </div>
                </div>
        </form>
    </div>

    )}
}