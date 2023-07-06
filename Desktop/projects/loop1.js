const prompt = require('prompt-sync')();
let n = prompt('enter the number ')
//ifelseloop
/*if(n>10){
    console.log(n)
}
else{
    console.log("fu")
}
//while loop
while (n<=100) {
    console.log(n)
    n++;
}*/
do {
    console.log(Math.pow(n,2))
    n++
}
while (n <=5);

