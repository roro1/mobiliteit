

function plotVierkanten(json,kolom,vulling) {
// voorbeeld item in json: ["E0930N4825", 52.32694, 4.4777, 52.33149, 4.48495, 4.2, 5, 0, 0]
// kolom: 0=id, 1+2 is linker onderhoek lat lon, 3+4= rechterbovenhoek, 5 en verder is data
const Schaalroodgroen = ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850"]; // bron: https://colorbrewer2.org/#type=diverging&scheme=RdYlGn&n=9 met 1 rood toegevoegd
const Schaalgroengeel = ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#d9f0a3","#a1d99b","#74c476","#41ab5d","#238443"]; // bron: https://colorbrewer2.org/#type=sequential&scheme=YlOrBr&n=9   https://colorbrewer2.org/#type=sequential&scheme=Greens&n=9


  for(itemi in json) {
    item = json[itemi];
    waarde = item[kolom+4];
    intwaarde= Math.min(Math.floor(waarde),9);
    vulkleur = Schaalgroengeel[intwaarde];
    var polyg = [ [item[1],item[2]], [item[1],item[4]], [item[3],item[4]],  [item[3],item[2]] ];
    var prop = {fillColor: vulkleur ,fillOpacity: 0.1,stroke : false,}
    if (intwaarde <0 ) {prop = {fillColor: "#FFFFFF" ,fillOpacity: 0.3,stroke : false,}}
    var poptxt =  "<p>" + waarde + "</p>" + item[0] +  "<p>" + item[7] + " ; "+ item[8] + " ; " + "</p>" ;
    //console.log(polyg);
    marker = L.polygon(polyg,prop).addTo(map).bindPopup(poptxt);
  }
}

function plotVierkanten4(json,kolom,vulling) {
// voorbeeld item in json: ["E0930N4825",...
const Schaalroodgroen = ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850"]; // bron: https://colorbrewer2.org/#type=diverging&scheme=RdYlGn&n=9 met 1 rood toegevoegd
const Schaalgroengeel = ["#ffffe5","#ffffe5","#fff7bc","#fee391","#fec44f","#d9f0a3","#a1d99b","#74c476","#41ab5d","#238443"]; // bron: https://colorbrewer2.org/#type=sequential&scheme=YlOrBr&n=9   https://colorbrewer2.org/#type=sequential&scheme=Greens&n=9

  for(itemi in json) {
    item = json[itemi];
    //console.log(item);
    waarde = item[kolom+8]; // kolom 0 = cel ID, kolom 1 t/m 8 cooordinaat
    intwaarde= Math.min(Math.floor(waarde),9);
    vulkleur = Schaalgroengeel[intwaarde];
    var polyg = [ [item[1],item[2]], [item[3],item[4]], [item[5],item[6]],  [item[7],item[8]] ];
    //console.log(polyg);
    //var prop = {fillColor: vulkleur ,fillOpacity: 0.5,stroke : false,}
    if (intwaarde >2 ) { var prop ={fillColor: vulkleur ,fillOpacity: 0.5,stroke : false,}}
      else
    { var prop = {fillColor: "#FFFFFF" ,fillOpacity: 0,stroke : false,}}

    var poptxt =  "<p><b>Score: " + waarde + "</b> (kleurcode: "+intwaarde+")</p><ul>" ;
    for (let tel = 0; tel < 7; tel++) {
      poptxt = poptxt + "<li>" + labels[tel] + ": " + item[9+tel] +"</li>"
    }
    poptxt = poptxt + "</ul> Tegel : " + item[0]
    //console.log(polyg);
    marker = L.polygon(polyg,prop).addTo(map).bindPopup(poptxt);
  }
}
