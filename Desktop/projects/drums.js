// // var a = document.querySelectorAll("button");
// // a.forEach(addEventListener("click", abc));
// // function abc() {
// //     alert("i got clicked")
// // }
document.addEventListener("keypress",press);
function press(keys){
   var k_e = keys.key;
   k_e =k_e.toUpperCase();
   console.log(k_e);
   if(k_e=='W'){
    var a = new Audio('tom-1.mp3')
    a.play();
}
else if(k_e=='A'){
    var a = new Audio('tom-2.mp3')
    a.play();
}
else if(k_e=='S'){
    var a = new Audio('tom-3.mp3')
    a.play();
}
else if(k_e=='D'){
    var a = new Audio('tom-4.mp3')
    a.play();
}
else if(k_e=='J'){
    var a = new Audio('snare.mp3')
    a.play();
}
else if(k_e=='K'){
    var a = new Audio('crash.mp3')
    a.play();
}
else if (k_e=='L'){
    var a = new Audio('kick-bass.mp3')
    a.play();
}

}
var a = document.querySelectorAll("button").length;
for (i = 0; i <= a; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", abc);
}
function abc() {
var g = this.innerHTML;

    if(g=='W'){
        var a = new Audio('tom-1.mp3')
        a.play();
    }
    else if(g=='A'){
        var a = new Audio('tom-2.mp3')
        a.play();
    }
    else if(g=='S'){
        var a = new Audio('tom-3.mp3')
        a.play();
    }
    else if(g=='D'){
        var a = new Audio('tom-4.mp3')
        a.play();
    }
    else if(g=='J'){
        var a = new Audio('snare.mp3')
        a.play();
    }
    else if(g=='K'){
        var a = new Audio('crash.mp3')
        a.play();
    }
    else{
        var a = new Audio('kick-bass.mp3')
        a.play();
    }
}


