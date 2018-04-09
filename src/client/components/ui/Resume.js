import React, { Component } from "react"
import Name from "./Name"
import Title from "./Title"
import Summary from './Summary'
import SkillList from './Skillset'
import ExpertiseList from './Expertise'
import EducationList from './Education'
import JobList from './Career'

export default class ResumeLongForm extends Component {
    render() {
        return (
            <div>
                <Name />
                <Title />
                <Summary />
                <SkillList />
                <ExpertiseList />
                <EducationList />
                <JobList />
            </div>
        )
    }
}