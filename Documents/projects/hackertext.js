letter = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
let iterations = 0
document.querySelector("h1").onmouseover = event =>{
 
 const interval =   setInterval(()=>{
    event.target.innerText = event.target.innerText.split("")
    .map((letter, index)=>{letter[Math.round(Math.random()*26)])}.join("");
    if(iterations >=10)clearInterval(interval);
    iterations += 1;
},40

    


