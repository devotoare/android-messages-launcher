var width = 1000;
var height = 650;

chrome.storage.sync.get({
  autoUpdate: true
}, function(items) {
  autoUpdate = items.autoUpdate
  if (autoUpdate) {
    chrome.runtime.onMessage.addListener(function requested(request) {
      if (request.method === 'resize') {
        chrome.tabs.query({currentWindow: true, windowType: 'popup', url: 'https://messages.google.com/*'}, function(tabs) {
          tabs.forEach(function(tab) {
            chrome.storage.sync.set({
              width: tab.width,
              height: tab.height
            });
          });
        });
      }
    });
  }
});

function restore_options() {
  chrome.storage.sync.get({
    width: 1000,
    height: 650
  }, function(items) {
    width = items.width;
    height = items.height;
  });
}

function createWindow(url = 'https://messages.google.com/web/') {
  // Create new window
  chrome.windows.create({
    focused: true,
    incognito: false,
    url: url,
    type: 'popup',
    width: width,
    height: height
  });
}

function handleWindow() {
  var tabFound = false;
  // Find already open tabs and remove them to prevent duplicates
  chrome.tabs.query({currentWindow: false, windowType: 'popup', url: 'https://messages.google.com/*'}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.windows.update(tab.windowId, {focused: true});
      tabFound = true;
    });
  });

  setTimeout(function(){
    if (!tabFound) {
      createWindow();
    }
  }, 50);
}

chrome.commands.onCommand.addListener( function(command) {
  restore_options();
  handleWindow();
});

chrome.browserAction.onClicked.addListener( function() {
  restore_options();
  handleWindow();
});