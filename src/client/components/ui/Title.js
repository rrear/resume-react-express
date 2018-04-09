import { Component } from "react"
import React from "react"
import ResumeService from "../service/ResumeService"

export default class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": "Loading"
        }
    }
    componentDidMount() {
        ResumeService.getTitle().then(title => {
            this.setState({"title": title});
        });
        console.log("mounted", this.state.title);
    }
    render() {
        console.log("render", this.state.title);
        return (
            <h2 className="main-title">
                {this.state.title}
            </h2>
        )
    }
}