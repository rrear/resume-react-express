import { Component } from "react"
import React from "react"
import ResumeService from "../service/ResumeService"

export default class Name extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": "Loading"
        }
    }
    componentDidMount() {
        ResumeService.getName().then(name => {
            this.setState({"name": name});
        });
        console.log("mounted", this.state.name);
    }
    render() {
        console.log("render", this.state.name);
        return (
            <h1 className="main-title">
                {this.state.name}
            </h1>
        )
    }
}