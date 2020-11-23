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