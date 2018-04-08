import React from "react"
import { Component } from "react"
import ResumeService from "../service/ResumeService"


export class Education extends Component {
    render() {
        const { name, desc, years } = this.props;
        return (<tr>
            <td className="years">{years}</td>
            <td className="institution">{name}</td>
            <td className="desc">{desc}</td>
            </tr>
        )
    }
}

class EducationList extends Component {
    service = ResumeService;

    constructor(props) {
        super(props)
        this.state = {
            "list": []
        }
    }

    componentDidMount() {
        ResumeService.getEducation().then(list => this.setState({"list": list}));
    }

    render() {
        const { list } = this.state;
        return (
            <table className="education-list"><tbody>
                <tr><th>Education</th></tr>
                {(list.length) ?
                    list.map(
                        (education, i) =>
                        <Education key={i}
                            name={education.where}
                            desc={education.what}
                            years={education.when}
                        />
                    ):
                    <tr><td>Currently No Education</td></tr>
                }
            </tbody></table>
        )
    }
};

export default EducationList;