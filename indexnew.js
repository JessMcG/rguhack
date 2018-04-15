const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');
const moment = require('moment');
const url = 'mongodb://hackuser:hackuser@csdm-mongodb.rgu.ac.uk/hackais';


// Thanks to https://stackoverflow.com/a/21623206
// Distance returned is in m
function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 12742000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

// a wrapper to facilitate usage with [lng, lat] locations
function distanceLocLoc(loc1, loc2) {
    return distance(loc1[1], loc1[0], loc2[1], loc2[0]);
}

MongoClient.connect(url, function(err, database){
  if(err) throw err;
  var db = database;

  const cVessels = db.collection('vessels');
  const cPositions = db.collection('positions');
  const cTowns = db.collection('towns');

});
    // lot of lines just to connect to a mongo database
    //const client = MongoClient.connect('mongodb://hackuser:hackuser@csdm-mongodb.rgu.ac.uk/hackais');
    //const db = client.database('hackais');


    // How to get all vessels
    var vessels = cVessels.find().toArray();
    console.log("All vessels quantity: "+vessels.length);
    //console.log(vessels);

    // How to get all vessels where the description includes "supply"
    var vesselsSupply = cVessels.find({ description: /supply/igm }).toArray();
    console.log("Supply vessels quantity:" + vesselsSupply.length);

    // How to get one specific vessel where the MMSI is 235076082
    var vessel = cVessels.findOne({ MMSI: 235076082 });
    console.log("Supply vessel Name: "+vessel.Name);
    console.log(vessel);

    // How to get all positions sorted by ascendant RecvTime of the previous vessel
    var positions = cPositions.find({ MMSI: vessel.MMSI }).sort({ RecvTime: 1 }).toArray();
    var firstPosition = _.first(positions);
    var firstRecvTime = moment(firstPosition.RecvTime).format('LLLL');
    var lastPosition = _.last(positions);
    console.log(`Vessel ${vessel.MMSI} number of positions: ${positions.length}`);
    console.log(`\t first RecvTime: ${firstRecvTime}`);
    console.log(`\t last RecvTime: ${moment(lastPosition.RecvTime).format('LLLL')}`);

    // How to get Aberdeen location
    var aberdeen = cTowns.findOne({ town: /aberdeen/igm });
    console.log(aberdeen);

    // How far was the vessel from aberdeen on its first position
    var dist = distanceLocLoc(aberdeen.location, firstPosition.location);
    console.log(firstPosition);
    console.log("firstPosition.location: "+firstPosition.location);
    console.log(`${vessel.Name} was ${dist | 0}m away from ${aberdeen.town} on the ${firstRecvTime}.`);

    // How to get all the position of the vessel around aberdeen
    // as of how to make a geospatial request
    var positionsNearaberdeen = cPositions.find({
        MMSI: vessel.MMSI,
        location: {
            $nearSphere: {
                $geometry: {
                    type: 'Point',
                    coordinates: aberdeen.location
                },
                $maxDistance: 10000
            }
        },
        RecvTime: {
            $gte: moment(firstPosition.RecvTime).startOf("month").toDate(),
            $lte: moment(firstPosition.RecvTime).endOf("month").toDate()
        }
    }).sort({ RecvTime: 1 }).toArray()
    console.log(`Vessel ${vessel.Name} was detected ${positionsNearaberdeen.length} times 10000m around Aberdeen during the month of ${moment(firstPosition.RecvTime).format('MMMM YYYY')}.`);

    // here is some sanity check:
    var check = positionsNearaberdeen.map((p) => distanceLocLoc(p.location, aberdeen.location)).filter((p) => p > 10000).length;
    console.log(`Should be 0: ${check}`);
