import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
const chai = require('chai');
const expect = chai.expect;
const enzyme = require('enzyme');
import 'jsdom-global/register';
import ResumeService from '../src/client/components/service/ResumeService';
import TestData from './test-data';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const mockData = () => {
    // Mock a promise object without actual callback registration.
    let promis = { 
        result: TestData, 
        then: (invoke) => { 
            promis.result = invoke(promis.result); 
            return promis;
        }
    }
    ResumeService.state = {
        body: TestData,
        loading:false
    }
    ResumeService.loadPromise = promis;
}; mockData();

describe("Service", () => {
    beforeEach(() => {
        // Mock a promise object without actual callback registration.
        mockData();
    });
    it('getBody', () => {
        let body = ResumeService.getBody().result;
        expect(body).to.equal(TestData);
    });
    
    it('getId', () => {
        let id = ResumeService.getId().result;
        expect(id).to.equal(TestData.id);
    });

    it('getName', () => {
        let name = ResumeService.getName().result;
        console.log()
        expect(name).to.equal(TestData.name);
    });

    it('getTitle', () => {
        let title = ResumeService.getTitle().result;
        expect(title).to.equal(TestData.title);
    });

    it('getEmail', () => {
        let email = ResumeService.getEmail().result;
        expect(email).to.equal(TestData.email);
    });

    it('getSummary', () => {
        let summary = ResumeService.getSummary().result;
        expect(summary).to.equal(TestData.summary);
    });

    it('getEducation', () => {
        let education = ResumeService.getEducation().result;
        expect(education).to.equal(TestData.education);
    });

    it('getExperience', () => {
        let experience = ResumeService.getExperience().result;
        expect(experience).to.equal(TestData.experience);
    });

    it('getExpertise', () => {
        let expertise = ResumeService.getExpertise().result;
        expect(expertise).to.equal(TestData.expertise);
    });

    it('getSkills', () => {
        let skills = ResumeService.getSkills().result;
        expect(skills).to.equal(TestData.skills);
    });

});

import Job from "../src/client/components/ui/Career";
import JobList from "../src/client/components/ui/Career";

import Education from "../src/client/components/ui/Education";
import SchoolList from "../src/client/components/ui/Education";

import Expertise from "../src/client/components/ui/Expertise";
import ExpertiseList from "../src/client/components/ui/Expertise";

import Skill from "../src/client/components/ui/Skillset";
import SkillList from "../src/client/components/ui/Skillset";

import Summary from "../src/client/components/ui/Summary";

import Title from "../src/client/components/ui/Title";

describe("React Pieces", () => {
    beforeEach(() => {
        // Mock a promise object without actual callback registration.
        mockData();
    });

    describe("Career", () => {
        let career = TestData.experience[0];
        let element = (<Job 
            name={career.where}
            title={career.what}
            desc={career.how}
            years={career.when}
            notes={career.points}
        />
        );
        let item = shallow(element).render();
        
        let list = shallow(
            <JobList />
        );
        it("renders", () => {
            expect(list.hasClass("career-list"));
            expect(list.contains(element));
            expect(list.text().search(item.text()) > 0);
            expect(item.text()).to.contain(career.what);
            expect(item.text()).to.contain(career.points);
        })
    });

    describe("Education", () => {
        let education = TestData.education[0];
        let element = (
            <Education 
                name={education.where}
                desc={education.what}
                years={education.when}
            />
        );
        let item = shallow(element).render();
        let list = shallow(
            <SchoolList />
        );
        it("renders", () => {
            expect(list.hasClass("education-list"));
            expect(list.contains(element));
            expect(list.text().search(item.text()) > 0);
            expect(item.text()).to.contain(education.where);
            expect(item.text()).to.contain(education.what);
            expect(item.text()).to.contain(education.when);
        })
    });

    describe("Expertise", () => {
        let skill = TestData.expertise[0];
        let element = (
            <Expertise 
                name={skill.what}
                weight={parseInt(skill.weight || 1)}
                points={skill.points}
                x={1}
                max={1}
            />
        );
        let item = shallow(element).render();
        let list = shallow(
            <ExpertiseList />
        );
        it("renders", () => {
            expect(list.hasClass("skill-list"));
            expect(list.contains(element));
            expect(list.render().text()).to.contain(item.text());
            expect(item.text()).to.contain(skill.what);
            expect(item.text()).to.contain(skill.points);
        })
    });

    describe("Skillset", () => {
        let skill = TestData.skills[0];
        let element = (
            <Skill 
                name={skill.what}
                weight={parseInt(skill.weight || 1)}
                points={skill.points}
                x={1}
                max={1}
            />
        );
        let item = shallow( element ).render();
        let list = shallow(
            <SkillList />
        );
        it("renders", () => {
            expect(list.hasClass("skill-list"));
            // console.log("skill-list", list.text());
            expect(list.contains(element));
            expect(list.render().text()).to.contain(item.text());
            expect(item.text()).to.contain(skill.what);
            expect(item.text()).to.contain(skill.points);
        })
    });

    describe("Summary", () => {
        let summary = TestData.summary;
        let item = shallow(
            <Summary
                intro="{summary.intro}"
                points="{summary.points}"
            />
        );
        it("renders", () => {
            expect(item.hasClass("desc"));
            expect(item.text()).to.contain(summary.intro);
            expect(item.text()).to.contain(summary.points);
        })
    });

    describe("Title", () => {
        let title = TestData.title;
        let item = shallow(
            <Title />
        ).render();
        it("renders", () => {
            expect(item.hasClass("main-title"));
            expect(item.html()).to.equal(title);
        })
    });
});

