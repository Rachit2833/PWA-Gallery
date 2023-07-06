const prompt = require('prompt-sync')();
// Ask the user to enter two numbers
let firstNumber = prompt("Enter the first number:");
let secondNumber = prompt("Enter the second number:");

// Convert the input strings to numbers
firstNumber = Number(firstNumber);
secondNumber = Number(secondNumber);

// Add the numbers and store the result in a variable
let sum = firstNumber + secondNumber;

// Display the result
console.log("The sum of " + firstNumber + " and " + secondNumber + " is " + sum);
if (sum % 2 == 0) {
    console.log( sum + 'is an even number');
} 
{
    console.log(sum + 'is an odd number.');
}   
else if(sum < 0){
    console.log("numbers are negative")
}
if (sum % 2 == 0) {
    console.log(sum + 'number is even')
}
else {
    console.log(sum + 'number is odd')
}
for(i=1;i<=100;i++){
}
let n=prompt('enter the  value for n')
let h = 0
for(k = 0;k<n;k++){
    h=k+h
console.log(h)  
}
do{ 
    console.log(h)
}
while(h%2==0){
    console.log('odd')
}