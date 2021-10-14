/*
Function takes a ROT13 encoded string as input and returns a decoded string.
*/

function decodeLetter(str){
    //primeste un string reprezentand o litera
    //returneaza litera corespunzatoare dupa codarea ROT13
    if(str.charCodeAt(0)<78){
      return String.fromCharCode((str.charCodeAt(0)+13));
    }
    return String.fromCharCode((str.charCodeAt(0)-13))
}
  
function rot13(str) {
    let arr = str.split("");
    return arr.map(char=>('A'<=char && char<="Z")?decodeLetter(char):char).join("");  
}
  
console.log(rot13("V YBIR WF"));