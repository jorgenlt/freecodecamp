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
const sound = document.querySelector('#beep');

// functions
const playSound = () => sound.play();

let isPaused = false;

const timer = (countdownTime) => {
    // console.log(`countdownTime: ${countdownTime}`);
    // countdownTime = countdownTime - 1;
    // countdownTime = countdownTime;
    const t = () => {
            // If the countdown is over, display "EXPIRED" and stop the timer
        if (countdownTime == 0) {
            console.log(`countdownTime: ${countdownTime}`);
            playSound();
            timerEnded();
            clearInterval(x);
            console.log('interval cleared');
        } else if(!isPaused) {
            const minutes = Math.floor((countdownTime) / 60);
            const seconds = countdownTime % 60; 
        
            // Display the remaining time in mm:ss format
            timeLeft.innerHTML = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
            console.log(`countdownTime: ${countdownTime}`);
            countdownTime--; // Decrement the countdown time by 1 second
            console.log((minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
        };



        // const minutes = Math.floor((countdownTime) / 60);
        // const seconds = countdownTime % 60; 
    };

    t();
    
    let x = setInterval(() => {
        t();
    }, 1000);

    if(timerStatus === 'reset') {
        console.log('timer was reset');
        clearInterval(x);
        countdownTime = 25 * 60;
        timerStatus = 'default';
    };
};

const pause = () => {
    isPaused = true;
    timerStatusAtPause = timerStatus;
    timerStatus = 'paused'
    console.log('paused');
};

const resume = () => {
    isPaused = false;
    timerStatus = timerStatusAtPause;
    console.log('started');
}

const timerEnded = () => {
    console.log('timer ended');
    // timeLeft.innerHTML = '00:00';
    console.log(`timeLeft.innerHTML: ${timeLeft.innerHTML}`);
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
            // from 'default' status timer is starting and changing status to 'started'
            console.log('default');
            timerLabel.innerHTML = 'Session';
            const timeLengthSession = sessionLength.innerHTML * 60;
            timerStatus = 'started';
            timer(timeLengthSession);
            console.log('session started');
        break;
        case 'break':
            // with status 'break' the break session is started, 
            console.log('break');
            const timeLengthBreak = breakLength.innerHTML * 60;
            timerLabel.innerHTML = 'Break';
            timer(timeLengthBreak);
        default:
            console.log('error');
    };
};

const reset = () => {
    console.log('reset');
    timerStatus = 'reset';
    breakLength.innerHTML = 5;
    sessionLength.innerHTML = 25;
    timeLeft.innerHTML = '25:00';
    timerLabel.innerHTML = 'Session';
    sound.pause();
    sound.currentTime = 0;
    timer(sessionLength.innerHTML * 60);
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