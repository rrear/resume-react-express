import React from "react"
import { Component } from "react"
import ResumeService from "../service/ResumeService"


class Summary extends Component {
    service = ResumeService;

    constructor(props) {
        super(props)
        this.state = {
            "summary": {intro:"", points:[]}
        }
    }

    componentDidMount() {
        ResumeService.getSummary().then(summary => this.setState({"summary": summary}));
    }

    render() {
        const { intro, points } = this.state.summary;
        return (<span>
            <div className="desc">{intro}</div>
            {(points.length) ?
            <ul>
                {points.map(
                        (point, i) =>
                        <li key={i}>{point}</li>
                        )}
            </ul>
            :
                <div />
            }
            </span>
        )
    }
};

export default Summary;