//  parse  [http://www.example.org linktext]  wiki external link
//  hiden van [+.....]  dus tweede teken een +
//  [!   ]  =img  Met na | styleinfo

function parseW(zin) {
  let zinUit ="";
  let stylex ="style='max-width:100%'"
  let p2 ="";
  while (zin  != null && zin != "") {
    let positionA = zin.indexOf("[");    if (positionA >0 ) {positionSL = positionA};

    if (positionA ==-1 ) { zinUit = zinUit + zin; zin ="";    return zinUit; }   // geen [ meer dus klaar

    if (positionA >0 ) { zinUit = zinUit+ zin.slice(0,positionA); zin = zin.slice(positionA); }// er zit gewone tekst voor de [ , eraf slicen
//  als we hier zijn staat er dus een [ op de eerste positie van zin
    let positionB = zin.indexOf("]");
    if (positionB ==-1 ) {console.log("parsfout,geen]");   zinUit = zinUit + zin; zin ="";    return zinUit;    }  // klaar

    let xteken =zin.slice(1,2);
    if ( xteken == '+' ) {  // bij een + gooi alles tussne [] eruit
        zin = zin.slice(positionB+1);
    }
    else if ( xteken == '!' ) {  // bij een ! afbeelding invoegen
        let xurl = zin.slice(2,positionB);
        let positionl = xurl.indexOf("|"); // test of er een | in zit voor afmetingen img
        if (positionl !=-1 ) {
            console.log("er is een |");   
            console.log(xurl)
            
            styleinf = xurl.slice(positionl+1) 
            console.log(styleinf)
            xurl = xurl.slice(0,positionl) 
            console.log(xurl)
            if (styleinf != "") {  //voeg format voor plaatje in , dit kan nog uitgewerkt.
                stylex = styleinf
              
               
            }
         }  
    

         console.log(stylex)
        zinUit = zinUit + "<img src='" + xurl+"' " +stylex+">" ;
        console.log(zinUit)

        zin = zin.slice(positionB+1); 
    }
    else { //dus url
        let positionC = zin.indexOf(" ");
        if ( (positionC ==-1 ) || (positionB < positionC)) {  // er staat geen spatie tussen de []
            let xurl = zin.slice(1,positionB);
            let xlabel="*";
            zinUit = zinUit + '<a href="' + xurl + '" target="_blank">' + xlabel + '</a>' ;
            zin = zin.slice(positionB+1);

        } else { // er zit wel een spatie tussen de []
            let xurl = zin.slice(1,positionC);
            let xlabel=zin.slice(positionC+1,positionB);
            zinUit = zinUit + '<a href="' + xurl + '" target="_blank">' + xlabel + '</a>' ;
            zin = zin.slice(positionB+1);

        }
    }

  }  // end while

  return zinUit;
}
