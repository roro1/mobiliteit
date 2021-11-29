const PContent = document.querySelector('#content');



function menuFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function parseMD(zin) {
  let zinUit ="";
  while (zin  != null && zin != "") {
    let position1 = zin.indexOf("$[");
    if (position1 >0 ) { // er zit gewone tekst voor md
      zinUit = zinUit+ zin.slice(0,position1);
      zin = zin.slice(position1);
    } else if (position1 == 0) { //md op eerste positie
      let position2 = zin.indexOf("](");
      if (position2 != -1 ){
        let position3 = zin.indexOf(")");
        if (position3 != -1 && position3 > position2 ){ //ok md replacement!
          let mdlabel = zin.slice(2,position2);
          let mdurl = zin.slice(position2+2,position3);
          zinUit = zinUit + "<a href='" + mdurl + "' target='_blank' >" + mdlabel + "</a>" ;
          zin = zin.slice(position3+1);
        } else {
            console.log("in MD $[ zit ) niet goed");
            zinUit = zinUit + zin.slice(0,position2);
            zin = zin.slice(position2);
        }
      } else {
          console.log("in MD $[ zit ]( niet goed");
          zinUit = zinUit + zin.slice(0,2);
          zin = zin.slice(2);
      }
    } else { // er zit geen md (meer) in
        zinUit = zinUit + zin;
        zin ="";
      }
  }
  return zinUit;
}



function plotDots(json) {
  for(itemi in json) {
    punt = json[itemi];
    if (punt["geo"]  != null) {
      if (punt["geo"] == "cirkel") {
        marker =  L.circle(punt["latlon"], punt["straal"], {color: '#281f6b',fillColor: '#efcc36',fillOpacity: 0.1}).addTo(map);
      } else if (punt["geo"] == "polygoon") {
        marker = L.polygon(punt["poly"],{color: '#281f6b',fillColor: '#efcc36',fillOpacity: 0.1}).addTo(map);
      }
      else if (punt["geo"] == "polylijn") {
        marker = L.polyline(punt["polylijn"],{color: '#efcc36', weight: 5}).addTo(map);
      }
      else {
        marker = L.marker(punt["latlon"]).addTo(map);
      }
    if (punt["id"] !=null ) {
      text = "<a href='plannen.html?id="+punt["id"] + " ' > <b>" + punt["titel"] +  "</b></a> "
    } else {text = "."}
    text = text + "<p>" + parseMD(punt["link"])+ "</p>";
    marker.bindPopup(text);
    }
  }
}

function renderLijst(json,wat,optie){  // vul lijst met items op basis Json
  let xli = document.createElement('span');
  if (optie == "inspiratie") {
  xli.innerHTML = "<H1>Inspiratie</H1><ul id='lijst'></ul>";}
  else if (optie == "snelstudies") {
    xli.innerHTML = "<H1>Snelstudies</H1><p>Snelstudies geven inzicht in de richtingen die we kunnen gaan. Snelstudies zijn als een fietstocht: Ver vooruitkijken en dichtbij sturen. We schetsen toekomstperspectieven voor transitievraagstukken en brengen die terug naar mogelijke keuzes van overheden in Zuid-Holland die nu al gemaakt kunnen worden. Deze Snelstudies vallen binnen de programma  kennis Zuid-Holland van de provincie Zuid-Holland.</p><ul id='lijst'></ul>";
} else if (wat == null) {
  xli.innerHTML = "<H1>Plannen in Midden Holland</H1><ul id='lijst'></ul>";

} else {
  xli.innerHTML = "<ul id='lijst'></ul>";

}
  PContent.appendChild(xli); //append child in content blok
  const PLijst = document.querySelector('#lijst');


  for(itemi in json) {
    punt = json[itemi];
    if (wat == null || wat == punt["id"]) {
      let li = document.createElement('li');
      PLijst.appendChild(li);
      let task = document.createElement('span');
      task.classList.add("tekst");
      li.appendChild(task);
      str = "<h3>" + punt["titel"] +"</h3>"
      if (punt["kort"]  != null) {str = str + "<p>" + punt["kort"] +"</p>"}
      if (punt["link"]  != null) {str = str + "<p><b>Links:</b> " + parseMD(punt["link"]) +"</p>"}
      str = str + parseMD(punt["mdlink"]);
      if (wat == punt["id"]) {
        if (punt["rel"]  != null) {str = str + "<p><b>Gerelateerd aan:</b> " + punt["rel"] +"</p>"}
        if (punt["pzhlink"]  != null) {str = str + "<p><b>PZH intranet:</b> " + punt["pzhlink"] +"</p>"}
        if (punt["idmslink"]  != null) {str = str + "<p><b>PZH IDMS links:</b> " + punt["idmslink"] +"</p>"}
        if (punt["lang"]  != null) {str = str + "<p>" + punt["lang"] +"</p>"}

      } else {
          if (punt["id"] !=null && optie == "plannen" ) {
               str = str + "<a href='plannen.html?id="+punt["id"] + "'> <b><i>Meer...</i></b></a> "
    }}
      task.innerHTML = str;
    }
}
}
