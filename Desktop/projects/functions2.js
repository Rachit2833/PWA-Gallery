const prompt = require('prompt-sync')();
function sum(x, y){
    return  (x + y)
}
let a = Number(prompt("enter a"))
let b = Number(prompt("enter b"))
let c = Number(prompt("enter c"))

console.log(sum(a,b))
console.log(sum(b,c))
