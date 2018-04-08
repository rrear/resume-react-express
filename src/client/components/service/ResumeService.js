import fetch from 'isomorphic-fetch'

import blank from '../model/ResumeBlank'

const url = 'http://localhost:3000/resume/';

class ResumeService {

    static myInstance = null;

    static getInstance() {
        if(ResumeService.myInstance == null) {
            ResumeService.myInstance = new ResumeService({name: "rodney.rear"});
        }
        return ResumeService.myInstance;
    }

    constructor(props) {
        if(ResumeService.myInstance) {
            return ResumeService.getInstance();
        } else {
            this.state = {
                body: blank,
                loading:false
            }
            this.getBody = this.getBody.bind(this);
            this.getId = this.getId.bind(this);
            this.getName = this.getName.bind(this);
            this.getTitle = this.getTitle.bind(this);
            this.getEmail = this.getEmail.bind(this);
            this.getSummary = this.getSummary.bind(this);
            this.getEducation = this.getEducation.bind(this);
            this.getExperience = this.getExperience.bind(this);
            this.getExpertise = this.getExpertise.bind(this);
            this.getSkills = this.getSkills.bind(this);
            this.loadContent = this.loadContent.bind(this);
            this.setState = this.setState.bind(this);
        }
    }
    setState(obj) {
        for(let o in obj) {
            this.state[o] = obj[o];
        }
    }

    loadContent() {
        if(this.state.loading) {
            return this.loadPromise;
        } else if(this.loadPromise) {
            return this.loadPromise;
        } else {
            this.setState({loading:true});
            this.loadPromise = fetch(url).then(response => response.json())
                .then(json => {
                    return json[0]
                })
                .then(body => {
                    this.setState({
                        body: body,
                        loading: false
                    });
                    return body;
                }
            );
            return this.loadPromise;
        }
    }

    getBody() {
        return this.loadContent().then(() => this.state.body);
    }

    getId() {
        return this.getBody().then(body => body.id);
    }
    getName() {
        return this.getBody().then(body => body.name);
    }
    getTitle() {
        return this.getBody().then(body => body.title);
    }
    getEmail() {
        return this.getBody().then(body => body.email);
    }
    getSummary() {
        return this.getBody().then(body => body.summary);
    }
    getEducation() {
        return this.getBody().then(body => body.education);
    }
    getExperience() {
        return this.getBody().then(body => body.experience);
    }
    getExpertise() {
        return this.getBody().then(body => body.expertise);
    }
    getSkills() {
        return this.getBody().then(body => body.skills);
    }

}

export default ResumeService.getInstance();