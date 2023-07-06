var a =(Math.round( Math.random()*6)+1);
var b =(Math.round( Math.random()*6)+1);

if(a>b){
    document.getElementsByClassName("z")[a].classList.add("change");
document.getElementsByClassName("x")[b].classList.add("change");

    document.getElementsByClassName("g")[0].innerHTML="Player 1 Wins";

}
else if(a==b){
    document.getElementsByClassName("z")[a].classList.add("change");
document.getElementsByClassName("x")[b].classList.add("change");

    document.getElementsByClassName("g")[0].innerHTML="Its A Draw";
}

else{
    document.getElementsByClassName("z")[a].classList.add("change");
document.getElementsByClassName("x")[b].classList.add("change");

    document.getElementsByClassName("g")[0].innerHTML="Player 2 Wins";

}
