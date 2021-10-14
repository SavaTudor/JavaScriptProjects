/*
Return true if the passed string looks like a valid US phone number.
*/

function testParanteze(str){
    //testeaza parantezele care apar
    if(/\(/.test(str)){
      //daca avem paranteza deschisa, trebuie sa avem si una inchisa, dupa ea
        if(!/\)/.test(str) || str.indexOf(")")<str.indexOf("(") || str.indexOf(')')==str.length-1){
          return false;
        }
      }
    if(/\)/.test(str) && !/\(/.test(str)){
        //avem paranteza inchisa, dar nu avem deschisa
        return false;
      }
    let pD=0, pI=0;
    for(let i=0;i<str.length;i++){
      if(str[i]===')'){
        if(pI===1){
          return false;
        }
        pI++;
      }
      if(str[i]==='('){
        if(pD===1){
          return false;
        }
        pD++;
      }
    }
    return true;
}
  
  let testHasCountryCode = str => {
    const regexCountryCode = /^(.+\s)|^(.+\()/;
    return(regexCountryCode.test(str));
  }
  
  let testCountryCode = (str) =>{
      //inseamna ca numarul are country code
      if(str[0]!=="1" || (str[0]==="1" &&(str[1]!==" " && str[1]!=="("))){
        return false;
      }
    return true;
  }
  
  let testNumberCount = (str) =>{
    let count = 0;
    for(let i=0;i<str.length;i++){
      switch (str[i]){
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          count++;
          break;
        case ' ':
        case '(':
        case ')':
        case '-':
          break;
        default:
        return false;
      }
    }
    return count===10;
  }
  
  
  function telephoneCheck(str) {
    const arr = str.split("");
    if(str.length<10){
      return false;
    }
    if(!testParanteze(str)){
      return false;
    }
    if(testHasCountryCode(str)){
      if(!testCountryCode(str)){
        return false;
      }
      //luam indexul de la care incepe nr care are countryCode ca 2
      const clearNumber = str.slice(2);
      if(!testNumberCount(clearNumber)){
        return false;
      }
    }else{
        if(!testNumberCount(str)){
        return false;
      }
    }
    return true;
  }
  
  
  
console.log(telephoneCheck("(555)555-5555"));