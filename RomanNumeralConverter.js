function convertUnitati(str){
    //primeste un string reprezentand o cifra
    //returneaza un string reprezentand cifra romana a unitatii
    //adica una din [I, II, III, IV, V, VI, VII, VIII, IX]
    //daca num este 0 se returneaza un string vid
    if(str==='0'){
      return "";
    }
    switch(str){
      case '1':
        return 'I';
      case '2':
        return 'II';
      case '3':
        return 'III';
      case '4':
        return 'IV';
      case '5':
        return 'V';
      case '6':
        return 'VI';
      case '7':
        return 'VII';
      case '8':
        return 'VIII';
      case '9':
        return 'IX';
    }
  }
  
  function convertZeci(str){
     //primeste un string reprezentand o cifra
    //returneaza un string reprezentand cifra romana a zecii
    //adica una din [X, XX, XXX, XL, L, LX, LXX, LXXX, XC];
    if(str==='0'){
      return "";
    }
    switch(str){
      case '1':
        return 'X';
      case '2':
        return 'XX';
      case '3':
        return 'XXX';
      case '4':
        return 'XL';
      case '5':
        return 'L';
      case '6':
        return 'LX';
      case '7':
        return 'LXX';
      case '8':
        return 'LXXX';
      case '9':
        return 'XC';
    }
  }
  
  function convertSute(str){
     //primeste un string reprezentand o cifra
    //returneaza un string reprezentand cifra romana a sutelor
    //adica una din [C, CC, CCC, CD, D, DC, DCC, DCCC, CM];
    if(str==='0'){
      return "";
    }
    switch(str){
      case '1':
        return 'C';
      case '2':
        return 'CC';
      case '3':
        return 'CCC';
      case '4':
        return 'CD';
      case '5':
        return 'D';
      case '6':
        return 'DC';
      case '7':
        return 'DCC';
      case '8':
        return 'DCCC';
      case '9':
        return 'CM';
    }
  }
  
  function convertMii(str){
    //primeste un string reprezentand o cifra
    //returneaza un string reprezentand cifra romana a miilor
    //adica una din [M, MM, MMM]; doar pana la 3000 au
    if(str==='0'){
      return "";
    }
    switch(str){
      case '1':
        return 'M';
      case '2':
        return 'MM';
      case '3':
        return 'MMM';
    }
  }
  
  function convertGeneral(str, ind){
    //str - un string reprezentand o cifra pe care o convertim
    //ind - indexul in numar:
    //0-unitati, 1-zeci, 2-sute, 3-mii
    switch(ind){
      case 0:
        return convertUnitati(str);
      case 1:
        return convertZeci(str);
      case 2:
        return convertSute(str);
      case 3:
        return convertMii(str);
    }
  }
  
  function convertToRoman(num) {
    let arrCifre = num.toString().split("");
    const nrCifre = arrCifre.length;
    let rez = "";
    for(let i=0;i<nrCifre;i++){
        rez+=convertGeneral(arrCifre[i], nrCifre-i-1);
    }
    // console.log(rez);
   return rez;
  }
  
  
  
  convertToRoman(400);