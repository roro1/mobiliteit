


// deze functie kan bijna weg. Zit nog 1 parsMD in plotdots
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
              //    zinUit = zinUit + "<img src='" + mdurl+"' alt='"+mdlabel+"'>" ;
                  zinUit = zinUit + "<img src='" + mdurl+"' style='max-width:100%'; alt='"+mdlabel+"'>" ;

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
        marker = L.polyline(punt["polylijn"],{color: kleur , weight: 5, opacity: 0.6}).addTo(map);
      }
      else if (punt["geo"] == "ovEnDeel") {
        marker = L.polyline(punt["polylijn"],{color: kleur , weight: 5, opacity: 0.6}).addTo(map);
        for(itemx in punt["polylijn"]) {
                          console.log(punt["polylijn"][itemx]);
                          marker =  L.circle(punt["polylijn"][itemx], 1000, {color: kleur ,fillColor: kleur,fillOpacity: 0,weight: 1,opacity: 0.6}).addTo(map);
                          marker =  L.circle(punt["polylijn"][itemx], 3000, {color: kleur ,fillColor: '#00008B',fillOpacity: 0.1,weight: 1,opacity: 0.6}).addTo(map);


        }
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
