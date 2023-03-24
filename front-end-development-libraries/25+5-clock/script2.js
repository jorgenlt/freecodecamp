// variables
// let sessionLengthInSeconds = 25 * 60;
// let pauseTime;
let timerStatus = 'default';

// // let timerDurationInSeconds = sessionLengthInSeconds;
// let uniqueTimerContainerClassName = "timer-container";
// let originalTextInContainer = '';
// let timer = new SimpleTimer(sessionLengthInSeconds, uniqueTimerContainerClassName, originalTextInContainer);


// elements
const timerLabel = document.querySelector('#timer-label');
const timeLeft = document.querySelector('#time-left');
const startStopBtn = document.querySelector('#start_stop');
const resetBtn = document.querySelector('#reset');
const breakIncrementBtn = document.querySelector('#break-increment');
const breakLength = document.querySelector('#break-length');
const breakDecrementBtn = document.querySelector('#break-decrement');
const sessionIncrementBtn = document.querySelector('#session-increment');
const sessionLength = document.querySelector('#session-length');
const sessionDecrementBtn = document.querySelector('#session-decrement');
const sound = document.querySelector('#sound');

// functions
// let countdownTime = 90;
const playSound = () => sound.play();

const timer = (countdownTime) => { 
    setInterval(() => {
        // Calculate minutes and seconds from countdown time
        const minutes = Math.floor(countdownTime / 60);
        const seconds = countdownTime % 60;
    
        // Display the remaining time in mm:ss format
        timeLeft.innerHTML = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    
        // If the countdown is over, display "EXPIRED" and stop the timer
        if (countdownTime === 0) {
            playSound();
            timerEnded();
        // clearInterval(countdownTime);
        // document.getElementById("countdown").innerHTML = "EXPIRED";
        } else {
        countdownTime--; // Decrement the countdown time by 1 second
        };

        console.log(`countdownTime: ${countdownTime}`);
        console.log((minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds);

    }, 1000);
};

const timerEnded = () => {
    console.log('timer ended');
};

const increment = (element) => {
    if(element.innerHTML < 60) {
        element.innerHTML++;
    };
};

const decrement = (element) => {
    if(element.innerHTML > 1) {
        element.innerHTML--;
    };
};

// event listeners
startStopBtn.addEventListener('click', event => start());
resetBtn.addEventListener('click', event => reset());
breakIncrementBtn.addEventListener('click', (event) => {
    increment(breakLength);
});
breakDecrementBtn.addEventListener('click', (event) => {
    decrement(breakLength);
});
sessionIncrementBtn.addEventListener('click', (event) => {
    increment(sessionLength);
    timeLeft.innerHTML = `${sessionLength.innerHTML}:00`
});
sessionLength.addEventListener('click', event => event);
sessionDecrementBtn.addEventListener('click', (event) => {
    decrement(sessionLength);
    timeLeft.innerHTML = `${sessionLength.innerHTML}:00`
});