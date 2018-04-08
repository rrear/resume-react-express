class Credential {
    toString() {
        return this.name + ":" + this.password;
    }
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }
}

class Configuration {
    
    connectString(credentials) {
        const pre = 'mongodb://';
        const post ='@ds157723.mlab.com:57723/resume';
        return pre + credentials + post;
    }

    constructor() {
        this.credentials = {};
        this.credentials.READ = new Credential("user", "password");
        this.credentials.WRITE = new Credential("author", "password");
        this.dbRead = this.connectString(this.credentials.READ.toString());
        this.dbWrite = this.connectString(this.credentials.WRITE.toString());
    }
}

var config = new Configuration();

module.exports = config;