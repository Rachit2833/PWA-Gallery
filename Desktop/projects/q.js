const prompt = require('prompt-sync')();
let a = Math.random() * 100;
let b = prompt('enter your guess')
let s = 0
for(let t = 0;t<100;t++){
   if(a==b){
      console.log('correct guess')
      s=100-t
      console.log(s)
      break;
   }
   else if(a>b){
      console.log('try larger')
      let c = prompt('enter new guess')
      b==c
   }
   else if(a<b){
      console.log('try smaller')
      let c = prompt('enter new guess')
      b==c
   }
}