class Map {
	constructor(name, posx, posy, zoom) {
		// attributes creation
		this.HTMLname = name;
		this.markers = [];
		this.circles = [];
		this.polygons = [];
		this.standalonePopups = [];
		this.maximumZoom = 18;
		this.posx = posx;
		this.posy = posy;
		// actual map creation
		this.content = L.map(name).setView([posx, posy], zoom);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW50b2luZXNiIiwiYSI6ImNqZnpmdjZ4ZzBxcDczM213OTY0OW9vcnAifQ.K6l3pongKiYp0rzFvc4FtA', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: this.maximumZoom,
			id: 'mapbox.streets',
			accessToken: 'pk.eyJ1IjoiYW50b2luZXNiIiwiYSI6ImNqZnpmdjZ4ZzBxcDczM213OTY0OW9vcnAifQ.K6l3pongKiYp0rzFvc4FtA'
		}).addTo(this.content);
		console.log("Map " + this.HTMLname + " has been created, centered to ");
	}
	addMarker(posx, posy) {
		this.markers.push(
			L.marker([posx, posy]).addTo(this.content)
		);
		console.log("Marker added to map " + this.HTMLname + " at position " + [posx, posy]);
	}
	addCircle(posx, posy, newColor, newFillColor, newFillOpacity, newRadius) {
		this.circles.push(
			L.circle([posx, posy], {
				color: newColor,
				fillColor: newFillColor,
				fillOpacity: newFillOpacity,
				radius: newRadius
			}).addTo(this.content)
		);
		console.log("Circle added to map " + this.HTMLname + " at position " + [posx, posy]);
	}
	addPolygon(points) {
		this.polygons.push(L.polygon(points).addTo(this.content));
		console.log("Polygon added to map " + this.HTMLname + " at position " + [points]);
	}
	addPopup(posx, posy, content) {
		this.standalonePopups.push(
			L.popup()
			.setLatLng([posx, posy])
			.setContent(content)
			.openOn(this.content)
		);
		console.log("Popup added at position " + [posx, posy])
	}
	attachPopup(category, index, content, opened) {
		if (index < 0) {
			console.error("The index must be superior to 0");
			return;
		}
		switch (category) {
			case "marker":
				if (this.markers.length - 1 < index) {
					console.error("The given index " + index + " is higher than " + this.markers.length);
					return;
				} else
					opened ? this.markers[index].bindPopup(content).openPopup() : this.markers[index].bindPopup(content);
				break;
			case "circle":
				if (this.circles.length - 1 < index) {
					console.error("The given index " + index + " is higher than " + this.circles.length);
					return;
				} else
					opened ? this.circles[index].bindPopup(content).openPopup() : this.circles[index].bindPopup(content);
				break;
			case "polygon":
				if (this.polygons.length - 1 < index) {
					console.error("The given index " + index + " is higher than " + this.polygons.length);
					return;
				} else
					opened ? this.polygons[index].bindPopup(content).openPopup() : this.polygons[index].bindPopup(content);
				break;
			default:
				console.error("The popup category must be: marker, circle or polygon");
				return;
		}
		console.log("Popup binded to " + category + "[" + index + "]");
	}
	addClickEvent(newFunction) {
		this.content.on('click', newFunction);
	}
	addEvent(eventName, func) {
		this.content.on(eventName, func);
	}
};

requirejs(["node_modules/mongodb/index.js"], function (mongodb) {
	// Thanks to https://stackoverflow.com/a/21623206
	// Distance returned is in m
	function distance(lat1, lon1, lat2, lon2) {
		var p = 0.017453292519943295; // Math.PI / 180
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

	(async () => {
		const client = await MongoClient.connect('mongodb://hackuser:hackuser@csdm-mongodb.rgu.ac.uk/hackais');
		const db = client.db('hackais');
		console.log(db);

		// close the client so that the script exits
		client.close()
	})()
});
/*
	const MongoClient = require('node_modules/mongodb').MongoClient;
	const _ = require('node_modules/lodash');
	const moment = require('node_modules/moment');
*/
