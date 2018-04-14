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

//Get all vessels from Database
let vessels = await cVessels.find().toArray();
console.log(`All vessels quantity: ${vessels.length}`);

for (var i = 0; i < vessels.length; i++) {
  var boat_length = vessels[i].length;
  var boat_width = vessels[i].width;

  //get latest vessel position from positions collection
  // How to get all positions sorted by ascendant RecvTime of the previous vessel
  let positions = await cPositions.find({ MMSI: vessels[i].MMSI }).sort({ RecvTime: 1 }).toArray();
  //Get latest position
  let lastPosition = _.last(positions);
  //get latitude & longitude of vessel
  var boat_lat = ;
  var boat_long = ;

  //plot vessel on map

}
