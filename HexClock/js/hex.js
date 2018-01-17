var clock = document.getElementById('clock');
var hexC = document.getElementById('hex-colour');
var mid = document.getElementById('ampm');


function createClock(){
  var time = new Date();
  var clockhour = time.getHours()%12;
  var hexhour = time.getHours();
  var min = time.getMinutes();
  var sec = time.getSeconds();
  var midday = "AM";

  if(clockhour < 10){
    clockhour = "0" + clockhour;
  }

  if(hexhour < 10){
    hexhour = "0" + hexhour;
  }

  if(hexhour < 12){
    midday = "AM";
  }else{
    midday = "PM";
  }

  if(min < 10){
    min = "0" + min;
  }

  if(sec < 10){
    sec = "0" + sec;
  }

  if(clockhour == 0){
    clockhour = 12;
  }

  if($(window).width() < 500){
    var clockVal = clockhour + ':' + min + ':' + sec;
  }else{
    var clockVal = clockhour + ' : ' + min + ' : ' + sec;
  }
  var hexVal = '#' + hexhour + min + sec;

  clock.textContent = clockVal;
  hexC.textContent = hexVal;
  mid.textContent = midday;

  document.body.style.backgroundColor = hexVal;

}

createClock();
setInterval(createClock, 1000);
