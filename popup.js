/*let changeColor = document.getElementById('changeColor');

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };*/

const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})
var alarmClock = {

	onHandler : function(e) {
		chrome.alarms.create("myAlarm", {delayInMinutes: 1} );
		//alert("sample text");
		window.close();
	},

	setup: function() {
		var a = document.getElementById('alarmOn');
		a.addEventListener('click',  alarmClock.onHandler );
	}
};

document.addEventListener('DOMContentLoaded', function () {
    alarmClock.setup();
});


chrome.alarms.onAlarm.addListener(function(alarm) {
  var myAudio = new Audio(chrome.runtime.getURL("alarm_audio.mp3"));
  (myAudio.play())
  alert("CLASS IS STARTING! CLICK THE ZOOM LINK!");
});
