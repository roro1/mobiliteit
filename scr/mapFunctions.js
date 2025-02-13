function createMap() {
  var layer = new L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoicm9yb3JvIiwiYSI6ImNsMWIzcjhiZDI0ZG8zaXF6eXE4dXE5emUifQ.gt3tunhffMqPmsInRj0mGQ'
    });         // Creating a Layer object
  map.addLayer(layer);
}

function maakLegenda(properties){  // logo // titel // html // positie 
  var legendHTML ='<span id="legendSpan"><H4>';
  if (properties['logo'] != false ){  legendHTML+= '<img src="img/favicon.png"style="float:left;">' }
  if (properties['titel']  ){  legendHTML+= properties['titel']+ '</H4>' } else {legendHTML+='Zuid-Holland</H4>'}
  legendHTML+= '<span id="legendContent">'
  if (properties['html'] != null) {legendHTML +=properties['html'] ;}
  if (properties['meer'] != null) {legendHTML += '<BR><details><summary>info & instellingen</summary>' + properties['meer'] + '</details>' ;}

  legendHTML+= '</span>'
  
 //   else if (Instellingen['schaal'] == 'A' ) {  // test schaal voor fiets-score
 //     legendHTML += "fiets-score (x1000): <br>"
 //     for (let x in range) {
 //       strx = range_legenda[x]
 //       legendHTML += '<i style=" opacity: 0.8; background-color:' + range[x] + '; text-align: center"></i><span>'+strx +'</span><BR>' ;
 //       }
 //     }


  if (window.location == window.parent.location) { legendHTML += '<BR><button onclick="openFullscreen();">Fullscreen</button></span>';}
  if (properties['positie'] == null){ pos ="topright" } else {pos = properties['positie']}

  var legend = L.control({ position: pos });
  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += legendHTML;
    div.style.maxWidth = "30%";
    if (properties['minWidth'] == null){  div.style.minWidth = "200px";  } else {div.style.minWidth =properties['minWidth']  }

    //div.style.minWidth = "300px";
    return div;
  };
  legend.addTo(map);
}

function gemKleur(str) {
  if (str < 60 &&  Instellingen["gemeentes"] !='grijs'  ) {
    reg = gemData[str]["regio"];
    if (Instellingen["gemeentes"]=='regio'){
      klr = regio[reg]["kleur"];
    } else if (Instellingen["gemeentes"]=='fiets'){
//       klr = 'Tomato';
      if ( groepDeelfiets.includes(gemData[str]["naam"]) ) {  klr = 'orange'} else {klr = 'grey'}
    }  else {
      conse = regio[reg]["concessie"];
      klr = concessie[conse]["kleur"];
    }
  } else klr =0
  return klr
}

function tekenGemeentes() {
  console.log('Instellingen');
  console.log(Instellingen);
  if (Instellingen['gemFill'] != null ) {gemFill = Instellingen['gemFill'] } else {gemFill= 0.2}
  if (Instellingen['gemOpacity'] != null ) {gemOpacity = Instellingen['gemOpacity'] } else {gemOpacity= 0.1}

       L.geoJSON(gemeentes, {
           style: function(feature) {
             var myStyle = {
                 "color": "Black",
                 "fillColor" : gemKleur(feature.properties.code),
                 "weight": 1,
                   "opacity": gemOpacity,
                "fillOpacity" : gemFill,
             };
                return myStyle;
           }
       }).bindPopup(function (layer) {
         nr = layer.feature.properties.code
         nrRegio = gemData[nr]["regio"]
         gem = gemData[nr]["naam"]
         if (Instellingen["gemeentes"]=='concessie'){
           txt ='<b>' + gem + '</b>';
           conse = regio[nrRegio]["concessie"];
           txt = txt + '<br>'+ concessie[conse]["naam"];
         }
         else if (Instellingen["popup"]==1) {
           txt =gem;
         } else {
           link = gemData[nr]["site"]
           linkC1 = "https://allecijfers.nl/gemeente/" + gem.toLowerCase();
           let linkC2 = linkC1.replace(" ", "-");
           let linkC3 = linkC2.replace(" ", "-");
           let linkCijfers = linkC3.replace(" ", "-");
           linkVerkiezing = linkCijfers +"#verkiezingsuitslagen"
           let extra ="";
           if  (regio[nrRegio]["extra"]!= null) {extra =regio[nrRegio]["extra"] }
           txt ="<b>"+gem+"</b><br>regio: "+regio[nrRegio]["naam"]+ "<br><a href='"+link+"' target='_blank'>website van gemeente</a><br>";
           if (gemData[nr]["WM"]!=null) { txt = txt+"Wethouder mobiliteit: "+ parseW(gemData[nr]["WM"]) +"<BR>" }
           txt = txt +"<a href='"+linkCijfers+"' target='_blank'>alleCijfers van gemeente</a><br>";
           txt = txt + "<a href='"+linkVerkiezing +"' target='_blank'>verkiezingsuitslag</a><br>"+extra
          }
    return txt;
  }).addTo(map);

}

function plotOVLijnen(json) {
  for(itemi in json) {
    kleur = '#efcc36' ; gewicht = 3;opac= 0.6;
    item = json[itemi];
    if (item["type"] == "OV") {kleur = '#847062';gewicht = 4}
    if (item["type"] == "waterbus") {kleur = 'blue';gewicht = 2;opac=0.3}
    if (item["type"] == "bus") {kleur = 'brown';gewicht = 2;opac=0.4}

    marker = L.polyline(item["polylijn"],{color: kleur , weight: gewicht, opacity: opac}).addTo(map);
    text =  item["titel"];
    marker.bindPopup(text);
  }
}

range =        ['#ffffe5','#fff7bc','#fee391','#fec44f','#fe9929','#ec7014','#cc4c02','#993404','#662506']
range_legenda =[ '<1'    ,'<5'     ,'<10'     ,'<20'   ,'<30'    ,'<40'    ,'<50'    ,'<60'    ,'>60']

function kiesKleur(wat,hoeveel) {
  hoeveel= hoeveel / 1000
  if (hoeveel < 1 ) { klr = 0  } 
  else if (hoeveel < 5) {klr = 1  } 
  else if (hoeveel < 10) { klr = 2  } 
  else if (hoeveel < 20) {klr = 3  } 
  else if (hoeveel < 30) {klr = 4  } 
  else if (hoeveel < 40) {klr = 5  } 
  else if (hoeveel < 50) {klr = 6  } 
  else if (hoeveel < 60) {klr = 7  } 



  else {  klr = 8  }
  return range[klr]
}

function kiesRadius(wat,hoeveel) {
  hoeveel= hoeveel / 1000
  if (hoeveel < 50 ) {  klr = 2  } 
  else if (hoeveel < 100) { klr = 3  } 
  else if (hoeveel < 100) {  klr = 4 } 
  else if (hoeveel < 1000) { klr = 5  }  
  else { klr = 6  }
  return klr
}

function plotHaltesArray(json) {
  for(itemi in json) {
    kleur = '#efcc36'
    punt = json[itemi];
    kleur = kiesKleur("A",punt[10]); // kleur afhankelijk van fiets-score
    straal = kiesRadius("A",punt[15])
    var marker = L.circleMarker(punt[0],{radius: straal,color:kleur,fillOpacity: 0.8}).addTo(map);
    text = "<H3>"+punt[1]+"</H3>";
    text += punt[7] + " - "+ punt[2] +"<br>"
    text +="fiets-score: "+ (punt[10] / 1000).toFixed(0) +"  ov-score: "+ (punt[15] / 1000).toFixed(0) + "<br>"

    text +="Rank1,5km: "+ punt[8]+" ;Rank3km: - "+punt[9]+ "<br>"
    text +="<details><summary>meer...</summary>"
  

    for (let i = 11; i < punt.length; i++) {
      text += labels[i] +": "+ punt[i] + "<br>"
    }
   
    text +="</details>"
    marker.bindPopup(text);
  }
}

function plotOVDonkeys(json) {
    for(itemi in json) {  //eerst al keer doorlopen voor grote vlakken zonder marker zodat die onder liggen
      punt = json[itemi];
        straal = 3000; kleur = 'Orange'
        marker =  L.circle(punt["latlon"], straal, {color: kleur ,fillColor: kleur ,fillOpacity: 0.05,weight: 1,opacity: 0.6}).addTo(map);
      }
    for(itemi in json) {
      kleur = '#efcc36'
      punt = json[itemi];
      kleur = 'Orange'; straal = 2500
      var marker = L.circleMarker(punt["latlon"],{radius: 5,color:'Orange',fillOpacity: 0.8}).addTo(map);
      text = punt["titel"];
      marker.bindPopup(text);
    }
  }

  function plotSuggesties(json) {
      for(itemi in json) {  //eerst al keer doorlopen voor grote vlakken zonder marker zodat die onder liggen
        punt = json[itemi];
          straal = 3000; kleur = 'Purple'
          marker =  L.circle(punt["latlon"], straal, {color: kleur ,fillColor: kleur ,fillOpacity: 0.05,weight: 1,opacity: 0.6}).addTo(map);
        }
      for(itemi in json) {
        kleur = '#efcc36'
        punt = json[itemi];
        kleur = 'Purple'; straal = 2500
        var marker = L.circleMarker(punt["latlon"],{radius: 5,color:'Purple',fillOpacity: 0.8}).addTo(map);
        text = punt["titel"];
        marker.bindPopup(text);
      }
    }

function plotDots(json) {
  console.log("start in plotDots")
  for(itemi in json) {  //eerst al keer doorlopen voor grote vlakken zonder marker zodat die onder liggen
    punt = json[itemi];
    if (punt["geo"] == "deelfiets") {
      straal = 3000; kleur = 'Orange'
      marker =  L.circle(punt["latlon"], straal, {color: kleur ,fillColor: kleur ,fillOpacity: 0.05,weight: 1,opacity: 0.6}).addTo(map);
    }
  }
  for(itemi in json) {
    kleur = '#efcc36'
    punt = json[itemi];
    if (punt["geo"]  != null) {
      if (punt["type"] == "weg") {kleur = '#d11f3d'}
      else if (punt["type"] == "fiets") {kleur = '#629623'}
      else if (punt["type"] == "OV") {kleur = '#847062'}
      else if (punt["type"] == "wonen") {kleur = '#281f6b'};

      if (punt["geo"] == "cirkel") {
        marker =  L.circle(punt["latlon"], punt["straal"], {color: kleur ,fillColor: kleur,fillOpacity: 0.2,weight: 1,opacity: 0.6}).addTo(map);
      } else if (punt["geo"] == "polygoon") {
        marker = L.polygon(punt["poly"],{color: kleur, fillColor: kleur,fillOpacity: 0.2,opacity: 0.6, weight: 1}).addTo(map);
      }
      else if (punt["geo"] == "polylijn") {
        marker = L.polyline(punt["polylijn"],{color: kleur , weight: 4, opacity: 0.6}).addTo(map);
      }
      else if (punt["geo"] == "ovEnDeel") {
        marker = L.polyline(punt["polylijn"],{color: kleur , weight: 3, opacity: 0.4}).addTo(map);
        straal = 3000
        if (punt["type"] == "OV") {kleur = '#000080';}
        else if (punt["type"] == "Donkey") {kleur = 'Orange'; straal = 2500}
        for(itemx in punt["polylijn"]) {
                          marker =  L.circle(punt["polylijn"][itemx], 1000, {color: kleur ,fillColor: kleur,fillOpacity: 0,weight: 1,opacity: 0.6}).addTo(map);
                          marker =  L.circle(punt["polylijn"][itemx], straal, {color: kleur ,fillColor: kleur ,fillOpacity: 0.1,weight: 1,opacity: 0.6}).addTo(map);


        }
      }
      else if (punt["geo"] == "deelfiets") {
        var marker = L.circleMarker(punt["latlon"],{radius: 5,color:'Orange',fillOpacity: 0.8}).addTo(map);

      }



      else {
        marker = L.marker(punt["latlon"]).addTo(map);
      }
    if (punt["id"] !=null ) {
      text = "<a href='plannen.html?id="+punt["id"] + " ' > <b>" + punt["titel"] +  "</b></a> "
    } else {text = ""}
    text = text + punt["titel"];
    if (punt["kort"]  != null) {if ( punt["kort"].length >200)  {text = text + "<p>" + punt["kort"].substr(0, 200) +"...</p>"} else {text = text + "<p>" + punt["kort"] +"</p>"}}
    text = text + "<p>" + parseW(punt["link"])+ "</p>";
    marker.bindPopup(text);
    }
  }
}

function leesURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlP = urlParams.get('p')
  if (urlP == 'oranje') { Instellingen["deelm"]='oranje'; Instellingen["popup"]=1; mapOptions = { center: [51.95, 4.584], zoom: 10 };   }
  if (urlP == 'os') { Instellingen["deelm"]='os'; Instellingen["popup"]=1; mapOptions = { center: [51.95, 4.584], zoom: 10 };   }
  if (urlP == 'issues') { Instellingen["deelm"]='issues'; }

  if (urlP == 'proj') {Instellingen["project"]='ja'; }
  if (urlP == 'c') { Instellingen["gemeentes"]='concessie'; Instellingen["popup"]=1;   }
  if (urlP == 'g') { Instellingen["gemeentes"]='grijs'; Instellingen["popup"]=1;   }
  if (urlP == 'f') { Instellingen["gemeentes"]='fiets'; Instellingen['gemFill'] = 0.2; Instellingen["deelm"]='oranje' }
  const urlC = urlParams.get('@')  //mapcenter + pointer
  if (urlC != null ){
    const myArray = urlC.split(",");
    mapOptions['center'] =  [Number(myArray[0]), Number(myArray[1])]
    if (myArray[2] !=null) {mapOptions['zoom'] =  Number(myArray[2])}
    if (myArray[3] !=null) {Instellingen["pointer"]=myArray[3]}
  }
  const urlI = urlParams.get('i') // edit functie : click geeft coordinaten
  if (urlI == 'c') { Instellingen["gemeentes"]='geen'; Instellingen["click"]=1;   }
}

function plaatsPointer(e) {
  var marker = L.marker(mapOptions['center']).addTo(map);
  if (Instellingen["pointer"].length >0){
    var popup = L.popup()
      .setLatLng(mapOptions['center'])
      .setContent(Instellingen["pointer"])
      .openOn(map);
  }
}

function openFullscreen() {
  var elem = document.getElementById("map");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function onMapClick(e) {
  var popupC = L.popup();
    popupC
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(map);
}
