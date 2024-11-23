export class Animation {
  constructor(/*speed, step*/){
    this.step = this.run;
    this.timerID;
    this.canceled = false;
    this.arr = []
  }
  innerStep(timestamp) {
    this.timestamp = timestamp
    this.run()
    if (this.canceled == false) {
      this.timerID = requestAnimationFrame(this.innerStep.bind(this));
      if(!this.arr.includes(this.timerID)){
        this.arr.push(this.timerID)
      }
    } else {}
  }
  run(timestamp){
    return "parent"
  }
  start() {
    console.log("started")
    this.timerID = window.requestAnimationFrame(this.innerStep.bind(this));
  }
  cancel() {
    console.log("canceled")
    this.canceled = true;
    window.cancelAnimationFrame(this.timerID)
    return;
  }
}