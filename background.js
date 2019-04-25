function findWindow(url = 'https://messages.google.com/') {
  var tabFound = false;
  // Find already open tabs and remove them to prevent duplicates
  chrome.tabs.query({currentWindow: false}, function(tabs) {
    tabs.forEach(function(tab) {
      if(tab.url === url) {
        chrome.windows.update(tab.windowId, {focused: true});
        tabFound = true;
      }
    });
  });

  setTimeout(function(){
    if (!tabFound) {
      createWindow();
    }
  }, 50);
}

function createWindow(url = 'https://messages.google.com/') {
  // Create new window
  chrome.windows.create({
    focused: true,
    incognito: false,
    url: url,
    type: 'popup',
    width: 1000,
    height: 660
  });
}

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {
    code: ''
  }, function(resultArr) {
    findWindow();
  });
});
