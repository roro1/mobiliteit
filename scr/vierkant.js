const SchaalStedelijk=  ['#ffffe5','#87477f','#d92023','#f19353','#fede99','#faf0ca','#f5efe6']; //'#c8c8ca'
//                          0           1          2      3         4          5        6          7        8          9
const LabelNabij = [0,'Hoog stedelijk','Stedelijk','Suburbaan','Laag suburbaan','Dorps','Landelijk']

const labels= ["Voorzieningen","Winkels","Onderwijs","Zorg","Sport&Cultuur", "Horeca", "Groen", "OV lokaal(1=beste)","OV omg(1=beste)","Stedelijkheidsklasse","aantal inwoners","aantal woningen","aantal banen" ]
const labelK= ["Voorzieningen","Winkels","Onderwijs","Zorg","Sport&Cultuur", "Horeca", "Groen", "OV lokaal(1=beste)","OV","Stedelijkheidsklasse","aantal inwoners","aantal woningen","aantal banen" ]


function ontwerpLegenda(properties, kolom){

/*Legend specific*/
var lHTML = ''
      if (kolom == 9) {

        lHTML += '<BR><i style="background: #004529; text-align: center">1</i><span>Primair IC station op max 2,5km</span><BR>';
        lHTML += '<i style="background: #238443; text-align: center">2</i><span>Secundair IC station op max 1,75km of *</span><BR>';
        lHTML += '<i style="background: #78c679; text-align: center">3</i><span>Sprinter station op max 1,25km of *</span><BR>';
        lHTML += '<i style="background: #addd8e; text-align: center">4</i><span>Hoogwaardig OV op max 750m</span><BR>';
        lHTML += '<i style="background: #d9f0a3; text-align: center">5</i><span>Basis OV op max 500m</span><BR>';
        lHTML += '<i style="background: #ffffe5; text-align: center">6</i><span>BeperktOV op max 500m</span><br>';
      }
      else if(kolom == 10)  {
        for (let i = 1; i < SchaalStedelijk.length; i++) {
           lHTML += '<i style=" opacity: 0.8; background-color:' + SchaalStedelijk[i] + '; text-align: center"></i><span>'+LabelNabij[i] +'</span><BR>' ;
      }

      }

        else {
        lHTML += '<BR><i style="background: #004529; text-align: center">9</i> ';
        lHTML += '<i style="background: #006837; text-align: center">8</i> ';
        lHTML += '<i style="background: #238443; text-align: center">7</i> ';
        lHTML += '<i style="background: #41ab5d; text-align: center">6</i> ';
        lHTML += '<i style="background: #78c679; text-align: center">5</i> ';
        lHTML += '<i style="background: #addd8e; text-align: center">4</i> ';
        lHTML += '<i style="background: #d9f0a3; text-align: center">3</i> ';
        lHTML += '<i style="background: #f7fcb9; text-align: center">2</i> ';
        lHTML += '<i style="background: #ffffe5; text-align: center">1</i><br> ';
      } 

    
      var meer = 'Kaarten bij de <a href="mapv.html" target="_blank">Snelstudie "De kracht van nabijheid"</a>. Klik in de kaart om de scores van een tegel (van 500 x 500 meter) te zien. Er is een kaart met een totaalscore voor voorzieningen. En er zijn kaarten per deelaspect. De score voor voorzieningen loopt van 1(slecht) tot 9(uitstekend), voor OV loopt de schaal andersom: van 1 (primair IC station binnen 2,5km) tot 6 (laagste klasse). Tevens is het aantal inwoners, woningen en banen per tegel vermeld.<BR><br>'
      meer += '<h2>Menu:</h2><a href="kaart.html?par=10" target="_blank">Stedelijkheidsklasses</a><br>';
      meer += '<a href="kaart.html?par=1" target="_blank">Voorzieningen (gewogen)</a><br>';
      meer += '<a href="kaart.html?par=9" target="_blank">OV</a><br>';
      meer += '<a href="kaart.html?par=2" target="_blank">Winkels</a><br>';
      meer += '<a href="kaart.html?par=3" target="_blank">Onderwijs</a><br>';
      meer += '<a href="kaart.html?par=4" target="_blank">Zorg</a><br>';
      meer += '<a href="kaart.html?par=5" target="_blank">Sport&C</a><br>';
      meer += '<a href="kaart.html?par=6" target="_blank">Horeca</a><br>';
      meer += '<a href="kaart.html?par=7" target="_blank">Groen</a><br></details>';

      
      properties.html = lHTML;
      properties.meer = meer;
      properties.titel = labelK[kolom-1]


      properties.minWidth ="300px"
    maakLegenda(properties);

}



function plotVierkanten4(json,kolom,kolom2) {
// voorbeeld item in json: ["E0930N4825",...vier latLon en dan values  kolom geeft de value die kleur bepaalt+8
const Schaalgroengeel = ['#ffffe5','#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529'];
const SchaalOV =        ['#ffffe5','#004529','#238443','#78c679','#addd8e','#d9f0a3','#ffffe5','#ffffe5','#ffffe5','#004529'];

  for(itemi in json) {
    item = json[itemi];
    var polyg = [ [item[1],item[2]], [item[3],item[4]], [item[5],item[6]],  [item[7],item[8]] ];
    waarde = item[kolom+8]; // kolom 0 = cel ID, kolom 1 t/m 8 cooordinaat, daarna de waardes
    intwaarde= Math.min(Math.floor(waarde),9);
    if (waarde <0 ) {var prop = {fillColor: "#FFFFFF" ,fillOpacity: 0,stroke : false}} //niet inkleuren
    else {

      if (kolom == 9) {vulkleur = SchaalOV[waarde]; vul = 0.5} 
      else if (kolom == 10) {vulkleur = SchaalStedelijk[waarde]; vul = 0.7}   
      else    {vulkleur = Schaalgroengeel[intwaarde]; if (intwaarde >5 ) {vul = 0.5 } else {vul = 0.3} }  // lage waarden lichtere vulling 
      
      var prop ={fillColor: vulkleur ,fillOpacity: vul,stroke : true,color: vulkleur,weight:1,opacity: 0.2}

      if (kolom2 !=0){ //randje andere kleur
        if (kolom2 == 9) {randkleur = SchaalOV[waarde];} 
        else if (kolom2 == 10) {waarde2 = item[kolom2+8]; randkleur = SchaalStedelijk[waarde2]; }   
        else    {randkleur = Schaalgroengeel[intwaarde]; prop.weight = 4;
        }  // lage waarden lichtere vulling 
      } else {randkleur = vulkleur}
      prop.color = randkleur;

    }
    var poptxt =  "<p><b>Score: " + waarde + "</b></p><ul>" ;
    for (let tel = 0; tel < 13; tel++) {
      if (item[9+tel] > 0){
        poptxt = poptxt + "<li>" + labels[tel] + ": " + item[9+tel] +"</li>"
      }
    }
    poptxt = poptxt + "</ul> Tegel : " + item[0]
    marker = L.polygon(polyg,prop).addTo(map).bindPopup(poptxt);
  }
}
