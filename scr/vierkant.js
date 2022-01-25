

function plotVierkanten(json,kolom,vulling) {
// voorbeeld item in json: ["E0930N4825", 52.32694, 4.4777, 52.33149, 4.48495, 4.2, 5, 0, 0]
// kolom: 0=id, 1+2 is linker onderhoek lat lon, 3+4= rechterbovenhoek, 5 en verder is data
const Schaalroodgroen = ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850"]; // bron: https://colorbrewer2.org/#type=diverging&scheme=RdYlGn&n=9 met 1 rood toegevoegd

  for(itemi in json) {
    item = json[itemi];
    waarde = item[kolom+4];
    intwaarde= Math.min(Math.floor(waarde),9);
    vulkleur = Schaalroodgroen[intwaarde];
    var polyg = [ [item[1],item[2]], [item[1],item[4]], [item[3],item[4]],  [item[3],item[2]] ];
    var prop = {fillColor: vulkleur ,fillOpacity: 0.7,stroke : false,}
    var poptxt =  "<p>" + waarde + "</p>" + item[0] +  "<p>" + item[7] + " ; "+ item[8] + " ; " + "</p>" ;
    //console.log(polyg);
    marker = L.polygon(polyg,prop).addTo(map).bindPopup(poptxt);
  }
}

function plotVierkanten4(json,kolom,vulling) {
// voorbeeld item in json: ["E0930N4825",...
const Schaalroodgroen = ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850"]; // bron: https://colorbrewer2.org/#type=diverging&scheme=RdYlGn&n=9 met 1 rood toegevoegd

  for(itemi in json) {
    item = json[itemi];
    //console.log(item);
    waarde = item[kolom+8];
    intwaarde= Math.min(Math.floor(waarde),9);
    vulkleur = Schaalroodgroen[intwaarde];
    var polyg = [ [item[1],item[2]], [item[3],item[4]], [item[5],item[6]],  [item[7],item[8]] ];
    //console.log(polyg);
    var prop = {fillColor: vulkleur ,fillOpacity: 0.7,stroke : false,}
    var poptxt =  "<p>" + waarde + "</p><ul>" ;
    for (tel in labels) {
      poptxt = poptxt + "<li>" + labels[tel] + ": </li>"
    }
    poptxt = poptxt + "</ul>"
    //console.log(polyg);
    marker = L.polygon(polyg,prop).addTo(map).bindPopup(poptxt);
  }
}
