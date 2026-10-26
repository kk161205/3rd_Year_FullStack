let isArmstrong = ((val) => {
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
});

console.log(isArmstrong(153));