const prompt = require('prompt-sync')();
let names = Array(5)
let marks = Array(5)
for(let i = 0;i<5;i++){
    names[i]=prompt('enter the name of student')
    marks[i]=prompt('enter the marks of student')
}
let r = prompt('enter r')
console.log(`${names[r]}: ${marks[r]}:`)
