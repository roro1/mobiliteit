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
  let p2 ="";
  while (zin  != null && zin != "") {
    let positiondol = zin.indexOf("$");
    if (positiondol >0 ) { zinUit = zinUit+ zin.slice(0,positiondol); zin = zin.slice(positiondol); }// er zit gewone tekst voor de $ , eraf slicen
    let positiond = zin.indexOf("$");
    if (positiond ==-1 ) { zinUit = zinUit + zin; zin ="";}  // geen $ meer, klaar
    else // $ op eerste positie
    {
      p2 = zin.slice(0,2);
      if (p2 == "$[") {  // $[  replace with link
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
      } // endif $[ replace link
      else if (p2 == "$&")

         {  // $& dus embed video
            console.log("start iframe");
            let position2 = zin.indexOf("](");
            if (position2 != -1 ){
              let position3 = zin.indexOf(")");
              if (position3 != -1 && position3 > position2 ){ //ok md replacement!
                let mdlabel = zin.slice(2,position2);
                let mdurl = zin.slice(position2+2,position3);
                zinUit = zinUit + "<iframe width='560' height='315' src='" + mdurl+"' title='YouTube video player '' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>" ;
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
          }  // endif $&  embed video

        else if (p2 == "$!")

           {  // $! dus plaatje invoegen
              console.log("afbeeldinge");
              let position2 = zin.indexOf("](");
              if (position2 != -1 ){
                let position3 = zin.indexOf(")");
                if (position3 != -1 && position3 > position2 ){ //ok md replacement!
                  let mdlabel = zin.slice(2,position2);
                  let mdurl = zin.slice(position2+2,position3);
                  zinUit = zinUit + "<img src='" + mdurl+"' alt='"+mdlabel+"'>" ;
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
            }  // endif $&  embed video
        else { zinUit = zinUit + "$" ; zin = zin.slice(1);}  //  dollar zonder betekenis eruit
    } // endif $ op eerste positie



  }  // end while
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
    if (punt["kort"]  != null) {if ( punt["kort"].length >200)  {text = text + "<p>" + punt["kort"].substr(0, 200) +"...</p>"} else {text = text + "<p>" + punt["kort"] +"</p>"}}
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
    xli.innerHTML = "<H1>Snelstudies</H1><p>Snelstudies geven inzicht in de richtingen die we kunnen gaan. Snelstudies zijn als een fietstocht: Ver vooruitkijken en dichtbij sturen. We schetsen toekomstperspectieven voor transitievraagstukken en brengen die terug naar mogelijke keuzes van overheden in Zuid-Holland die nu al gemaakt kunnen worden. Deze Snelstudies vallen binnen <a href='https://www.zuid-holland.nl/overons/kennis-zuid-holland/'>kennis Zuid-Holland</a> van de provincie Zuid-Holland.</p><ul id='lijst'></ul>";
} else if (wat == null) {
  xli.innerHTML = "<H1>Plannen in Zuid-Holland</H1> <p>Klik op kaart in het menu voor een grafische weergave.</p><p><a href='plannen.html?id=mrdh'>selecteer MRDH</a> ;  <a href='plannen.html?id=rijnland'>selecteer Holland Rijnland</a> ; <a href='plannen.html?id=midden'>selecteer Midden Holland </a></ol><ul id='lijst'></p>";

} else {
  xli.innerHTML = "<ul id='lijst'></ul>";

}
  PContent.appendChild(xli); //append child in content blok
  const PLijst = document.querySelector('#lijst');


  for(itemi in json) {
    punt = json[itemi];
    if (wat == null || wat == punt["id"] || wat ==punt["regio"]) {
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
        if (punt["lang"]  != null) {str = str + "<p>" + parseMD(punt["lang"]) +"</p>"}

      } else {
          if (punt["id"] !=null) {
               if (punt["lang"]  != null || punt["rel"]  != null || punt["pzhlink"]  != null ) {tk="meer..." } else { tk =".."}
               str = str + "<a href='?id="+punt["id"] + "'> <b><i>"+tk+"</i></b></a>"
    }}
      task.innerHTML = str;
    }
}
}
