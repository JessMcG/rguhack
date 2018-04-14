function addM

var Map {
	// attributes
	var content;
	var markers[];
	var circles[];
	var polygons[];
	var name;
	var maximumZoom = 18;
	// members
	function Map(var name,
		var posx,
			var posy,
				var zoom) {
		content = L.map(name).setView([posx, posy], zoom);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW50b2luZXNiIiwiYSI6ImNqZnpmdjZ4ZzBxcDczM213OTY0OW9vcnAifQ.K6l3pongKiYp0rzFvc4FtA', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: maximumZoom,
			id: 'mapbox.streets',
			accessToken: 'pk.eyJ1IjoiYW50b2luZXNiIiwiYSI6ImNqZnpmdjZ4ZzBxcDczM213OTY0OW9vcnAifQ.K6l3pongKiYp0rzFvc4FtA'
		}).addTo(content);
	}

	function addMarker()
};

var myMap = new Map("map", 51.505, -0.09, 13);
