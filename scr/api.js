verloopRoodGroen = ['red','#ffcc00','##fff400','#a3ff00','#2cba00'];
function plotHubs(json) {
  for(nr in json) {
    bike = json[nr]
    punt = [bike[0],bike[1]];
    i = bike[3]
    if (i > 4) {i = 4};
    kleur = verloopRoodGroen[i];
    var marker = L.circleMarker(punt,{radius: 5,color:kleur,fillOpacity: 0.8}).addTo(map);
    text =  "<p>" +bike[2] +"</p><p>"+bike[3]+ "</p>";
    marker.bindPopup(text);
    }
  }

function plotBikes(json) {
  for(nr in json) {
    console.log(json[nr])
    bike = json[nr]
    punt = [bike[0],bike[1]];
    kleur = 'grey'
    var marker = L.circleMarker(punt,{radius: 1,color:kleur,fillOpacity: 0.1}).addTo(map);
    text =  "<p>" +bike[0] +" "+bike[1]+ " "+bike[2]+ "</p>";
    marker.bindPopup(text);
    }
  }

async function getInfo() {

  strx ="https://roro1.eu.pythonanywhere.com/slider/nothub"
  let myObject2 = await fetch(strx);
  bikes = await myObject2.json();
  plotBikes(bikes);
  strx ="https://roro1.eu.pythonanywhere.com/slider/hubs"
  let myObject = await fetch(strx);
  bikes = await myObject.json();
  plotHubs(bikes);
}
