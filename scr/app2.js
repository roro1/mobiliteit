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

function renderCont(json,wat,optie){  // vul content met items op basis Json
  let xli = document.createElement('div');
  xli.setAttribute("class", "row");
  //xli.innerHTML = "<H1>Begin row<H1>";
  let xrow = PContent.appendChild(xli); //append child in content blok
  for(itemi in json) {
    zin = json[itemi];
    let xblok = document.createElement('div');
    p2 = zin.slice(0,2);
    if (p2 == "$3") {
      xblok.setAttribute("class", "b33");
      zin = zin.slice(2);

    } else if (p2=="$6") {
      xblok.setAttribute("class", "b66");
      zin = zin.slice(2);
    } else if (p2=="$a") {
      xblok.setAttribute("class", "ba");
      zin = zin.slice(2);
    } else if (p2=="$A") {
      xblok.setAttribute("class", "bb");
      zin = zin.slice(2);
    } else {

    xblok.setAttribute("class", "b50");    }

    xblok.innerHTML = parseMD(zin);
    xrow.appendChild(xblok); //append child in content blok

  }
}
