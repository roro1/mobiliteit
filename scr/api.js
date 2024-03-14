verloopRoodGroen = ['red','#f56f42','#fff400','#a3ff00','#2cba00'];
verloopLeg       = ['0',   '1'  ,    '2' ,      '3-5' , '>5'  ]
function plotHubs(json) {
  for(nr in json) {
    bike = json[nr]
    punt = [bike[0],bike[1]];
    kleurNr =0
    i = bike[3]
    if (bike[3] == 0) {kleurNr = 0}
      else if (bike[3] <=1 ) {kleurNr = 1}
      else if (bike[3] <=2 ) {kleurNr = 2}
      else if (bike[3] <=5 ) {kleurNr = 3}
      else {kleurNr = 4}


    kleur = verloopRoodGroen[kleurNr];
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
