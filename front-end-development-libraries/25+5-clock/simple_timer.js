class SimpleTimer{constructor(t,e,i){this.functionsToExecuteAtTimerEnd=function(){timerZero();},this._everySecond=1e3,this._duration=t,this._timeLeft=t,this._timerContainer=e,this._originalText=i}startTimer(){this._timerFunction=setInterval(this._updateTimerDisplay.bind(this),this._everySecond)}endTimer(){clearInterval(this._timerFunction),this._timeLeft=this._duration,this._changeContainerText(this._timerContainer,this._originalText),this.functionsToExecuteAtTimerEnd()}_updateTimerDisplay(){this._changeContainerText(this._timerContainer,this._formatTimer(--this._timeLeft)),0==this._timeLeft&&this.endTimer()}_changeContainerText(t,e){(t=document.getElementsByClassName(t)[0]).innerHTML=e}_formatTimer(t){var e=Math.floor(t/60),i=t%60;return(e<10?"0":"")+e+":"+(i<10?"0":"")+i}}
//# sourceMappingURL=/sm/121c6e72def44b455922e29743e83c1d5ed606b5ae86e3ee9175dcdeb1dcfb46.map