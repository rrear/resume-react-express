import React from "react"
import { Component } from "react"
import ResumeService from "../service/ResumeService"


export class Job extends Component {
    render() {
        const { name, title, desc, years, notes } = this.props;
        return (
        // <tbody><tr>
        //     <td colspan="8"><h4 className="years">{years} - {title}</h4></td>
        //     </tr>
        //     <tr><td />
        //     <td><strong className="institution" nowrap >{name}</strong></td>
        //     <td><div className="desc">{desc}</div></td>
        //     {(notes.length) ?
        //     <td><ul>
        //         {notes.map(
        //                 (point, i) =>
        //                 <li key={i}>{point}</li>
        //                 )}
        //     </ul></td>
        //     :
        //             <td />
        //     }
        //     </tr>
        //     </tbody>
        // )
        <span>
            <h4 className="years">{years} - {title}</h4>
            <strong className="institution">{name}</strong>
            <div className="desc">{desc}</div>
            {(notes.length) ?
            <ul>
                {notes.map(
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
}

class JobList extends Component {
    service = ResumeService;

    constructor(props) {
        super(props)
        this.state = {
            "list": []
        }
    }

    componentDidMount() {
        ResumeService.getExperience().then(list => this.setState({"list": list}));
    }

    render() {
        const { list } = this.state;
        return (
        //     <table className="career-list">
        //         <tr><th>Work Experience</th></tr>
        //         {(list.length) ?
        //             list.map(
        //                 (career, i) =>
        //                 <Job key={i}
        //                     name={career.where}
        //                     title={career.what}
        //                     desc={career.how}
        //                     years={career.when}
        //                     notes={career.points}
        //                 />
        //             ):
        //             <td><h3>No Work Experience listed</h3></td>
        //         }
        //     </table>
        // )

            <span className="career-list">
                <h2>Work Experience</h2>
                {(list.length) ?
                    list.map(
                        (career, i) =>
                        <Job key={i}
                            name={career.where}
                            title={career.what}
                            desc={career.how}
                            years={career.when}
                            notes={career.points}
                        />
                    ):
                    <h3>No Work Experience listed</h3>
                }
            </span>
        )
    }
};

export default JobList;