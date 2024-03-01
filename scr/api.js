function plotHubs(json) {
  console.log("start plotbikes")
  for(nr in json) {
    console.log(json[nr])
    bike = json[nr]
    punt = [bike[0],bike[1]];
    kleur = 'Orange'
    if (bike[3] == 0) {kleur = 'red'}
    else if (bike[3]  == 1) {kleur = 'yellow'};
    var marker = L.circleMarker(punt,{radius: 5,color:kleur,fillOpacity: 0.8}).addTo(map);
    text =  "<p>" +bike[2] +"</p><p>"+bike[3]+ "</p>";
    marker.bindPopup(text);
    }
  }

function plotBikes(json) {
  console.log("start plotbikes")
  for(nr in json) {
    console.log(json[nr])
    bike = json[nr]
    console.log(bike[0])
    console.log(bike[1])

    punt = [bike[0],bike[1]];
    console.log(punt)
    kleur = 'grey'
    var marker = L.circleMarker(punt,{radius: 1,color:kleur,fillOpacity: 0.1}).addTo(map);
    text =  "<p>" +bike[0] +" "+bike[1]+ " "+bike[2]+ "</p>";
    marker.bindPopup(text);
    }
  }

async function getInfo() {
  strx ="https://roro1.eu.pythonanywhere.com/slider/hubs"
  let myObject = await fetch(strx);
  bikes = await myObject.json();
  plotHubs(bikes);
  strx ="https://roro1.eu.pythonanywhere.com/slider/nothub"
  let myObject2 = await fetch(strx);
  bikes = await myObject2.json();
  plotBikes(bikes);
}
