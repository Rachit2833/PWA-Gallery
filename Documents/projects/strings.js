/*String length
String slice()
String substring()
String substr()
String replace()
String replaceAll()
String toUpperCase()
String toLowerCase()
String concat()*/

const prompt = require('prompt-sync')();
let name = prompt('enter the string')
let n = name.length
console.log(name[n-1])
console.log(name.toUpperCase())
console.log(name.toLowerCase())
console.log(name.slice(2,3))
console.log(name.slice(2,4))
console.log(name.slice(2))
let line = prompt('enter the line')
 let m = line.replace("hello","hii")
 console.log(m)