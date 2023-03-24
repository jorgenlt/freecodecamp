// variables
// let sessionLengthInSeconds = 25 * 60;
// let pauseTime;
let timerStatus = 'default';
let timerStatusAtPause = '';

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
const playSound = () => sound.play();

let isPaused = false;

const timer = (countdownTime) => {
    // countdownTime = countdownTime - 1;
    countdownTime = countdownTime - 1;
    let x = setInterval(() => {
        if(timerStatus === 'default') {
            console.log('timer was reset');
            clearInterval(x);
            countdownTime = 25 * 60;
        };

        if(!isPaused) {
            const minutes = Math.floor((countdownTime) / 60);
            const seconds = countdownTime % 60; 
        
            // Display the remaining time in mm:ss format
            timeLeft.innerHTML = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        
            // If the countdown is over, display "EXPIRED" and stop the timer
            if (countdownTime === 0) {
                clearInterval(x);
                playSound();
                timerEnded();
            } else {
            countdownTime--; // Decrement the countdown time by 1 second
            console.log(`countdownTime: ${countdownTime}`);
            console.log((minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
            };
        };

    }, 1000);
};

const pause = () => {
    isPaused = true;
    timerStatusAtPause = timerStatus;
    timerStatus = 'paused'
};

const resume = () => {
    isPaused = false;
    timerStatus = timerStatusAtPause;
}

const timerEnded = () => {
    console.log('timer ended');
    switch (timerStatus) {
        case 'started':
            timerStatus = 'break'
            start();
        break;
        case 'break':
            timerStatus = 'default';
            start();
        default:
    };
};

const start = () => {
    switch (timerStatus) {
        case 'default':
            console.log('default');
            const timeLengthSession = sessionLength.innerHTML * 60;
            timerStatus = 'started';
            timer(timeLengthSession);
        break;
        case 'break':
            console.log('break');
            const timeLengthBreak = breakLength.innerHTML * 60;
            timerStatus = 'started';
            timer(timeLengthBreak);
            timerLabel.innerHTML = 'Break';
        default:
            console.log('error');
    };
};

const reset = () => {
    timerStatus = 'default';
    breakLength.innerHTML = 5;
    sessionLength.innerHTML = 25;
    timeLeft.innerHTML = '25:00';
    timerLabel.innerHTML = 'Session';
    sound.pause();
    sound.currentTime = 0;
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
startStopBtn.addEventListener('click', event => {
    if(timerStatus === 'paused') {
        resume();
    } else if(timerStatus === 'started') {
        pause();
    } else {
        start();
    };
});
resetBtn.addEventListener('click', event => reset());
breakIncrementBtn.addEventListener('click', (event) => {
    increment(breakLength);
});
breakDecrementBtn.addEventListener('click', (event) => {
    decrement(breakLength);
});
sessionIncrementBtn.addEventListener('click', (event) => {
    increment(sessionLength);
    timeLeft.innerHTML = (sessionLength.innerHTML < 10 ? "0" : "") + sessionLength.innerHTML + ':00';
});
sessionLength.addEventListener('click', event => event);
sessionDecrementBtn.addEventListener('click', (event) => {
    decrement(sessionLength);
    timeLeft.innerHTML = (sessionLength.innerHTML < 10 ? "0" : "") + sessionLength.innerHTML + ':00';
});