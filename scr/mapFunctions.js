


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
        straal = 3000; kleur = 'Orange'
//        if (punt["type"] == "OV") {kleur = '#000080';}
//        else if (punt["type"] == "Donkey") {kleur = 'Orange'; straal = 2500}
        marker =  L.circle(punt["latlon"], 1000, {color: kleur ,fillColor: kleur,fillOpacity: 0,weight: 1,opacity: 0.6}).addTo(map);
        marker =  L.circle(punt["latlon"], straal, {color: kleur ,fillColor: kleur ,fillOpacity: 0.1,weight: 1,opacity: 0.6}).addTo(map);


      }



      else {
        marker = L.marker(punt["latlon"]).addTo(map);
      }
    if (punt["id"] !=null ) {
      text = "<a href='plannen.html?id="+punt["id"] + " ' > <b>" + punt["titel"] +  "</b></a> "
    } else {text = "."}
    if (punt["kort"]  != null) {if ( punt["kort"].length >200)  {text = text + "<p>" + punt["kort"].substr(0, 200) +"...</p>"} else {text = text + "<p>" + punt["kort"] +"</p>"}}
    text = text + "<p>" + parseW(punt["link"])+ "</p>";
    marker.bindPopup(text);
    }


  }
}
