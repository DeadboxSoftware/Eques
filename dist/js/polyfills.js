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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/polyfills/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/polyfills/index.js":
/*!***********************************!*\
  !*** ./src/js/polyfills/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * classList.js MOD by aMarCruz
 * 2015-05-07
 * Supports IE9+ and modern browsers.
 *
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20150312
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
if ('classList' in document.createElement('_')) {
  // There is full or partial native classList support, so just check
  // if we need to normalize the add/remove and toggle APIs.
  !function () {
    'use strict';

    var c1 = 'c1';
    var c2 = 'c2';
    var testElement = document.createElement('_'); // Polyfill for IE 10/11 and Firefox <26, where classList.add and
    // classList.remove exist but support only one argument at a time.

    testElement.classList.add(c1, c2);

    if (!testElement.classList.contains(c2)) {
      var createMethod = function createMethod(method) {
        var _method = DOMTokenList.prototype[method];

        DOMTokenList.prototype[method] = function (token) {
          for (var i = -1, len = arguments.length; ++i < len;) {
            token = arguments[i];

            _method.call(this, token);
          }
        };
      };

      createMethod('add');
      createMethod('remove');
    } // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
    // support the second argument.


    testElement.classList.toggle(c1, true);

    if (!testElement.classList.contains(c1)) {
      var _toggle = DOMTokenList.prototype.toggle;

      DOMTokenList.prototype.toggle = function (token, force) {
        if (1 in arguments && !this.contains(token) === !force) {
          return force;
        }

        return _toggle.call(this, token);
      };
    }

    testElement = null;
  }();
} else {
  //-------------------------------------------------------------------
  // Full polyfill for browsers with no classList support
  //-------------------------------------------------------------------
  'Element' in view && function (view) {
    'use strict';

    var proto = 'prototype';
    var arrIndexOf = Array[proto].indexOf; // Vendors: please allow content code to instantiate DOMExceptions

    var DOMEx = function DOMEx(type, message) {
      this.name = type;
      this.code = DOMException[type];
      this.message = message;
    }; // Most DOMException implementations don't allow calling DOMException's toString()
    // on non-DOMExceptions. Error's toString() is sufficient here.


    DOMEx[proto] = Error[proto];

    var checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
      if (token === '') {
        throw new DOMEx('SYNTAX_ERR', 'An invalid or illegal string was specified');
      }

      if (/\s/.test(token)) {
        throw new DOMEx('INVALID_CHARACTER_ERR', 'String contains an invalid character');
      }

      return arrIndexOf.call(classList, token);
    }; //-- The ClassList "class"


    var ClassList = function ClassList(elem) {
      var classes = (elem.getAttribute('class') || '').trim();

      if (classes) {
        var classlist = classes.split(/\s+/);

        for (var i = -1, len = classlist.length; ++i < len;) {
          this.push(classlist[i]);
        }
      } // privileged method, called from public methods of classList


      this._updateClassName = function () {
        elem.setAttribute('class', this.toString());
      };
    }; // ClassList inherit from Array


    var classListPrototype = ClassList[proto] = []; //-- Element.classList[i]: string || null

    classListPrototype.item = function (i) {
      return this[i] || null;
    }; //-- Element.classList.add(...)
    // Adds a class to an element's list of classes.
    // If class already exists in the element's list of classes,
    // it will not add the class again.


    classListPrototype.add = function () {
      var tokens = arguments;
      var updated = false;

      for (var i = -1, len = tokens.length; ++i < len;) {
        var token = tokens[i] + '';

        if (checkTokenAndGetIndex(this, token) === -1) {
          this.push(token);
          updated = true;
        }
      }

      if (updated) {
        this._updateClassName();
      }
    }; //-- Element.classList.remove(...)
    // Removes a class from an element's list of classes.
    // If class does not exist in the element's list of classes,
    // it will not throw an error or exception.


    classListPrototype.remove = function () {
      var tokens = arguments;
      var updated = false;
      var index;

      for (var i = -1, len = tokens.length; ++i < len;) {
        var token = tokens[i] + '';

        while ((index = checkTokenAndGetIndex(this, token)) !== -1) {
          this.splice(index, 1);
          updated = true;
        }
      }

      if (updated) {
        this._updateClassName();
      }
    }; //-- Element.classList.toogle(... [, force])
    // Toggles the existence of a class in an element's list of classes
    // force: will force the class name to be added or removed based on the truthiness
    // of 'force'.
    // For example, to remove a class (if it exists or not) you can call
    // element.classList.toggle('classToBeRemoved', false);
    // and to add a class (if it exists or not) you can call
    // element.classList.toggle('classToBeAdded', true);


    classListPrototype.toggle = function (token, force) {
      token += ''; // ensure that is string

      if (this.contains(token)) {
        return force === true || (this.remove(token), false);
      }

      return force === false ? false : (this.add(token), true);
    }; //-- Element.classList.toString()


    classListPrototype.toString = function () {
      return this.join(' ');
    }; //-- Element.classList.contains(token): boolean
    // Checks if an element's list of classes contains a specific class.


    classListPrototype.contains = function (token) {
      return checkTokenAndGetIndex(this, token + '') !== -1;
    }; // Element.classList Getter


    var classListGetter = function classListGetter() {
      return new ClassList(this);
    };

    Object.defineProperty(view.Element[proto], 'classList', {
      get: classListGetter,
      enumerable: true,
      configurable: true
    });
  }(self); // if ('Element' in view) && (function(v){..})(v)
}

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

/***/ })

/******/ });
//# sourceMappingURL=polyfills.js.map