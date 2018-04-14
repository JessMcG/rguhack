var express = require('express'); // Express web server framework
var app = express();
app.use(express.static(__dirname + '/public'));

const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');
const moment = require('moment');

//using code from index.js to initialise database connection
const client = await MongoClient.connect('mongodb://hackuser:hackuser@csdm-mongodb.rgu.ac.uk/hackais');
const db = client.db('hackais');
const cVessels = db.collection('vessels');
const cPositions = db.collection('positions');
const cTowns = db.collection('towns');
