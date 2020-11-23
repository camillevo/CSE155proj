chrome.alarms.onAlarm.addListener(function(alarm) {
  var myAudio = new Audio(chrome.runtime.getURL("alarm_audio.mp3"));
  (myAudio.play())
  alert("CLASS IS STARTING! CLICK THE ZOOM LINK!");
});

alert("tester");