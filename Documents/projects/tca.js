let turn ="X"
const changeturn =()=>{
    return turn ==="X"?"0":"X"
}
const fun =()=>{
 if(innerText === ''){
    innertext = turn
    turn=changeturn()
 }
}
let box = document.getElementsByClassName("box")
Array.from(box).forEach(element =()=>{
    let newbox = document.querySelector(".text")
    element.addEventListener("click",fun())
})