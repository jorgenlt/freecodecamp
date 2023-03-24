// variables
let sessionLengthInSeconds = 25 * 60;
let pauseTime;
let timerStatus = 'default';

// let timerDurationInSeconds = sessionLengthInSeconds;
let uniqueTimerContainerClassName = "timer-container";
let originalTextInContainer = '';
let timer = new SimpleTimer(sessionLengthInSeconds, uniqueTimerContainerClassName, originalTextInContainer);


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

// functions
const timerZero = () => {
    timeLeft.innerHTML = '00:00';
    document.getElementById('beep').play();
    start();
};

const secondsToMinutes = seconds => new Date(90 * 1000).toISOString().substring(14, 19);

const reset = () => {
    timerStatus = 'reset';
    timer.endTimer();
    sessionLengthInSeconds = 25 * 60;
    breakLength.innerHTML = 5;
    sessionLength.innerHTML = 25;
    timeLeft.innerHTML = '25:00';
    timerLabel.innerHTML = 'Session';
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
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

const start = () => {
    console.log('start executed');
    switch (timerStatus) {
        case 'default':
            console.log('case default');
            timerStatus = 'started';
            sessionLengthInSeconds = sessionLength.innerHTML * 60;
            timer = new SimpleTimer(sessionLengthInSeconds, uniqueTimerContainerClassName, originalTextInContainer);
            timer.startTimer();
            break;
        case 'reset':
            console.log('case reset');
            timerStatus = 'default';
            break;
        case 'pause':
            console.log('case pause');
            timerStatus = 'paused';
            break;
        case 'pauseBreak':
            console.log('case pauseBreak');
            timerStatus = 'pausedBreak';
            break;
        case 'paused':
            console.log('case paused');
            timerStatus = 'started';
            timer = new SimpleTimer(sessionLengthInSeconds, uniqueTimerContainerClassName, originalTextInContainer);
            timer.startTimer();
            break;
        case 'pausedBreak':
            console.log('case pausedBreak');
            timerStatus = 'newSession';
            timer = new SimpleTimer(sessionLengthInSeconds, uniqueTimerContainerClassName, originalTextInContainer);
            timer.startTimer();
            break;
        case 'break':
            console.log('case break');
            timerLabel.innerHTML = 'Break';
            timeLeft.innerHTML = `${breakLength.innerHTML}:00`
            sessionLengthInSeconds = breakLength.innerHTML * 60;
            timer = new SimpleTimer(sessionLengthInSeconds, uniqueTimerContainerClassName, originalTextInContainer);
            timer.startTimer();
            timerStatus = 'newSession'
            break;
        case 'newSession':
            console.log('case newSession');
            let pausedTime2 = timeLeft.innerHTML;
            if(pausedTime2 == '00:00') {
                timerStatus = 'started';
                timerLabel.innerHTML = 'Session';
                sessionLengthInSeconds = sessionLength.innerHTML * 60;
                timer = new SimpleTimer(sessionLengthInSeconds, uniqueTimerContainerClassName, originalTextInContainer);
                timer.startTimer();
            } else {
                timerStatus = 'pauseBreak';
                timer.endTimer();
                timeLeft.innerHTML = pausedTime2;
                let newSessionTime2 = pausedTime2.split(':');
                sessionLengthInSeconds = parseInt(newSessionTime2[0]) * 60 + parseInt(newSessionTime2[1]);
                originalTextInContainer = pausedTime2;
            };
            break;
        case 'started':
            console.log('case started');
            let pausedTime = timeLeft.innerHTML;
            if(pausedTime == '00:00') {
                // document.getElementById('beep').play();
                timerStatus = 'break';
                start();
            } else {
                timerStatus = 'pause';
                timer.endTimer();
                timeLeft.innerHTML = pausedTime;
                let newSessionTime = pausedTime.split(':');
                sessionLengthInSeconds = parseInt(newSessionTime[0]) * 60 + parseInt(newSessionTime[1]);
                originalTextInContainer = pausedTime;
            };
            break;
        default:
            console.log('case default');
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
timeLeft.addEventListener('DOMSubtreeModified', (event) => {

    // if(timer['_timeLeft'] == 0){
    //     switch (timerStatus) {
    //         case 'started':
    //             document.getElementById('beep').play();
    //             timerStatus = 'break';
    //             start();
    //             break;
    //         default:
    //             timerStatus = 'started';
    //             timerLabel.innerHTML = 'Session';
    //             sessionLengthInSeconds = sessionLength.innerHTML * 60;
    //             timer = new SimpleTimer(sessionLengthInSeconds, uniqueTimerContainerClassName, originalTextInContainer);
    //             timer.startTimer();
    //     };
    // };
    
    // if(timer['_timeLeft'] == 0) {
    //     console.log('timer is 0');
    // }
    
    
    
    
    // if(timeLeft.innerHTML == '00:00') {
        // setTimeout(() => { 
        //     timer.endTimer();
        //     timeLeft.innerHTML = '00:00';
            
        //     switch (timerStatus) {
        //         case 'started':
        //             document.getElementById('beep').play();
        //             timerStatus = 'break';
        //             timerLabel.innerHTML = 'Break';
        //             sessionLengthInSeconds = breakLength.innerHTML * 60;
        //             // originalTextInContainer = secondsToMinutes(sessionLengthInSeconds);
        //             timer = new SimpleTimer(sessionLengthInSeconds, uniqueTimerContainerClassName, originalTextInContainer)
        //             timer.startTimer();
        //             break;
        //         default:
        //             start();
        //     };
        // }, 1000);
    // };
});
