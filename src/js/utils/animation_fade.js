export class FadeAnimation extends Animation {
  constructor(
    step=FadeAnimation.step,
    previousElement,
    nextElement,
    speed=1000,
    blur,
    fadeToBlack=true
  ) {
    super(step)
  }

  next() {
    // how to fade an element
  }

  step(){
    console.log("steps")
  }
}
class Slide extends Animation {
  constructor({
    speed,
  }) {}
}