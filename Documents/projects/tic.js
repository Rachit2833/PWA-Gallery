let turn = "X"
const changeturn =()=>{
    return turn ==="X"?"0":"X"
}
const fun =()=>{
     if(e.innerText === ''){
        e.innerText = turn
        changeturn()
     }
}
let boxes =  document.getElementsByClassName("box")
Array.from(boxes).forEach(element=>{
    let boxtext = document.querySelector(".boxtext")
 boxtext.addEventListener("click",fun())
})