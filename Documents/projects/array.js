const prompt = require('prompt-sync')();
let n = Array(5)
for(i=0;i<=4;i++){
    n[i] = prompt(`Enter name #${i+1}:`); 
    console.log(n)
}
console.log(n[4])

/*const names = new Array(20); // create an array of size 20

for (let i = 0; i < names.length; i++) {
  names[i] = prompt(`Enter name #${i+1}:`); // ask user for name and store in array
}

/*console.log(names); // print array to console
 
let inputArray = [];
let size = 5; //Maximum Array size
let i=0
for( i=0; i<size; i++) {
	
	//Taking Input from user
	inputArray[i] = prompt('Enter Element ' + (i+1));
}

//Print the array in the console.
console.log(inputArray);
*/