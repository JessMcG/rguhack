//$(document).ready(function () {

  //Initialise Map & coordinates
  var mymap = L.map('mapid').setView([0, 0], 1);

  //Select map tiles from server
  var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
  {attribution:'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ', maxZoom: 16 });

  //add map tiles to map
  Esri_WorldGrayCanvas.addTo(mymap);

  //add topological data to map
  var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  {maxZoom: 17, attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'});
  OpenTopoMap.addTo(mymap);

  /*//Add vessels to map
  $('#load_vessels').click(function() {
    //Get vessel array
    var vessels = get_vessels.get();

    //Print vessel array on map
    for (var i = 0; i < vessels.length; i++) {
      var boat_length = vessels[i].length;
      var boat_width = vessels[i].width;

      //get latest vessel position from positions collection
      // How to get all positions sorted by ascendant RecvTime of the previous vessel
      let positions = await cPositions.find({ MMSI: vessels[i].MMSI }).sort({ RecvTime: 1 }).toArray();
      //Get latest position
      let lastPosition = _.last(positions);
      //get latitude & longitude of vessel
      var boat_lat = lastPosition.Latitude;
      var boat_long = lastPosition.Longitude;

      //plot vessel on map
      var boat = L.circle([boat_lat, boat_long], {radius: boat_length}).addTo(mymap).bindPopup(''+vessels[i].Name+'');

    }
  });
});*/
