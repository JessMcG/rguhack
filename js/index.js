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
};

var myMap = new Map("map", 51.505, -.09, 13);
myMap.addMarker(51.5, -.09);
myMap.addCircle(51.508, -.11, 'red', '#f03', .5, 500);
myMap.addPolygon([
	[51.509, -0.08],
	[51.503, -0.06],
	[51.51, -0.047]
]);
myMap.addPopup(51.5, -0.09, "<b>I am a standalone popup.</b>");
myMap.attachPopup("sesk", 0, "Free Palestine", true); // invalid category
myMap.attachPopup("marker", -1, "Free Palestine", true); // invalid index
myMap.attachPopup("circle", 0, "Free Palestine", true);
myMap.attachPopup("polygon", 0, "Free Palestine", false);
myMap.addClickEvent(
	function onMapClick(e) {
		alert("You clicked the map at " + e.latlng);
	}
);
