export function addListenerWithArgs(elem, evt, func, vars) {
  var f = function (ff, vv) {
    return (function () {
      ff(vv);
    });
  }(func, vars);
  elem.addEventListener(evt, f);
  return f;
}

export function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
}

export function getPosition(el) {
    var x = 0,
        y = 0;
    while (el != null && (el.tagName || '').toLowerCase() != 'html') {
        x += el.offsetLeft || 0;
        y += el.offsetTop || 0;
        el = el.parentElement;
    }
    return { x: parseInt(x, 10), y: parseInt(y, 10) };
}

export function Parallax(scrollTop){
    $$(".parallax").forEach(function (el, index, array) {
        var depth = Number(el.getAttribute('data-depth')) || 0.25;
        var background = el.getAttribute('data-background');
        var x = el.getAttribute('data-x') || 0;
        var offsetY = el.getAttribute('data-offsetY') || 0;
        var startPin = Number(el.getAttribute('data-pin')) || 0;
        var translate3d;

        var elTop = getPosition(el).y;
        var pin = elTop + startPin;
        var limit = elTop + el.offsetHeight;
        var t = (scrollTop - elTop) * depth;

        if (scrollTop > pin && scrollTop <= limit) {
            if (background) {
                el.style.backgroundPosition = x +" "+ t + "px";
            }
            else {
                translate3d = 'translate3d('+x+', ' + t + "px, 0)";
                el.style.transform = translate3d;
            }
        } else {
            if (background) {
                el.style.backgroundPosition = x + " " + startPin + "px";
            }
            else {
                translate3d = "translate3d(" + x + ",0,0)";
                el.style.transform = translate3d;
            }
        }
    });
}

export function siblings (el) {
  if (el.parentNode === null) return [];

  return Array.prototype.filter.call(el.parentNode.children, function (child) {
    return child !== el;
  });
}

export function toggle(el, displayoveride='block') {
    if(el.style.display == displayoveride){
        el.style.display = 'none'
    } else {
        el.style.display = displayoveride
    }
}

export function hide(el){
    el.style.display = 'none'
}


export function fillContH(el, resize=false){
  console.log('fill cont')
  let top=el.offsetTop
  let winH=window.innerHeight
  el.style.height=winH-top;

  if (resize){
    el.addEventListener("resize", ()=>{
      top=el.offsetTop
      winH=window.innerHeight
      el.style.height=winH-top;
    })
  }
}

export function ParentHeight() {
    function init() {
        document.querySelectorAll('.parents-height').forEach(function(v,i){
            v.style.height = '0px'
            let containerH = Number(getComputedStyle(v.parentNode, null).height.replace('px', ''));
            v.style.height = containerH + 'px';
        });
    }
    init();
    window.addEventListener('resize', init)
}


export class CalcFullSize {
    constructor(navbar){
        // Calculate the height of browser - Navigation height (When sticky)
        this.header = document.querySelector(navbar); 
        this.init = this.init.bind(this);
        window.addEventListener('resize',this.init);
        this.init();
    }

    init() {
        var $this = this;
        this.sectionName = 'section.full-size';
        this.outerHeight = window.innerHeight;
        document.querySelectorAll(this.sectionName).forEach(function(v,i){
            if($this.header.classList.contains('header-sticky')) { // .classList.contains('header-sticky')
                v.style.height = ($this.outerHeight - $this.header.offsetHeight) + 'px';
            } else {
                v.style.height = window.innerHeight + 'px';
            }
        })
    }
}

export function set_full_size(el, offset=null){
    el.style.height = (document.body.offsetHeight - offset)+"px"
}

export function collapseSection(element, oncomplete) {
  var sectionHeight = element.scrollHeight;
    element.style.height=null
    element.style.maxHeight = sectionHeight + 'px';
    let handle_trans = function(event){
      console.log("collapse")
      event.target.style.maxHeight="0px"
      element.removeEventListener('transitionend', handle_trans);
    }
    element.style.transition = '0.25s';
    window.requestAnimationFrame(()=>{
      element.style.maxHeight = '0px'
    })
    element.addEventListener('transitionend',handle_trans)
  element.setAttribute('data-collapsed', 'true');
}

export function expandSection(element) {
  var sectionHeight = element.scrollHeight;
  element.style.maxHeight = sectionHeight + 'px';
  let handle_trans = function(event){
    console.log("expand")
    event.target.style.maxHeight = null
    event.target.style.height = 'auto'
    element.removeEventListener('transitionend', handle_trans);
  }
  element.addEventListener('transitionend', handle_trans)
  element.setAttribute('data-collapsed', 'false');
}