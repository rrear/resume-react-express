import React from "react"
import { Component } from "react"
import ResumeService from "../service/ResumeService"


class Skill extends Component {
    render() {
        const { name, weight, points, x, max } = this.props;
        let size = parseInt(weight) * 1 + 12;
        size = points.length + 12;
        size = 18;
        return (
            <span>
                <div className="point-box" style={{'fontSize': size}}>
                {name}
                </div>
                {points.join(", ")}
            </span>
        )
    }
}

class SkillList extends Component {
    service = ResumeService;

    constructor(props) {
        super(props)
        this.state = {
            "list": []
        }
    }

    componentDidMount() {
        ResumeService.getSkills().then(list => this.setState({"list": list}));
    }

    render() {
        const { list } = this.state;
        return (
            <span className="career-list">
                <h2>Skills</h2>
                {(list.length) ?
                    list.map(
                        (skill, i) =>
                        <Skill key={i}
                            name={skill.what}
                            weight={parseInt(skill.weight || 1)}
                            points={skill.points}
                            x={i}
                            max={list.length}
                        />
                    ):
                    <div>No Skills listed</div>
                }
            </span>
        )
    }
};

export default SkillList;