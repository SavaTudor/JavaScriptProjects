/*
Return true if the given string is a palindrome. Otherwise, return false.
You'll need to remove all non-alphanumeric characters
*/


function removeNonAlpha(str){
    let regexAlpha = /[^a-zA-Z0-9]/;
    while(regexAlpha.test(str)){
      let index = str.search(regexAlpha);
      str = str.slice(0,index)+str.slice(index+1);
    }
    return str;
  }
  
  
  function palindrome(str) {
    str = removeNonAlpha(str).toLowerCase();
    let l = str.length;
    for(let i=0;i<l/2;i++){
        if(str[i]!==str[l-i-1]){
          return false;
        }
    }
    return true;
  }
  
  
  palindrome("eye");