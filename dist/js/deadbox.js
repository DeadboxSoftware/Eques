var deadbox =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/components/content_slider.js":
/*!*********************************************!*\
  !*** ./src/js/components/content_slider.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ContentSwitcher; });
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom */ "./src/js/utils/dom.js");
/* harmony import */ var _utils_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/animation */ "./src/js/utils/animation.js");
/* harmony import */ var _utils_animation_fade__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/animation_fade */ "./src/js/utils/animation_fade.js");
/* harmony import */ var _utils_animation_timer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/animation_timer.js */ "./src/js/utils/animation_timer.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var ContentSwitcher = /*#__PURE__*/function () {
  function ContentSwitcher(options) {
    var _this = this;

    _classCallCheck(this, ContentSwitcher);

    var $this = this; // Options:
    // container -> str (UNIQUE),
    // btn -> bool
    // btnType -> str (arrows, tabs) 
    // animate -> bool
    // animateType -> str (fade, slideIn)
    // display -> str (flex, block...ect)

    this.animate = options.animate || false;
    this.animateType = options.animateType || 'fade';
    this.animateComplete = options.animate ? false :  true || false; // Looping next button pushed
    // https://stackoverflow.com/a/16763553

    this.loop = options.loop || false;
    this.loopTimerCount = options.loopTimerCount || 10;
    this.loopTimer = new _utils_animation_timer_js__WEBPACK_IMPORTED_MODULE_3__["Timer"](10, {
      onComplete: function onComplete() {
        _this.next();
      }
    });
    this.hasVideo = options.video || false;
    this.videos = []; // 

    this.currentIndex = 0;
    this.previousIndex = null;
    this.nextIndex = null;
    this.btn = options.btn || null;
    this.btnType = options.btnType || null;
    this.display = options.display || null;
    this.containerIdentifier = options.container;
    this.elem_cont = document.querySelector(options.container);
    this.children = [].slice.call(this.elem_cont.children);
    this.childrenLen = this.children.length - 1; // PAUSE LOOP ON VIS CHANGE

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState == "hidden") {
        _this.loopTimer.pause();
      } else if (document.visibilityState == "visible") {
        _this.loopTimer.resume();
      }
    });
    window.timer = this.loopTimer;
    this.init();
  }

  _createClass(ContentSwitcher, [{
    key: "resetLoopTimer",
    value: function resetLoopTimer() {
      this.loopTimer.restart();
    }
  }, {
    key: "init",
    value: function init() {
      this.hideExcIndex(); // console.log(this.btn);

      if (this.btn) {
        this.createBtns();
      }

      if (this.hasVideo) {
        this.lookupVideos();
      }

      if (this.loop) {
        this.loopTimer.restart();
      }
    }
  }, {
    key: "hideExcIndex",
    value: function hideExcIndex() {
      // console.log(this.children);
      for (var key in this.children) {
        if (key != 0) {
          // console.log('KEY IS ', Number(key), this.children[key]);
          this.children[key].style.display = 'none';
        }
      }
    }
  }, {
    key: "next",
    value: function next() {
      if (this.currentIndex === this.children.length - 1) {
        this.nextIndex = 0;
      } else {
        this.nextIndex = this.currentIndex + 1;
      }

      this.handleNext();
    }
  }, {
    key: "prev",
    value: function prev() {
      if (this.currentIndex === 0) {
        this.nextIndex = this.children.length - 1;
      } else {
        this.nextIndex = this.currentIndex - 1;
      }

      this.handleNext();
    }
  }, {
    key: "handleNext",
    value: function handleNext() {
      // - MAKE ANIMATION FRAME LOOP 
      // - WHEN FINISHED SHIFT INDEX
      // console.log('handleNext');
      this.handleVideos();
      this.resetLoopTimer();
      this.tabChange(); // this.animateSlide();

      this.handleLoop(); // After shiftIndex()
    }
  }, {
    key: "tabChange",
    value: function tabChange() {
      if (this.btnType == 'tab') {
        this.tabs[this.currentIndex].classList.remove('active');
        this.tabs[this.nextIndex].classList.add('active');
      }
    }
  }, {
    key: "handleLoop",
    value: function handleLoop() {
      var $this = this;

      if (this.animate == false) {
        this.shiftIndex();
        this.handleDisplay();
      } else {
        if (this.animateType == "fade") {
          this.animation = new _utils_animation_fade__WEBPACK_IMPORTED_MODULE_2__["FadeAnimation"]();
        } // var animation = new Animation(function(){
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
  }, {
    key: "handleDisplay",
    value: function handleDisplay() {
      if (this.display == 'flex') {
        this.children[this.previousIndex].style.display = 'none'; // console.log(this.nextIndex);

        this.children[this.currentIndex].style.display = 'flex';
      } else {
        this.children[this.previousIndex].style.display = 'none';
        this.children[this.nextIndex].style.display = 'block';
      }
    }
  }, {
    key: "shiftIndex",
    value: function shiftIndex() {
      // this.animateSlide();
      // var $this = this;
      // Depending on animations required we will input them here
      this.previousIndex = this.currentIndex;
      this.currentIndex = this.nextIndex; // console.log(this.currentIndex);
    }
  }, {
    key: "createBtns",
    value: function createBtns() {
      if (this.btnType == 'tab') {
        var tabContainer = document.createElement('div');
        tabContainer.setAttribute('class', 'tab-container');
        this.tabs = [];

        for (var key = 0; key <= this.childrenLen; key++) {
          this.tabs[key] = document.createElement('div');
          this.tabs[key].setAttribute('class', 'tab-btn ' + 'tab-' + key);
          this.tabs[key].setAttribute('data-id', key);

          if (key == 0) {
            this.tabs[key].classList.add('active');
          }

          tabContainer.appendChild(this.tabs[key]);
          Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["addListenerWithArgs"])(this.tabs[key], 'click', this.goToSlide, {
            no: key,
            "this": this
          });
        }

        this.elem_cont.parentElement.appendChild(tabContainer);
      }
    }
  }, {
    key: "goToSlide",
    value: function goToSlide(opt) {
      console.log(opt);

      if (opt.no != opt["this"].currentIndex) {
        opt["this"].nextIndex = opt.no;
        opt["this"].handleNext();
        opt["this"].shiftIndex();
      }
    } // animateSlide(){
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

  }, {
    key: "fade",
    value: function fade() {
      this.children[this.currentIndex].style.opacity = "1";
      this.children[this.nextIndex].style.opacity = "0";
      this.children[this.nextIndex].style.zIndex = "2";
      this.children[this.currentIndex].style.zIndex = "1";
      var $this = this;
      var animation1Started = false;
      var animation1 = new _utils_animation__WEBPACK_IMPORTED_MODULE_1__["Animation"](function () {
        if (animation1Started == false) {
          $this.children[$this.nextIndex].style.display = $this.display;
          animation1Started = true;
        }

        if (Number($this.children[$this.nextIndex].style.opacity) < 1) {
          $this.children[$this.nextIndex].style.opacity = Number($this.children[$this.nextIndex].style.opacity) + 0.05;
        } else {
          animation1.cancel();
          $this.animationComplete = true;
        }
      });
      var animation = new _utils_animation__WEBPACK_IMPORTED_MODULE_1__["Animation"](function () {
        if (Number($this.children[$this.currentIndex].style.opacity) > 0) {
          if (Number($this.children[$this.currentIndex].style.opacity) < 0.9 && animation1Started == false) {
            animation1.start();
          }

          $this.children[$this.currentIndex].style.opacity = Number($this.children[$this.currentIndex].style.opacity) - 0.05;
        } else {
          animation.cancel();
        }
      });
      animation.start();
    }
  }, {
    key: "handleVideos",
    value: function handleVideos() {
      if (this.hasVideo) {
        if (this.videos[this.currentIndex] != false) {
          this.videos[this.currentIndex].pause();
          this.videos[this.currentIndex].currentTime = 0;
        }

        if (this.videos[this.nextIndex] != false) {
          this.videos[this.nextIndex].load();
          this.videos[this.nextIndex].play();
        }
      }
    }
  }, {
    key: "lookupVideos",
    value: function lookupVideos() {
      console.log('LOOKUP VIDEO');

      for (var key = 0; key <= this.childrenLen; key++) {
        // console.log(key); 0 1 2
        this.videos.push(this.children[key].querySelector('video') || false);
        console.log(this.videos);
      }
    }
  }]);

  return ContentSwitcher;
}(); // https://stackoverflow.com/questions/31282318/is-there-a-way-to-cancel-requestanimationframe-without-a-global-variable




/***/ }),

/***/ "./src/js/components/nav.js":
/*!**********************************!*\
  !*** ./src/js/components/nav.js ***!
  \**********************************/
/*! exports provided: nav, navjQuery, StickyNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nav", function() { return nav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navjQuery", function() { return navjQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StickyNav", function() { return StickyNav; });
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom */ "./src/js/utils/dom.js");
/* harmony import */ var _utils_scroll_lock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/scroll_lock */ "./src/js/utils/scroll_lock.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




function nav() {
  var burger = document.querySelector('#nav-toggle');
  var sib = null;
  document.querySelector('html').addEventListener('click', function (el) {
    var sibling = Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["siblings"])(el.srcElement)[0];

    if (sib == null) {
      document.querySelectorAll('.nav-dropdown').forEach(function (v, i) {
        console.log(v);

        if (sib != v) {
          Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["hide"])(v);
        }
      });
    }

    sib = null;
  }); // DROPDOWN MENU

  document.querySelectorAll('header nav ul li a:not(:only-child)').forEach(function (v, i) {
    var dropdowns = Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["siblings"])(v)[0];
    v.addEventListener('click', function (event) {
      sib = v.parentElement.querySelector('ul');
      Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["toggle"])(dropdowns);
    });
  }); // NAVTOGGLE CLICk

  burger.addEventListener('click', function (event) {
    var mainNav = Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["$$"])('header nav ul')[0];
    mainNav.classList.toggle('open');
    burger.classList.toggle('clicked');

    if (mainNav.classList.contains('open')) {
      Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["expandSection"])(mainNav);
    } else {
      Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["collapseSection"])(mainNav);
    }
  });
}
function navjQuery() {
  console.log("setup");
  console.log($);

  (function ($) {
    // Begin jQuery
    $(function () {
      // DOM ready
      // If a link has a dropdown, add sub menu toggle.
      $('header nav ul li a:not(:only-child)').click(function (e) {
        $(this).siblings('.nav-dropdown').toggle(); // Close one dropdown when selecting another

        $('.nav-dropdown').not($(this).siblings()).hide();
        e.stopPropagation();
      }); // Clicking away from dropdown will remove the dropdown class

      $('html').click(function () {
        $('.nav-dropdown').hide();
      }); // Toggle open and close nav styles on click

      $('#nav-toggle').click(function () {}); // Hamburger to X toggle

      $('#nav-toggle').on('click', function () {
        // console.log("clicked");
        var mainNav = $('header nav ul')[0];
        mainNav.classList.toggle("open");
        this.classList.toggle('clicked');
        var isCollapsed = mainNav.getAttribute('data-collapsed');

        if ($('header#mainNav')[0]) {
          if ($('header#mainNav nav ul')[0].classList.contains("open")) {
            Object(_utils_scroll_lock__WEBPACK_IMPORTED_MODULE_1__["scrollLockSwitch"])(true);
          } else {
            Object(_utils_scroll_lock__WEBPACK_IMPORTED_MODULE_1__["scrollLockSwitch"])(false);
          }
        } else if ($('header#secondaryNav nav ul')[0]) {
          if ($('header#secondaryNav nav ul')[0].classList.contains("open")) {
            Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["expandSection"])(mainNav);
          } else {
            Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["collapseSection"])(mainNav);
          }
        }
      });
    }); // end DOM ready
  })(jQuery); // end jQuery

}
var StickyNav = /*#__PURE__*/function () {
  function StickyNav(navid, maincontent) {
    _classCallCheck(this, StickyNav);

    this.isSticky = false; // --- NavigationID

    this.navigationBarID = navid;
    this.navigationBar = document.querySelector(this.navigationBarID) || null;

    if (this.navigationBar != null) {
      this.navOffsetTop = this.navigationBar.offsetTop;
      this.navHeight = this.navigationBar.offsetHeight; // --- Main Content ID or (Main)

      this.main = maincontent;
      this.init = this.init.bind(this);
      this.init();
    } else {
      /* console.log('Navigation bar is Null');*/
    }
  }

  _createClass(StickyNav, [{
    key: "init",
    value: function init() {
      window.onscroll = function (e) {
        e.preventDefault(); // console.log(this.navOffsetTop);

        if (window.pageYOffset >= this.navOffsetTop) {
          this.scrollIsAtTop();
        } else {
          this.scrollBellow();
        }
      }.bind(this);

      window.addEventListener("DOMContentLoaded", function () {
        if (window.pageYOffset >= this.navOffsetTop) {
          this.scrollIsAtTop();
        } else {
          this.scrollBellow();
        }
      }.bind(this));
    } // --- Adds class sticky if above 0 pagetop

  }, {
    key: "scrollIsAtTop",
    value: function scrollIsAtTop() {
      this.navigationBar.classList.add('sticky');
      document.querySelector(this.main).style.paddingTop = document.querySelector(this.navigationBarID).offsetHeight + 'px';
    } // --- Applies height of navigation ontop of (Main) content to stop jumping

  }, {
    key: "scrollBellow",
    value: function scrollBellow() {
      this.navigationBar.classList.toggle('sticky', false);
      document.querySelector(this.main).style.paddingTop = 0 + 'px';
    }
  }]);

  return StickyNav;
}();

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! exports provided: ContentSwitcher, nav, set_full_size */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_content_slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/content_slider.js */ "./src/js/components/content_slider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContentSwitcher", function() { return _components_content_slider_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _components_nav_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/nav.js */ "./src/js/components/nav.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nav", function() { return _components_nav_js__WEBPACK_IMPORTED_MODULE_1__["nav"]; });

/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/dom */ "./src/js/utils/dom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "set_full_size", function() { return _utils_dom__WEBPACK_IMPORTED_MODULE_2__["set_full_size"]; });



 // COMPONENTS

 // UTILS



/***/ }),

/***/ "./src/js/utils/animation.js":
/*!***********************************!*\
  !*** ./src/js/utils/animation.js ***!
  \***********************************/
/*! exports provided: Animation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Animation = /*#__PURE__*/function () {
  function Animation()
  /*speed, step*/
  {
    _classCallCheck(this, Animation);

    this.step = this.run;
    this.timerID;
    this.canceled = false;
    this.arr = [];
  }

  _createClass(Animation, [{
    key: "innerStep",
    value: function innerStep(timestamp) {
      this.timestamp = timestamp;
      this.run();

      if (this.canceled == false) {
        this.timerID = requestAnimationFrame(this.innerStep.bind(this));

        if (!this.arr.includes(this.timerID)) {
          this.arr.push(this.timerID);
        }
      } else {}
    }
  }, {
    key: "run",
    value: function run(timestamp) {
      return "parent";
    }
  }, {
    key: "start",
    value: function start() {
      console.log("started");
      this.timerID = window.requestAnimationFrame(this.innerStep.bind(this));
    }
  }, {
    key: "cancel",
    value: function cancel() {
      console.log("canceled");
      this.canceled = true;
      window.cancelAnimationFrame(this.timerID);
      return;
    }
  }]);

  return Animation;
}();

/***/ }),

/***/ "./src/js/utils/animation_fade.js":
/*!****************************************!*\
  !*** ./src/js/utils/animation_fade.js ***!
  \****************************************/
/*! exports provided: FadeAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FadeAnimation", function() { return FadeAnimation; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var FadeAnimation = /*#__PURE__*/function (_Animation) {
  _inherits(FadeAnimation, _Animation);

  var _super = _createSuper(FadeAnimation);

  function FadeAnimation() {
    var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : FadeAnimation.step;
    var previousElement = arguments.length > 1 ? arguments[1] : undefined;
    var nextElement = arguments.length > 2 ? arguments[2] : undefined;
    var speed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;
    var blur = arguments.length > 4 ? arguments[4] : undefined;
    var fadeToBlack = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

    _classCallCheck(this, FadeAnimation);

    return _super.call(this, step);
  }

  _createClass(FadeAnimation, [{
    key: "next",
    value: function next() {// how to fade an element
    }
  }, {
    key: "step",
    value: function step() {
      console.log("steps");
    }
  }]);

  return FadeAnimation;
}( /*#__PURE__*/_wrapNativeSuper(Animation));

var Slide = /*#__PURE__*/function (_Animation2) {
  _inherits(Slide, _Animation2);

  var _super2 = _createSuper(Slide);

  function Slide(_ref) {
    var _this;

    var speed = _ref.speed;

    _classCallCheck(this, Slide);

    return _possibleConstructorReturn(_this);
  }

  return Slide;
}( /*#__PURE__*/_wrapNativeSuper(Animation));

/***/ }),

/***/ "./src/js/utils/animation_timer.js":
/*!*****************************************!*\
  !*** ./src/js/utils/animation_timer.js ***!
  \*****************************************/
/*! exports provided: Timer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timer", function() { return Timer; });
/* harmony import */ var _animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation.js */ "./src/js/utils/animation.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var Timer = /*#__PURE__*/function (_Animation) {
  _inherits(Timer, _Animation);

  var _super = _createSuper(Timer);

  function Timer(
  /*speed, step*/
  timerInS, options) {
    var _this;

    _classCallCheck(this, Timer);

    _this = _super.call(this);
    _this.timerInS = timerInS;
    _this.step = _this.run;
    _this.estimatedEnd = Date.now() + _this.timerInS * 1000, _this.currentCount = (_this.estimatedEnd - Date.now()) / 1000;
    _this.lastSecond = timerInS + 1;
    _this.paused = false; // === OPTIONS

    _this.onComplete = options.onComplete || false;
    return _this;
  }

  _createClass(Timer, [{
    key: "run",
    value: function run(timestamp) {
      _get(_getPrototypeOf(Timer.prototype), "run", this).call(this);

      this.currentCount = (this.estimatedEnd - Date.now()) / 1000;

      if (!this.paused) {
        this.secondWatcher();

        if (this.currentCount <= 0) {
          this.canceled = true;
          window.cancelAnimationFrame(this.timerID);
          this.estimatedEnd = Date.now() + this.timerInS * 1000;
          this.onComplete ? this.onComplete() : false;
        }
      }
    }
  }, {
    key: "secondWatcher",
    value: function secondWatcher() {
      this.currentSecond = Math.abs(Math.ceil(this.currentCount)); // MONITOR LAST SECOND AND CURRENT

      console.log(this.currentSecond, this.lastSecond);

      if (this.currentSecond < this.lastSecond) {
        if (this.currentSecond < 0) {
          this.lastSecond = this.timerInS + 1;
        } else {
          this.lastSecond = this.currentSecond; // console.log(this.currentSecond)
        }
      } else if (this.lastSecond == 0) {
        this.lastSecond = this.timerInS + 1;
      }
    }
  }, {
    key: "resetTimer",
    value: function resetTimer() {
      this.estimatedEnd = Date.now() + this.timerInS * 1000;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      _get(_getPrototypeOf(Timer.prototype), "cancel", this).call(this);
    }
  }, {
    key: "restart",
    value: function restart() {
      this.cancel();
      this.lastSecond = this.timerInS + 1;
      this.start();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.paused = true;
    }
  }, {
    key: "resume",
    value: function resume() {
      this.estimatedEnd = Date.now() + this.currentSecond * 1000, this.paused = false;
    }
  }, {
    key: "start",
    value: function start() {
      this.canceled = false;
      this.estimatedEnd = Date.now() + this.timerInS * 1000, _get(_getPrototypeOf(Timer.prototype), "start", this).call(this);
    }
  }]);

  return Timer;
}(_animation_js__WEBPACK_IMPORTED_MODULE_0__["Animation"]);

/***/ }),

/***/ "./src/js/utils/dom.js":
/*!*****************************!*\
  !*** ./src/js/utils/dom.js ***!
  \*****************************/
/*! exports provided: addListenerWithArgs, $$, getPosition, Parallax, siblings, toggle, hide, fillContH, ParentHeight, CalcFullSize, set_full_size, collapseSection, expandSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addListenerWithArgs", function() { return addListenerWithArgs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$$", function() { return $$; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPosition", function() { return getPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parallax", function() { return Parallax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "siblings", function() { return siblings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggle", function() { return toggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hide", function() { return hide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fillContH", function() { return fillContH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParentHeight", function() { return ParentHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalcFullSize", function() { return CalcFullSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_full_size", function() { return set_full_size; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collapseSection", function() { return collapseSection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expandSection", function() { return expandSection; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function addListenerWithArgs(elem, evt, func, vars) {
  var f = function (ff, vv) {
    return function () {
      ff(vv);
    };
  }(func, vars);

  elem.addEventListener(evt, f);
  return f;
}
function $$(selector, context) {
  context = context || document;
  var elements = context.querySelectorAll(selector);
  return Array.prototype.slice.call(elements);
}
function getPosition(el) {
  var x = 0,
      y = 0;

  while (el != null && (el.tagName || '').toLowerCase() != 'html') {
    x += el.offsetLeft || 0;
    y += el.offsetTop || 0;
    el = el.parentElement;
  }

  return {
    x: parseInt(x, 10),
    y: parseInt(y, 10)
  };
}
function Parallax(scrollTop) {
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
        el.style.backgroundPosition = x + " " + t + "px";
      } else {
        translate3d = 'translate3d(' + x + ', ' + t + "px, 0)";
        el.style.transform = translate3d;
      }
    } else {
      if (background) {
        el.style.backgroundPosition = x + " " + startPin + "px";
      } else {
        translate3d = "translate3d(" + x + ",0,0)";
        el.style.transform = translate3d;
      }
    }
  });
}
function siblings(el) {
  if (el.parentNode === null) return [];
  return Array.prototype.filter.call(el.parentNode.children, function (child) {
    return child !== el;
  });
}
function toggle(el) {
  var displayoveride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'block';

  if (el.style.display == displayoveride) {
    el.style.display = 'none';
  } else {
    el.style.display = displayoveride;
  }
}
function hide(el) {
  el.style.display = 'none';
}
function fillContH(el) {
  var resize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  console.log('fill cont');
  var top = el.offsetTop;
  var winH = window.innerHeight;
  el.style.height = winH - top;

  if (resize) {
    el.addEventListener("resize", function () {
      top = el.offsetTop;
      winH = window.innerHeight;
      el.style.height = winH - top;
    });
  }
}
function ParentHeight() {
  function init() {
    document.querySelectorAll('.parents-height').forEach(function (v, i) {
      v.style.height = '0px';
      var containerH = Number(getComputedStyle(v.parentNode, null).height.replace('px', ''));
      v.style.height = containerH + 'px';
    });
  }

  init();
  window.addEventListener('resize', init);
}
var CalcFullSize = /*#__PURE__*/function () {
  function CalcFullSize(navbar) {
    _classCallCheck(this, CalcFullSize);

    // Calculate the height of browser - Navigation height (When sticky)
    this.header = document.querySelector(navbar);
    this.init = this.init.bind(this);
    window.addEventListener('resize', this.init);
    this.init();
  }

  _createClass(CalcFullSize, [{
    key: "init",
    value: function init() {
      var $this = this;
      this.sectionName = 'section.full-size';
      this.outerHeight = window.innerHeight;
      document.querySelectorAll(this.sectionName).forEach(function (v, i) {
        if ($this.header.classList.contains('header-sticky')) {
          // .classList.contains('header-sticky')
          v.style.height = $this.outerHeight - $this.header.offsetHeight + 'px';
        } else {
          v.style.height = window.innerHeight + 'px';
        }
      });
    }
  }]);

  return CalcFullSize;
}();
function set_full_size(el) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  el.style.height = document.body.offsetHeight - offset + "px";
}
function collapseSection(element, oncomplete) {
  var sectionHeight = element.scrollHeight;
  element.style.height = null;
  element.style.maxHeight = sectionHeight + 'px';

  var handle_trans = function handle_trans(event) {
    console.log("collapse");
    event.target.style.maxHeight = "0px";
    element.removeEventListener('transitionend', handle_trans);
  };

  element.style.transition = '0.25s';
  window.requestAnimationFrame(function () {
    element.style.maxHeight = '0px';
  });
  element.addEventListener('transitionend', handle_trans);
  element.setAttribute('data-collapsed', 'true');
}
function expandSection(element) {
  var sectionHeight = element.scrollHeight;
  element.style.maxHeight = sectionHeight + 'px';

  var handle_trans = function handle_trans(event) {
    console.log("expand");
    event.target.style.maxHeight = null;
    event.target.style.height = 'auto';
    element.removeEventListener('transitionend', handle_trans);
  };

  element.addEventListener('transitionend', handle_trans);
  element.setAttribute('data-collapsed', 'false');
}

/***/ }),

/***/ "./src/js/utils/scroll_lock.js":
/*!*************************************!*\
  !*** ./src/js/utils/scroll_lock.js ***!
  \*************************************/
/*! exports provided: scrollLock, scrollLockSwitch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollLock", function() { return scrollLock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollLockSwitch", function() { return scrollLockSwitch; });
function scrollLock() {
  /*
    Set window.scrollLock to true when 
    you want the window to stop scrolling
  */
  window.scrollLock = false;
  window.previousScrollTop = 0;
  var $window = window;
  $window.addEventListener('scroll', function (event) {
    if (window.scrollLock) {
      document.body.scrollTop = window.previousScrollTop;
    } else {}

    window.previousScrollTop = document.body.scrollTop;
  });
}
function scrollLockSwitch(bool) {
  if (bool) {
    document.body.style.overflowY = 'hidden';
    window.scrollLock = true;
  } else {
    document.body.style.overflowY = 'unset';
    window.scrollLock = false;
  }
}

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 0:
/*!****************************************************!*\
  !*** multi ./src/scss/main.scss ./src/js/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/scss/main.scss */"./src/scss/main.scss");
module.exports = __webpack_require__(/*! ./src/js/index.js */"./src/js/index.js");


/***/ })

/******/ });
//# sourceMappingURL=deadbox.js.map