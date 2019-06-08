'use strict';

var timeoutId = 0;

window.addEventListener('resize', function() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(function() {
    chrome.runtime.sendMessage({method: 'resize'});
    timeoutId = 0;
  }, 100);
}, false);