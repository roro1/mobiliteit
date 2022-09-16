var map = new L.map('map', mapOptions);         // Creating a map object
var layer = new L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/light-v10',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1Ijoicm9yb3JvIiwiYSI6ImNsMWIzcjhiZDI0ZG8zaXF6eXE4dXE5emUifQ.gt3tunhffMqPmsInRj0mGQ'
  });         // Creating a Layer object
//       var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');         // Creating a Layer object
map.addLayer(layer);

var legend = L.control({ position: "topright" });
legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += legendHTML;
  div.style.maxWidth = "30%";
  div.style.minWidth = "200px";
  return div;
};
legend.addTo(map);

var elem = document.getElementById("map");
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
