//Initialise Map & coordinates
var map = L.map('mapid').setView([51.505, -0.09], 13);

//Select map tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={pk.eyJ1IjoiYWxsdXJiYXNzIiwiYSI6ImNqZnplOWJzejB5ejYzM3BjaWs0Z3Z3Zm4ifQ.HukfGruu-7X5fPiYvk3BmA}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
