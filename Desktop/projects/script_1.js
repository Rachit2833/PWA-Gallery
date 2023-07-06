// var a = document.querySelectorAll("button");
// a.forEach(button => button.addEventListener("click", alf));
// var string = "";
// function alf() {
//     if (this.innerHTML === "=") {
//         string = eval(string);
//         document.querySelector("input").value = string;
//     }
//     else if (this.innerHTML == "C") {
//         string = "";
//         document.querySelector("input").value = string;
//     }
//     else if (this.innerHTML == "X") {
//         var n2 = document.querySelector("input").value;
//         var num = Math.round(n2 / 10);
//         if (num == 0) {
//             string = "";
//             document.querySelector("input").value = string;
//         }
//         else {
//             string = num;
//             document.querySelector("input").value = string;
//         }

//     }
//     else {
//         string = string + this.innerHTML;
//         document.querySelector("input").value = string;
//     }

// }
var string ="";
$("button").click(afl);
function afl(){
    if($(this).html() === "="){
     string = eval(string);
     $("input").val(string);
    }
    else if($(this).html() ==="C"){
    string ="";
    $("input").val(string);
    }
    else if($(this).html() ==="X"){
     var n2 = $("input").val();
 var num = Math.round(n2/10);
 if(num ==0 || num==1){
    string ="";
    $("input").val(string);
 }
 else{
    string = num;
    $("input").val(string);
 }
    }
    else{
        string = string + $(this).html();
        $("input").val(string);
    }
}



