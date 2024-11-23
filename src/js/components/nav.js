import { collapseSection, expandSection } from '../utils/dom';
import {scrollLockSwitch} from '../utils/scroll_lock';
import {$$, siblings, toggle, hide} from '../utils/dom'

export function nav(){
  let burger = document.querySelector('#nav-toggle')
  let sib = null;

  document.querySelector('html').addEventListener('click', (el)=>{
    var sibling = siblings(el.srcElement)[0]
    if(sib == null){
      document.querySelectorAll('.nav-dropdown').forEach((v,i)=>{
        console.log(v)
        if(sib != v){
          hide(v)
        }
      })
    }
    sib = null;
  })

  // DROPDOWN MENU
  document.querySelectorAll('header nav ul li a:not(:only-child)').forEach((v,i)=>{
    let dropdowns = siblings(v)[0]
    v.addEventListener('click',(event)=>{
      sib = v.parentElement.querySelector('ul');
      toggle(dropdowns)
    })
  })

  // NAVTOGGLE CLICk
  burger.addEventListener('click', (event)=>{
    let mainNav = $$('header nav ul')[0];
    mainNav.classList.toggle('open')
    burger.classList.toggle('clicked')
    if(mainNav.classList.contains('open')){
      expandSection(mainNav)
    } else {
      collapseSection(mainNav)
    }

  })

}


export function navjQuery(){
  console.log("setup");
  console.log($);
    (function ($) { // Begin jQuery
      $(function () { // DOM ready
        // If a link has a dropdown, add sub menu toggle.
        $('header nav ul li a:not(:only-child)').click(function (e) {
          $(this).siblings('.nav-dropdown').toggle();
          // Close one dropdown when selecting another
          $('.nav-dropdown').not($(this).siblings()).hide();
          e.stopPropagation();
        });
        // Clicking away from dropdown will remove the dropdown class
        $('html').click(function () {
          $('.nav-dropdown').hide();
        });
        // Toggle open and close nav styles on click
        $('#nav-toggle').click(function () {
        });
        // Hamburger to X toggle
        $('#nav-toggle').on('click', function () {
          // console.log("clicked");
          var mainNav = $('header nav ul')[0];
          mainNav.classList.toggle("open");
          this.classList.toggle('clicked');
          var isCollapsed = mainNav.getAttribute('data-collapsed');
          if($('header#mainNav')[0]){
            if ($('header#mainNav nav ul')[0].classList.contains("open")) {
              scrollLockSwitch(true);
            } else {
              scrollLockSwitch(false);
            }
          } else if($('header#secondaryNav nav ul')[0]){
            if ($('header#secondaryNav nav ul')[0].classList.contains("open")) {
              expandSection(mainNav);
            } else {
              collapseSection(mainNav);
            }
          }
        });
      }); // end DOM ready
    })(jQuery); // end jQuery
}


export class StickyNav {
    
    constructor(navid, maincontent){
        this.isSticky = false;
        // --- NavigationID
        this.navigationBarID = navid; 
        this.navigationBar = document.querySelector(this.navigationBarID) || null;
        if(this.navigationBar != null) {
            this.navOffsetTop = this.navigationBar.offsetTop;
            this.navHeight = this.navigationBar.offsetHeight;
            // --- Main Content ID or (Main)
            this.main = maincontent;
            this.init = this.init.bind(this);
            this.init();
        } else {/* console.log('Navigation bar is Null');*/}
    }

    init() {
        window.onscroll = function (e){
            e.preventDefault();
            // console.log(this.navOffsetTop);
            if(window.pageYOffset >= (this.navOffsetTop)) {
                this.scrollIsAtTop();
            } else {
                this.scrollBellow();
            }
        }.bind(this);
        window.addEventListener("DOMContentLoaded", function(){
            if(window.pageYOffset >= (this.navOffsetTop)) {
                this.scrollIsAtTop();
            } else {
                this.scrollBellow();
            }
        }.bind(this))
    }

    // --- Adds class sticky if above 0 pagetop
    scrollIsAtTop() {
        this.navigationBar.classList.add('sticky');
        document.querySelector(this.main).style.paddingTop = document.querySelector(this.navigationBarID).offsetHeight + 'px';
        
    }

    // --- Applies height of navigation ontop of (Main) content to stop jumping
    scrollBellow() {
        this.navigationBar.classList.toggle('sticky', false);
        document.querySelector(this.main).style.paddingTop = 0 + 'px';
    }

}