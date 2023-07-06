const prompt = require('prompt-sync')();
let a = Math.round(Math.random() * 100)
let b = prompt('enter your guess')
let s = 0
for(let t=1;t<101;t++)
{
   if(a==b){
      console.log('correct guess')
      s=100-t
      console.log( s)
      break;
   }
   else if(a>b){
      console.log('try larger')
      let c = prompt('enter nxext guess')
      b=c
   }
   else if(a<b){
      console.log('try smaller')
      let c = prompt('enter next guess')
      b=c
   }
}    