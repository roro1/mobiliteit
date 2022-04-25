



function plotVierkanten4(json,kolom,vulling) {
// voorbeeld item in json: ["E0930N4825",...
const Schaalroodgroen = ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850"]; // bron: https://colorbrewer2.org/#type=diverging&scheme=RdYlGn&n=9 met 1 rood toegevoegd
const Schaalgroengeel = ['#ffffe5','#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529'];
//const SchaalOV =        ['#ffffe5','#006837','#41ab5d','#addd8e','#f7fcb9','#ffffe5','#ffffe5','#ffffe5','#006837','#004529'];
const SchaalOV =        ['#ffffe5','#004529','#238443','#78c679','#addd8e','#d9f0a3','#ffffe5','#ffffe5','#ffffe5','#004529'];
//                          0           1          2      3         4          5        6          7        8          9
//["#ffffe5","#ffffe5","#ffffe5","#fff7bc","#fee391","#fec44f","#d9f0a3","#74c476","#41ab5d","#238443"]; // bron: https://colorbrewer2.org/#type=sequential&scheme=YlOrBr&n=9   https://colorbrewer2.org/#type=sequential&scheme=Greens&n=9

//const Schaalgroengeel = ["#ffffe5","#ffffe5","#fff7bc","#fee391","#fec44f","#d9f0a3","#a1d99b","#74c476","#41ab5d","#238443"]; // bron: https://colorbrewer2.org/#type=sequential&scheme=YlOrBr&n=9   https://colorbrewer2.org/#type=sequential&scheme=Greens&n=9

  for(itemi in json) {
    item = json[itemi];
    var polyg = [ [item[1],item[2]], [item[3],item[4]], [item[5],item[6]],  [item[7],item[8]] ];
    waarde = item[kolom+8]; // kolom 0 = cel ID, kolom 1 t/m 8 cooordinaat
    intwaarde= Math.min(Math.floor(waarde),9);
    if (waarde <0 ) {var prop = {fillColor: "#FFFFFF" ,fillOpacity: 0,stroke : false,}}
    else {
      if (kolom == 9) {vulkleur = SchaalOV[waarde]; vul = 0.5} else
      {vulkleur = Schaalgroengeel[intwaarde];
        if (intwaarde >5 ) {vul = 0.5 } else {vul = 0.3}

      }
      var prop ={fillColor: vulkleur ,fillOpacity: vul,stroke : false,}

    }
    var poptxt =  "<p><b>Score: " + waarde + "</b></p><ul>" ;
    for (let tel = 0; tel < 13; tel++) {
      if (item[9+tel] > 0){
        poptxt = poptxt + "<li>" + labels[tel] + ": " + item[9+tel] +"</li>"
      }
    }
    poptxt = poptxt + "</ul> Tegel : " + item[0]
    //console.log(polyg);
    marker = L.polygon(polyg,prop).addTo(map).bindPopup(poptxt);
  }
}
