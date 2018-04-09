import React from "react"
import { Component } from "react"
import ResumeService from "../service/ResumeService"


export class Expertise extends Component {
    render() {
        const { name, weight, points, x, max } = this.props;
        let size = parseInt(weight) * 2 + 12;
        size = 18;
        return (<span>
            <div className="point-box" style={{'fontSize': size}}
            >{name}
            </div>
            {points.join(", ")}
            </span>
        )
    }
}

class ExpertiseList extends Component {
    service = ResumeService;

    constructor(props) {
        super(props)
        this.state = {
            "list": []
        }
    }

    componentDidMount() {
        ResumeService.getExpertise().then(list => this.setState({"list": list}));
    }

    render() {
        const { list } = this.state;
        return (
            <div className="skill-list">
                <h2>Expertise</h2>
                {(list.length) ?
                    list.map(
                        (skill, i) =>
                        <Expertise key={i}
                            name={skill.what}
                            weight={parseInt(skill.weight || 1)}
                            points={skill.points}
                            x={i}
                            max={list.length}
                        />
                    ):
                    <div>No Expertise listed</div>
                }
            </div>
        )
    }
};

export default ExpertiseList;