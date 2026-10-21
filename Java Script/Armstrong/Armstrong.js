function isArmstrong(val){
    let k = val;
    let l = val.toString().length;

    let res = 0;

    while(k>0){
        let rem = k%10;
        res = res + rem**l;
        k = Math.floor(k/10);
    }

    if(val === res){
        return true;
    }else{
        return false;
    }
}

function checkArmstrong(){
    let val = Number(document.getElementById("result").value);
    if(isArmstrong(val)){
        document.getElementById("display").textContent = "Armstrong Number";
    }else{
        document.getElementById("display").textContent = "Not an Armstrong Number";
    }
}