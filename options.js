// Saves options to chrome.storage
function save_options() {
  let width = Number(document.getElementById('width').value);
  let height = Number(document.getElementById('height').value);
  let autoUpdate = document.getElementById('autoUpdate').checked;
  let autoStart = document.getElementById('autoStart').checked;
  chrome.storage.sync.set({
    width: width,
    height: height,
    autoUpdate: autoUpdate,
	autoStart: autoStart
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    width: 1000,
    height: 650,
    autoUpdate: true,
	autoStart: true
  }, function(items) {
    document.getElementById('width').value = items.width;
    document.getElementById('height').value = items.height;
    document.getElementById('autoUpdate').checked = items.autoUpdate;
	document.getElementById('autoStart').checked = items.autoStart;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);