let inc = document.getElementById('increment');
let dec = document.getElementById('decrement');
let reset = document.getElementById('reset');
let count = document.getElementById('count');
let num = 0;

inc.addEventListener('click', () => {
    num++;
    count.textContent = num;
});
dec.addEventListener('click', () => {
    num--;
    count.textContent = num;
});
reset.addEventListener('click', () => {
    num = 0;
    count.textContent = num;
});