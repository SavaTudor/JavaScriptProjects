/*
Design a cash register drawer function which returns an object with a status key and a change key.
{status: "INSUFFICIENT_FUNDS", change: []}
{status: "CLOSED", change: [...]}
{status: "OPEN", change: [...]}
*/
let valuta = {
    'PENNY': 0.01,
    'NICKEL': 0.05,
    'DIME': 0.1,
    'QUARTER': 0.25,
    'ONE': 1,
    'FIVE': 5,
    'TEN': 10,
    'TWENTY': 20,
    'ONE HUNDRED': 100
  }
  
  let sumCid = (cid) =>{
    let num = cid.reduce((sum, elem) => sum+elem[1], 0);
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
  
  let sumArray = (arr) =>{
    if(arr.length==0){
      return 0;
    }
    let num = arr.reduce((sum, elem) => sum+elem, 0);
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
  
  let maiEste = (cid, currency) =>{
    //verifica daca mai sunt obiecte de tipul currency in cid
    for(let i=0;i<cid.length;i++){
      if(cid[i][0]===currency){
        if(cid[i][1]===0){
          return 0;
        }else{
          return Math.round(cid[i][1]/valuta[currency]);
        }
      }
    }
  }
  
  let maiSuntMonede = (cid) =>{
    //returneaza 0 daca nu mai sunt monede
    //sau suma monedelor ramase
    const sum = maiEste(cid, "PENNY") + maiEste(cid, "NICKEL") + maiEste(cid, "DIME") + maiEste(cid, "QUARTER");
    if(sum===0){
        return 0;
    }
    return sum;
  }
  
  let maiSuntBancnote = cid => {
    const sum = maiEste(cid, "ONE") + maiEste(cid, "FIVE") + maiEste(cid, "TEN") + maiEste(cid, "TWENTY") + maiEste(cid, "ONE HUNDRED");
    if(sum===0){
        return 0;
    }
    return sum;
  }
  
  let maiEsteRest = cid => {
    return maiSuntMonede(cid) + maiSuntBancnote(cid);
  }
  
  let scoate =(cid, currency) => {
    for(let i=0;i<cid.length;i++){
      if(cid[i][0]===currency){
        cid[i][1] -= valuta[currency];
        return;
      }
    }
  }
  
  function almost(a, b, delta = 0.0000000000001){
      return Math.abs(a - b) < delta
  }
  
  let calculDupaVirgula = (rest,cid) =>{
    //array = cifrele de dupa virgula restului
    //cid = cash-in-drawer
    //returneaza un 2d array de forma [[currency unit, amount]];
    if(rest===0){
      return [];
    }
    let rez = [];
    while(!almost(sumArray(rez),rest) && maiSuntMonede(cid)>rest){
      if(rest-sumArray(rez)>=0.25 && maiEste(cid, "QUARTER")){
        rez.push(valuta["QUARTER"]);
        scoate(cid, "QUARTER");
      }else if(rest-sumArray(rez)>=0.1 && maiEste(cid, "DIME")){
        rez.push(valuta["DIME"]);
        scoate(cid, "DIME");
      }else if(rest-sumArray(rez)>=0.05 && maiEste(cid, "NICKEL")){
        rez.push(valuta["NICKEL"]);
        scoate(cid, "NICKEL");
      }else if(maiEste(cid, "PENNY")){
        rez.push(valuta["PENNY"]);
        scoate(cid, "PENNY");
      }
    }
    if(sumArray(rez)!==rest && maiSuntMonede(cid)<rest){
      return "INSUFFICIENT";
    }
    return rez;
  }
  
  let calculInainteVirgula = (rest, cid) =>{
    if(rest===0){
      return [];
    }
    let rez=[];
    while(sumArray(rez)!==rest && maiEsteRest(cid)>rest){
      if(rest-sumArray(rez)>=100 && maiEste(cid, "ONE HUNDRED")){
        rez.push(valuta["ONE HUNDRED"]);
        scoate(cid, "ONE HUNDRED");
      }else if(rest-sumArray(rez)>=20 && maiEste(cid, "TWENTY")){
        rez.push(valuta["TWENTY"]);
        scoate(cid, "TWENTY");
      }else if(rest-sumArray(rez)>=10 && maiEste(cid, "TEN")){
        rez.push(valuta["TEN"]);
        scoate(cid, "TEN");
      }else if(rest-sumArray(rez)>=5 && maiEste(cid, "FIVE")){
        rez.push(valuta["FIVE"]);
        scoate(cid, "FIVE");
      }else if(rest-sumArray(rez)>=1 && maiEste(cid, "ONE")){
        rez.push(valuta["ONE"]);
        scoate(cid, "ONE");
      }else if(rest-sumArray(rez)>=0.25 && maiEste(cid, "QUARTER")){
        rez.push(valuta["QUARTER"]);
        scoate(cid, "QUARTER");
      }else if(rest-sumArray(rez)>=0.1 && maiEste(cid, "DIME")){
        rez.push(valuta["DIME"]);
        scoate(cid, "DIME");
      }else if(rest-sumArray(rez)>=0.05 && maiEste(cid, "NICKEL")){
        rez.push(valuta["NICKEL"]);
        scoate(cid, "NICKEL");
      }else if(maiEste(cid, "PENNY")){
        rez.push(valuta["PENNY"]);
        scoate(cid, "PENNY");
      }
    }
    if(sumArray(rez)!==rest && maiSuntMonede(cid)<rest){
      return "INSUFFICIENT";
    }
    return rez;
  }
  
  let esteValuta = (arr, currency) =>{
    for(let i=0;i<arr.length;i++){
      if(arr[i][0]===currency){
        return i;
      }
    }
    return -1;
  }
  
  let transform = (arr) =>{
    // returneaza un array corespunzator pentru obiectul returnat la final
    let rez=[];
    let index = 0;
    for(let i=0;i<arr.length;i++){
      switch (arr[i]){
        case 100:
          index = esteValuta(rez,"ONE HUNDRED");
          if(index!==-1){
            rez[index][1]+=100;
          }else{
            rez.push(["ONE HUNDRED", 100]);
          }
          break;
        case 20:
          index = esteValuta(rez,"TWENTY");
          if(index!==-1){
            rez[index][1]+=20;
          }else{
            rez.push(["TWENTY", 20]);
          }
          break;
        case 10:
          index = esteValuta(rez,"TEN");
          if(index!==-1){
            rez[index][1]+=10;
          }else{
            rez.push(["TEN", 10]);
          }
          break;
        case 5:
          index = esteValuta(rez,"FIVE");
          if(index!==-1){
            rez[index][1]+=5;
          }else{
            rez.push(["FIVE", 5]);
          }
          break;
        case 1:
          index = esteValuta(rez,"ONE");
          if(index!==-1){
            rez[index][1]++;
          }else{
            rez.push(["ONE", 1]);
          }
          break;
        case 0.25:
          index = esteValuta(rez,"QUARTER");
          if(index!==-1){
            rez[index][1]+=0.25;
          }else{
            rez.push(["QUARTER", 0.25]);
          }
          break;
        case 0.1:
          index = esteValuta(rez,"DIME");
          if(index!==-1){
            rez[index][1]+=0.1;
          }else{
            rez.push(["DIME", 0.1]);
          }
          break;
        case 0.05:
          index = esteValuta(rez,"NICKEL");
          if(index!==-1){
            rez[index][1]+=0.05;
          }else{
            rez.push(["NICKEL", 0.05]);
          }
          break;
        case 0.01:
          index = esteValuta(rez,"PENNY");
          if(index!==-1){
            rez[index][1]+=0.01;
          }else{
            rez.push(["PENNY", 0.01]);
          }
          break;
      }
    }
    return rez;
  }
  
  function checkCashRegister(price, cash, cid) {
    if((cash-price) > sumCid(cid)){
      return {
        status: "INSUFFICIENT_FUNDS", change: []
      };
    }
    const rest = Math.round(((cash-price) + Number.EPSILON) * 100) / 100;
    if(almost(sumCid(cid),rest)){
      return {status:"CLOSED", change:cid};
    }
    const arr = (""+(rest)).split("");
    const indexPunct = arr.indexOf('.');
    let monede = 0;
    if(indexPunct!==-1){
      //calculam restul de monede
      const restDupaVirgula = rest - Math.floor(rest);
      monede = calculDupaVirgula(restDupaVirgula, cid);
      if(monede==="INSUFFICIENT"){
        return {status: "INSUFFICIENT_FUNDS", change: []}
      };
    }
    const bancnote = calculInainteVirgula(Math.floor(rest), cid);
    if(bancnote==="INSUFFICIENT"){
        return {status: "INSUFFICIENT_FUNDS", change: []};
    }
    return {status:"OPEN", change:transform(bancnote.concat(monede))};
  }

  console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));