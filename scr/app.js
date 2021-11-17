const PLijst = document.querySelector('#lijst');



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
      console.log(punti);

      if (punt["type"] == "cirkel") {
        console.log("een cirkel!");
        marker =  L.circle(punt["latlon"], punt["straal"], {color: '#281f6b',fillColor: '#efcc36',fillOpacity: 0.1}).addTo(map);
        }
      else {
         if (punt["type"] == "polygoon") {
           console.log("een polygoon");
           marker = L.polygon(punt["poly"],{color: '#281f6b',fillColor: '#efcc36',fillOpacity: 0.1}).addTo(map);
         }
       else {
        console.log("een punt");
      marker = L.marker(punt["latlon"]).addTo(map);
      }
    }
      urltext= "<a href='https://eur03.safelinks.protection.outlook.com/ap/w-59584e83/?url=https%3A%2F%2Fpzh-my.sharepoint.com%2F%3Aw%3A%2Fg%2Fpersonal%2Fra_haverman_pzh_nl%2FEYVr7u137k1InYvJLCtjT8EBTb20vDB10Et3UOvOosGtUQ%3Fe%3DbWDWDT&data=04%7C01%7Cra.haverman%40pzh.nl%7C26720f2d8b224028bbbb08d9a819bf64%7C6d99bc288f284a73a50163a8e1eb3040%7C0%7C0%7C637725650795165583%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000&sdata=ZSMBJg%2FiawroEarPmYMVat2im%2FXkQxklmRBVMObxick%3D&reserved=0' target='_blank' > meer info (pzh only) </a>"
      text = "<p><b>" + punt["titel"] +  "</b></p><p>" + punt["link"]+ "</p><p>" + urltext + "</p>";
      marker.bindPopup(text);

    }
}

function renderLijst(json){  // vul lijst met projecten op basis Json
  for(punti in json) {
    punt = json[punti];
    console.log(punti);
    console.log(punt);

    let li = document.createElement('li');
    PLijst.appendChild(li);
    let task = document.createElement('span');
    task.classList.add("tekst");
    li.appendChild(task);
    str = "<h3>" + punt["titel"] +"</h3><br>" + punt["link"]
    task.innerHTML = str;
//    task.addEventListener('click', (e) => {klikknop(e);  }); //voor klik op de tekst

}
}
