var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
const mongoose = require('mongoose');
var schema = require('./model/ResumeSchema');
var loggingSchema = require('./model/AccessLog');
var ResumeModel = mongoose.model('Resume', schema);
var LogModel = mongoose.model('AccessLog', loggingSchema);
var config = require('./config');

var mongoRead;
var mongoWrite;
console.log("dirname", __dirname);
app.use(express.static(__dirname+'./../../dist/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

{
	function getUser (userId, req, res) {
		res.set('Access-Control-Allow-Origin', 'http://' + req.get('host').split(":")[0] + ":3000");
		console.log('GET: ', userId);
		ResumeModel.find({id: { $regex : new RegExp(userId, "i") }}, (err, content) => {
			console.log('FOUND: ', userId);
			res.send(content);
		});
	}
	function getAll (req, res) {
		console.log(JSON.stringify(req.headers));
		res.set('Access-Control-Allow-Origin', 'http://' + req.get('host').split(":")[0] + ":3000");
		ResumeModel.find({}, (err, content) => {
			if(err) {
				console.log(err);
				res.send(500);
			} else {
				console.log('FOUND: ', content);
				res.send(content);
			}
		});
	}

	async function createResume(userId, req, res ) {
		console.log('POST: ', userId);
		try {
			var doc = new ResumeModel(req.body);
			doc.id = userId;
			console.log('Model: ', doc.name);
			var saved = await doc.save();
	
			console.log('saved: ', req.body);
			res.sendStatus(200);
		} catch (error) {
			if(res) res.sendStatus(500);
			return console.error(error);
		}
	}

	async function updateResume( userId, req, res ) {
		await ResumeModel.findOne({id: { $regex : new RegExp(userId, "i") }}, async (err, doc) => {
			if(err || !doc) {
				console.log("Update not possible", err || "");
				await createResume(userId, req, res).catch(err => {
					res.sendStatus(500);
				});
			} else {
				for(d in req.body) {
					console.log(d + " = " + req.body[d]);
					doc[d] = req.body[d];
				}
				console.log('Model: ', doc.name);
				var saved = await doc.save();
	
				console.log('saved: ', saved);
				res.sendStatus(200);
			}
		});
	}

	function deleteOne(userId, req, res) {
		console.log('DELETE: ', userId);
		ResumeModel.deleteOne({id: { $regex : new RegExp(userId, "i") }}, (err, content) => {
			if(err) {
				console.log(err);
				res.sendStatus(404);
			} else {
				console.log('FOUND: ', userId);
				res.sendStatus(200);
			}
		});
	}

	function deleteMany(userId, req, res) {
		console.log('DELETE: ', userId);
		ResumeModel.deleteMany({id: { $regex : new RegExp(userId, "i") }}, (err, content) => {
			if(err) {
				console.log(err);
				res.sendStatus(404);
			} else {
				console.log('FOUND: ', userId);
				res.sendStatus(200);
			}
		});
	}

	app.get('/resume/:user', (req, res) => {
		var user = req.params.user;
		getUser(user, req, res);
	});
	
	app.get('/resume', (req, res) => {
		getAll(req, res);
	});
	
	
	app.post('/resume', async (req, res) => {
		updateResume(req.body.id, req, res);
	});
	
	app.delete('/resume/:user', (req, res) => {
		var user = req.params.user;
		deleteMany(user, req, res);
	});

	app.post('/log', async(req, res) => {
		await LogModel.findOne({"id": req.body.id}, async (err, doc) => {
			if(err || !doc) {
				console.log("Update not possible", err || "");
				try {
					var doc = new LogModel(req.body);
					doc.id = userId;
					var saved = await doc.save();
					console.log('saved: ', req.body);
					res.sendStatus(200);
				} catch (error) {
					if(res) res.sendStatus(500);
					return console.error(error);
				}
			} else {
				doc.count ++;
				var saved = await doc.save();
				console.log('saved: ', saved);
				res.sendStatus(200);
			}
		});
	})

	mongoose.connect(config.dbWrite, (err) => {
		console.log('mongo author db: ', err || 'connected');
	});

}



var server = http.listen(3000, () => {
	console.log('server is listening on port', server.address().port)
});