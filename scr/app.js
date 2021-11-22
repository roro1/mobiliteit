const PContent = document.querySelector('#content');



function menuFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


function plotDots(json) {
  for(punti in json) {
    punt = json[punti];
    if (punt["geo"]  != null) {
      if (punt["geo"] == "cirkel") {
        marker =  L.circle(punt["latlon"], punt["straal"], {color: '#281f6b',fillColor: '#efcc36',fillOpacity: 0.1}).addTo(map);
        } else if (punt["geo"] == "polygoon") {
           marker = L.polygon(punt["poly"],{color: '#281f6b',fillColor: '#efcc36',fillOpacity: 0.1}).addTo(map);
        } else {
           marker = L.marker(punt["latlon"]).addTo(map);
        }
    if (punt["id"] !=null ) {
      text = "<a href='plannen.html?id="+punt["id"] + " ' > <b>" + punt["titel"] +  "</b></a> "
    } else {text = "."}
    text = text + "<p>" + punt["link"]+ "</p>";
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
      if (punt["link"]  != null) {str = str + "<p><b>Links:</b> " + punt["link"] +"</p>"}
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
