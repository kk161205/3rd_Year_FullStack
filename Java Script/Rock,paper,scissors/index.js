let result = document.getElementById("result"); 
let comp = document.getElementById("computerChoice"); 
let user = document.getElementById("UserWin"); 
let compscore = document.getElementById("ComputerWin"); 

let userScore = 0; 
let computerScore = 0; 

function check(val){ 
    let a = val; 
    let choices = ["Rock", "Paper", "Scissors"]; 
    let computer = choices[Math.floor(Math.random() * 3)]; 
    comp.innerHTML = computer; 

    if (a === computer) { 
        result.innerHTML = "Draw"; 
    } else if (
        (a === "Rock" && computer === "Scissors") || 
        (a === "Paper" && computer === "Rock") || 
        (a === "Scissors" && computer === "Paper")
    ) { 
        result.innerHTML = "User Wins this round"; 
        userScore++; 
    } else { 
        result.innerHTML = "Computer Wins this round"; 
        computerScore++; 
    } 

    user.innerHTML = userScore; 
    compscore.innerHTML = computerScore; 

    if (userScore == 5 || computerScore == 5) { 
        if (userScore == 5) { 
            result.innerHTML = "GAME OVER: User Wins the Match!"; 
        } else { 
            result.innerHTML = "GAME OVER: Computer Wins the Match!"; 
        } 
        
        let buttons = document.getElementsByTagName("button");
        for (let i = 0; i < buttons.length; i++) {
            if(buttons[i].id !== "resetBtn") { 
                buttons[i].disabled = true; 
            }
        } 
    } 
} 

function reset(){ 
    userScore = 0; 
    computerScore = 0; 
    user.innerHTML = userScore; 
    compscore.innerHTML = computerScore; 
    result.innerHTML = ""; 
    let buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false; 
    }
}