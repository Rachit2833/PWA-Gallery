const prompt = require('prompt-sync')();
var a = prompt("enter whats in your mind");
console.log(a.length +" words"+" words left "+ (200-a.length));
var b = a.slice(0,100);
console.log(b);

