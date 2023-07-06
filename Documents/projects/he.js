const prompt = require('prompt-sync')();
console.log("add 1")
console.log("sub 2")
console.log("mul 3")
console.log("div 4")
console.log("exit 5")
let a = prompt("enter the choise")
let b = prompt("enter first number")
let c = prompt("enter second number")
let d =0
switch (a) {
    case 1:
         d =c+b
        console.log(d)
        break;
        case 2:
             d =c-b
            console.log(d)
            break;
            case 3:
                 d =c*b
                console.log(d)
                break;
                case 4:
                     d =c/b
                    console.log(d)
                    break;
}
const abc =()=>{

}