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

      if (punt["type"] == "cirkel") {
        marker =  L.circle(punt["latlon"], punt["straal"], {color: '#281f6b',fillColor: '#efcc36',fillOpacity: 0.1}).addTo(map);
        }
      else {
         if (punt["type"] == "polygoon") {
           marker = L.polygon(punt["poly"],{color: '#281f6b',fillColor: '#efcc36',fillOpacity: 0.1}).addTo(map);
         }
       else {
      marker = L.marker(punt["latlon"]).addTo(map);
      }
    }
            if (punt["id"] !=null ) {
      text = "<a href='plannen.html?id="+punt["id"] + " ' > <b>" + punt["titel"] +  "</b></a> "
    } else {text = "."}
      text = text + "<p>" + punt["link"]+ "</p>";
      marker.bindPopup(text);

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
      str = str + punt["link"]
      if (wat == punt["id"]) {
        urltext= "<a href='https://eur03.safelinks.protection.outlook.com/ap/w-59584e83/?url=https%3A%2F%2Fpzh-my.sharepoint.com%2F%3Aw%3A%2Fg%2Fpersonal%2Fra_haverman_pzh_nl%2FEYVr7u137k1InYvJLCtjT8EBTb20vDB10Et3UOvOosGtUQ%3Fe%3DbWDWDT&data=04%7C01%7Cra.haverman%40pzh.nl%7C26720f2d8b224028bbbb08d9a819bf64%7C6d99bc288f284a73a50163a8e1eb3040%7C0%7C0%7C637725650795165583%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000&sdata=ZSMBJg%2FiawroEarPmYMVat2im%2FXkQxklmRBVMObxick%3D&reserved=0' target='_blank' > meer info (pzh only) </a>"
        str = str + "<br>" + urltext;
      }
      task.innerHTML = str;
    }
}
}
