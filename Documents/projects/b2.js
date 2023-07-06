
let score=0


replay = true

while(replay)
{
   let a =Math.round(Math.random()*100)
   let b =prompt('enter your guess')
   check = (b)=>{
      return a==b?true:false
    }
    //this is a functions to check the equavalent number
   number =(b)=>{
      return a<b? true:false
    }
    //this is a function to compare the value of a and b
 for(t=1;t<100;t++)
 {
   if(check(b))
   {
      alert('you won')
      score = 100-t
      alert(score)
      replay = confirm('wanna play again')
      break;
   }
   else
   {
      if(number(b))
      {
         alert('try smaller')
        let c = prompt('enter next guess')
        b=c
      }
      else
      {
         alert('try larger')
        let c = prompt('enter next guess')
        b=c
      }
   
   }
  
 }
 
}
