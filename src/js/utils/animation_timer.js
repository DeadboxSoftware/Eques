import {Animation} from './animation.js'

export class Timer extends Animation {
  constructor(/*speed, step*/timerInS, options){
    super();
    this.timerInS = timerInS
    this.step = this.run;
    this.estimatedEnd = Date.now() + this.timerInS *1000,
    this.currentCount = (this.estimatedEnd - Date.now()) / 1000;
    this.lastSecond = timerInS+1
    this.paused = false
    // === OPTIONS
    this.onComplete = options.onComplete || false;
  }
  run(timestamp){
    super.run()
    this.currentCount = (this.estimatedEnd - Date.now()) / 1000;
    if(!this.paused){
      this.secondWatcher()
      if(this.currentCount <= 0){
        this.canceled = true
        window.cancelAnimationFrame(this.timerID)
        this.estimatedEnd = Date.now() + this.timerInS*1000;
        this.onComplete ? this.onComplete() : false;
      }
    }
  }
  secondWatcher(){
    this.currentSecond = Math.abs(Math.ceil(this.currentCount))
    // MONITOR LAST SECOND AND CURRENT
    console.log(this.currentSecond, this.lastSecond)
    if(this.currentSecond < this.lastSecond){
      if(this.currentSecond < 0){
        this.lastSecond = this.timerInS+1
      } else {
        this.lastSecond = this.currentSecond
        // console.log(this.currentSecond)
      }
    } else if(this.lastSecond == 0){
      this.lastSecond = this.timerInS+1
    }

  }
  resetTimer(){
    this.estimatedEnd = Date.now() + this.timerInS*1000;
  }
  cancel(){
    super.cancel()
  }
  restart(){
    this.cancel()
    this.lastSecond = this.timerInS+1
    this.start()
  }
  pause(){
    this.paused = true
  }
  resume(){
    this.estimatedEnd = Date.now() + this.currentSecond*1000,
    this.paused = false
  }
  start(){
    this.canceled = false
    this.estimatedEnd = Date.now() + this.timerInS *1000,
    super.start()
  }
}