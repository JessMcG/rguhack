class Map {
	constructor(name, posx, posy, zoom) {
		// attributes creation
		this.HTMLname = name;
		this.markers = [];
		this.circles = [];
		this.polygons = [];
		this.maximumZoom = 18;
		// create actual map
		this.content = L.map(name).setView([posx, posy], zoom);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW50b2luZXNiIiwiYSI6ImNqZnpmdjZ4ZzBxcDczM213OTY0OW9vcnAifQ.K6l3pongKiYp0rzFvc4FtA', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: this.maximumZoom,
			id: 'mapbox.streets',
			accessToken: 'pk.eyJ1IjoiYW50b2luZXNiIiwiYSI6ImNqZnpmdjZ4ZzBxcDczM213OTY0OW9vcnAifQ.K6l3pongKiYp0rzFvc4FtA'
		}).addTo(this.content);
		console.log("Map " + this.HTMLname + " has been created");
	}

	addMarker(posx, posy) {
		this.markers.push(L.marker([posx, posy]).addTo(this.content));
		console.log("Marker added to map " + this.HTMLname + " at position" + [posx, posy]);
		var marker = L.marker([51.5, -0.09]).addTo(this.content);
	}
};

var myMap = new Map("map", 51.505, -0.09, 13);
myMap.addMarker(51.5, -0.09);

console.log("test");
