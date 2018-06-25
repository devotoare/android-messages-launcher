function findWindow(url = 'https://messages.android.com/') {
  // Find already open tabs and remove them to prevent duplicates
  chrome.tabs.query({currentWindow: false}, function(tabs) {
    tabs.forEach(function(tab) {
      if(tab.url === url) {
        chrome.tabs.remove(tab.id);
      }
    });
  });

  // Create new window, which grants focus
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
