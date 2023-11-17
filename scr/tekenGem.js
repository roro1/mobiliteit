
gemOpacity= 0.2
gemFill= 0

      function regioKleur(str) {
        if (str < 60 ) {
          tst2 = gemData[str]["regio"];
          tst4 = regio[tst2]["kleur"];
        } else tst4 ="purple"
        return tst4
      }


       L.geoJSON(gemeentes, {
           style: function(feature) {
             var myStyle = {
                 "color": "Black",
                 "fillColor" : regioKleur(feature.properties.code),
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
    return txt;
}).addTo(map);
