let tries = document.getElementById("tries");
let result = document.getElementById("result");
let random = Math.floor(Math.random() * 10) + 1;

let count = 7;

function check() {
    let val = document.getElementById("val").value;
    if(val == ""){
        result.innerHTML = "Please enter a number";
        return;
    }
    if (val == random) {
        result.innerHTML = "Correct";
        document.getElementById("val").disabled = true;
    }
    else if (val < random) {
        result.innerHTML = "Too low";
    }    
    else{
        result.innerHTML = "Too high";
    }    
    count--;
    tries.innerHTML = count;
    if(count == 0){
        result.innerHTML = "Game Over";
        document.getElementById("val").disabled = true;
    }
}

function reset(){
    random = Math.floor(Math.random() * 10) + 1;
    count = 7;
    tries.innerHTML = count;
    result.innerHTML = "";
    document.getElementById("val").value = "";
    document.getElementById("val").disabled = false;
}