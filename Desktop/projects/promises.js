const { get } = require("prompt");

/*onst xyz = new Promise((resolve, reject) => {
    let abc = true
    if(abc){
        resolve("problem resolved")
    }
    else{
        reject("probjem rejected")
    }
})
xyz
.then((data)=>{
    console.log("proble solved",data)
})
.catch((data)=>{
    console.log("proble rejected",data)
})*/
const getcheeze =()=>{
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            let cheeze = "🟡"
       resolve(cheeze)
        }, 2000);
    })

}
const makedough =(cheeze)=>{
    return new Promise((resolve, reject) => {
       setInterval(() => {
        let dough = "⚪️"
        resolve(dough)
       }, 2000);
    })

}
const bakepizza =(dough)=>{
   return new Promise((resolve, reject) => {
        setTimeout(() => {
            let pizza = "🍕"
        resolve (pizza)
        }, 2000);
    })

}
getcheeze()
.then((cheeze)=>{
    console.log("here is the cheeze",cheeze);
    return makedough(cheeze)
}).then((dough)=>{
  console.log("here is the dough",dough);
   return bakepizza(dough)
}).then((pizza)=>{
    console.log("got the pizza",pizza)
    return bakepizza(pizza)
})
