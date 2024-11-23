export function scrollLock () {
  /*
    Set window.scrollLock to true when 
    you want the window to stop scrolling
  */
  window.scrollLock = false;
  window.previousScrollTop = 0
  var $window = window;
  
  $window.addEventListener('scroll',function (event) {
    if (window.scrollLock) {
      document.body.scrollTop = window.previousScrollTop;
    } else {}
    window.previousScrollTop = document.body.scrollTop;
  });
}

export function scrollLockSwitch(bool) {
  if (bool) {
    document.body.style.overflowY = 'hidden';
    window.scrollLock = true;
  } else {
    document.body.style.overflowY = 'unset';
    window.scrollLock = false;
  }
}