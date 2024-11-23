import {addListenerWithArgs} from '../utils/dom';
import {Animation} from '../utils/animation';
import {FadeAnimation} from '../utils/animation_fade';
import {Timer} from '../utils/animation_timer.js';

export default  class ContentSwitcher {
  constructor(options) {
    var $this = this;
    // Options:
    // container -> str (UNIQUE),
    // btn -> bool
    // btnType -> str (arrows, tabs) 
    // animate -> bool
    // animateType -> str (fade, slideIn)
    // display -> str (flex, block...ect)
    this.animate = options.animate || false;
    this.animateType = options.animateType || 'fade';
    this.animateComplete = options.animate ? false : true || true;
    // Looping next button pushed
    // https://stackoverflow.com/a/16763553
    this.loop = options.loop || false;
    this.loopTimerCount = options.loopTimerCount || 10;
    this.loopTimer = new Timer(10, {onComplete: ()=>{
      this.next()
    }});
    this.hasVideo = options.video || false;
    this.videos = [];
    // 
    this.currentIndex = 0;
    this.previousIndex = null;
    this.nextIndex = null;
    this.btn = options.btn || null;
    this.btnType = options.btnType || null;
    this.display = options.display || null;
    this.containerIdentifier = options.container;
    this.elem_cont = document.querySelector(options.container);
    this.children = [].slice.call(this.elem_cont.children);
    this.childrenLen = this.children.length - 1;
    // PAUSE LOOP ON VIS CHANGE
    document.addEventListener("visibilitychange", ()=>{
      if (document.visibilityState == "hidden"){
        this.loopTimer.pause()
      } else if(document.visibilityState == "visible") {
        this.loopTimer.resume()
      }
    });
    window.timer = this.loopTimer
    this.init();
  }

  resetLoopTimer(){
    this.loopTimer.restart()
  }


  init() {
    this.hideExcIndex();

    // console.log(this.btn);
    if(this.btn) {
      this.createBtns();
    }
    if(this.hasVideo){
      this.lookupVideos();
    }
    if(this.loop) {
      this.loopTimer.restart();
    }
  }

  hideExcIndex() {
    // console.log(this.children);
    for (const key in this.children) {
      if(key != 0) {
        // console.log('KEY IS ', Number(key), this.children[key]);
        this.children[key].style.display = 'none';
      }
    }
  }

  next() {
    if (this.currentIndex === this.children.length - 1) {
      this.nextIndex = 0;
    }
    else {
      this.nextIndex = this.currentIndex + 1;
    }
    this.handleNext();
  }

  prev() {
    if (this.currentIndex === 0) {
      this.nextIndex = this.children.length - 1;
    }
    else {
      this.nextIndex = this.currentIndex - 1;
    }
    this.handleNext();
  }

  handleNext(){
    // - MAKE ANIMATION FRAME LOOP 
    // - WHEN FINISHED SHIFT INDEX
    // console.log('handleNext');
    this.handleVideos();
    this.resetLoopTimer();
    this.tabChange();
    // this.animateSlide();
    this.handleLoop();
    // After shiftIndex()

  }

  tabChange(){
    if(this.btnType == 'tab'){
      this.tabs[this.currentIndex].classList.remove('active');
      this.tabs[this.nextIndex].classList.add('active');
    }
  }

  handleLoop(){
    var $this = this;
    if(this.animate == false){
      this.shiftIndex();
      this.handleDisplay() 
    } else {
      if(this.animateType == "fade"){
        this.animation = new FadeAnimation()
      }
      // var animation = new Animation(function(){
      //   if($this.animationComplete) {
      //     // console.log('animation complete');
      //     $this.animationComplete = false;
      //     animation.cancel();
      //     $this.shiftIndex();
      //   }
      // });
      // animation.start();
    }
  }

  handleDisplay(){
    if(this.display == 'flex') {
      this.children[this.previousIndex].style.display = 'none';
      // console.log(this.nextIndex);
      this.children[this.currentIndex].style.display = 'flex';
    } else {
      this.children[this.previousIndex].style.display = 'none';
      this.children[this.nextIndex].style.display = 'block';
    }
  }

  shiftIndex() {
    // this.animateSlide();
    // var $this = this;
    // Depending on animations required we will input them here
    this.previousIndex = this.currentIndex;
    this.currentIndex = this.nextIndex;
    // console.log(this.currentIndex);
  }

  createBtns() {
    if(this.btnType == 'tab') {

      var tabContainer = document.createElement('div');
      tabContainer.setAttribute('class', 'tab-container')
      this.tabs = [];

      for(var key = 0; key <= this.childrenLen; key++) {
        this.tabs[key] = document.createElement('div');
        this.tabs[key].setAttribute('class', ('tab-btn ' + 'tab-' + key));
        this.tabs[key].setAttribute('data-id', key);

        if(key == 0) {
          this.tabs[key].classList.add('active');
        }

        tabContainer.appendChild(this.tabs[key]);
        addListenerWithArgs(this.tabs[key], 'click', this.goToSlide, { no: key, this: this })
      }

      this.elem_cont.parentElement.appendChild(tabContainer);

    }

  }

  goToSlide(opt) {
    console.log(opt)
    if(opt.no != opt.this.currentIndex) {
      opt.this.nextIndex = opt.no;
      opt.this.handleNext();
      opt.this.shiftIndex();
    }

  }

  // animateSlide(){
  //   // console.log('animateSlide');
  //   var requestId;
  //   if(this.animate){
  //     switch (this.animateType) {
  //       case 'fade':
  //         this.fade();
  //         break;
      
  //       default:
  //         break;
  //     }
  //   }
  // }

  fade(){
    this.children[this.currentIndex].style.opacity = "1";
    this.children[this.nextIndex].style.opacity = "0"
    this.children[this.nextIndex].style.zIndex = "2"
    this.children[this.currentIndex].style.zIndex = "1"
    var $this = this;
    var animation1Started = false
    var animation1 = new Animation(function(){

      if(animation1Started == false) {

        $this.children[$this.nextIndex].style.display = $this.display;
        animation1Started = true;
      }
      if(Number($this.children[$this.nextIndex].style.opacity) < 1){
        $this.children[$this.nextIndex].style.opacity = (Number($this.children[$this.nextIndex].style.opacity) + 0.05);
      } else {
        animation1.cancel();
        $this.animationComplete = true;
      }
    });
    var animation = new Animation(function(){
      if(Number($this.children[$this.currentIndex].style.opacity) > 0){
        if(Number($this.children[$this.currentIndex].style.opacity) < 0.9 && animation1Started == false){
          animation1.start();
        }
        $this.children[$this.currentIndex].style.opacity = (Number($this.children[$this.currentIndex].style.opacity) - 0.05);
      } else {
        animation.cancel();
      }
    });
    animation.start(); 
  }

  handleVideos(){
    if(this.hasVideo){
      if(this.videos[this.currentIndex] != false){
        this.videos[this.currentIndex].pause();
        this.videos[this.currentIndex].currentTime = 0;
      }
      if(this.videos[this.nextIndex] != false){
        this.videos[this.nextIndex].load();
        this.videos[this.nextIndex].play();
      }
    }
  }

  lookupVideos(){
    console.log('LOOKUP VIDEO');
    for(var key = 0; key <= this.childrenLen; key++) {
      // console.log(key); 0 1 2
      this.videos.push(this.children[key].querySelector('video') || false);
      console.log(this.videos);
    }
  }
}

// https://stackoverflow.com/questions/31282318/is-there-a-way-to-cancel-requestanimationframe-without-a-global-variable