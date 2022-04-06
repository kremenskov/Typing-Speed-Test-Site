const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input")



let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;
let dictionary =[];

window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    document.getElementById("restart-test").style.display = "none";
    userInput.disabled = true;
    random_item(items)
}

// Random text section
function random_item(items)
{
for (var i=0; i<50; i++){
dictionary.push( items[Math.floor(Math.random()*items.length)]); }
data = dictionary.join(' ').charAt(0).toUpperCase() + dictionary.join(' ').substring(1); // объединяет в строку, разделённую пробелом, попутно делая заглавную букву
quote = data.content;

let arr = data.split("").map((value) => {
    return "<span class='quote-chars'>" + value +"</span>";
})
quoteSection.innerHTML += arr.join("");
}

// Array for random text generator
var items = ["great", 
    "may",
    "answer",
    "town",
    "find",
    "example",
    "show",
    "play",
    "taking",
    "hear",
    "hello",
    "question",
    "know",
    "few",
    "went",
    "stop",
    "should",
    "often",
    "great",
    "just",
    "between",
    "something",
    "until",
    "above",
    "miles",
    "change",
    "found",
    "every",
    "below",
    "important",
    "where",
    "happiness"];

// Change language
let navbar = document.querySelector('.lang-select');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
}

// Timer
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (time == 0) {
        displayResult();
    } else {
        document.getElementById("timer").innerText = --time;}
    }

// Start Test button
const startTest = () => {
    mistakes = 0;
    timer = "";
    timeReduce();
    userInput.disabled = false;
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
}

// Restart Test button
const restartTest = () => {
    document.getElementById("quote").innerHTML = "";
    dictionary.length = 0;
    userInput.value = "";
    document.getElementById("timer").innerHTML = "60"
    document.getElementById("mistakes").innerHTML = "0"
    random_item(items);
    startTest();
    document.getElementById("restart-test").style.display = "none";
    document.querySelector(".result").style.display = "none";
    document.getElementById("stop-test").style.display = "block";

}

// array from user input
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);
    let userInputChars = userInput.value.split(""); 
    
// if input text is correct
    quoteChars.forEach((char,index) => {

        if (char.innerText == userInputChars[index]){ // ОБРАТИТЬ ВНИМАНИЕ НА ЭТОТ ФРАГЕМЕНТ
            char.classList.add("success");
        }
        // backspace
        else if(userInputChars [index] == null){
            if (char.classList.contains("success")){
                char.classList.remove("success");
            }
            else {
                char.classList.remove("fail");
            }
        }
// if user made a mistake
        else{
            if(!char.classList.contains("fail")) {
                mistakes += 1;
                char.classList.add("fail");
            }
        console.log(mistakes)
        document.getElementById("mistakes").innerText = mistakes;
        }

        let check = quoteChars.every((element) => {
            return element.classList.contains("success");

        });

        if (check) {
            displayResult();
               
        }
    });
})

// Results
const displayResult = () => {
    
    document.getElementById("restart-test").style.display = "block";
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 1;
    if (time !=0) {
        timeTaken = (60 - time) / 100;
        console.log((userInput.value.length))
    }
    let accuracyCounter = Math.round(((userInput.value.length - mistakes)/ userInput.value.length)*100)
    console.log(accuracyCounter)
    let wpmCounter = (userInput.value.length /timeTaken/5).toFixed(0)
    
    document.getElementById("wpm").innerText = wpmCounter + " " + "wpm";
    document.getElementById("accuracy").innerText = accuracyCounter +"%";
    if (isNaN(accuracyCounter)){
        document.getElementById("accuracy").innerText = "none";
    }
    if (isNaN(wpmCounter)){
        document.getElementById("wpm").innerText = "none";
    }
};
