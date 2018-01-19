window.onload = function() {

  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");
  var canvas = document.getElementById("canvas");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");

  var line = true;
	var bars = false;
  var double = false;
	var dots = false;
  var dark = true;
  var colour = false;


	document.getElementById("line").onclick = function() {
		line = true;
		bars = false;
    double = false;
		dots = false;
	}

	document.getElementById("bars").onclick = function() {
		line = false;
		bars = true;
    double = false;
		dots = false;
	}

  document.getElementById("double").onclick = function() {
		line = false;
		bars = false;
    double = true;
		dots = false;
	}

	document.getElementById("dots").onclick = function() {
		line = false;
		bars = false;
    double = false;
		dots = true;
	}

  document.getElementById("dark").onclick = function() {
		dark = true;
    colour = false;
	}

  document.getElementById("colour").onclick = function() {
		dark = false;
    colour = true;
	}

  file.onchange = function() {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.loop = true;
    audio.load();
    audio.play();

    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.smoothingTimeConstant = 0.85;

    analyser.fftSize = 512;
    var bufferLength = analyser.frequencyBinCount;

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2;
    var barHeight;
    var x = 0;



    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      if(dark){
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }else if(colour){

        var time = new Date();
        var hexhour = time.getHours();
        var min = time.getMinutes();
        var sec = time.getSeconds();

        if(hexhour < 10){
          hexhour = "0" + hexhour;
        }

        if(min < 10){
          min = "0" + min;
        }

        if(sec < 10){
          sec = "0" + sec;
        }

        var hexVal = '#' + hexhour + min + sec;
        ctx.fillStyle = hexVal;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }


      if(dots){
        for (var i = 0; i < bufferLength; i++) {
  			     barHeight = dataArray[i];

             var r = barHeight + (25 * (i/bufferLength));
             var g = 300 * (i/bufferLength);
             var b = 100;

             ctx.fillRect(x - 25, HEIGHT - 2* barHeight, barWidth + 4, 2);
             if(dark){
  			        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
             }else{
               ctx.fillStyle = "#eee";
             }

  			     x += barWidth + 0.5;
        }

      }else if(double){

        ctx.moveTo(0, 0);
        ctx.beginPath();
        ctx.moveTo(-20, HEIGHT - (2.5 * dataArray[0]));

        for (var i = 0; i < bufferLength; i++) {
             barHeight = dataArray[i];

              ctx.lineTo(x, HEIGHT - (2 * barHeight + 25));

              var r = barHeight + (10 * (i/bufferLength));
              var g = 150 * (i/bufferLength);
              var b = 100;

              if(dark){
   			        ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
              }else{
                ctx.strokeStyle = "#eee";
              }
      				ctx.lineWidth = 2;

              if(dark){
   			        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
              }else{
                ctx.fillStyle = "#f5f5dc";
              }
              ctx.fillRect(x, HEIGHT - 1.75*barHeight, barWidth/2, 1.75*barHeight);
              ctx.shadowColor = "white";

              x += barWidth + 1;
        }

        ctx.stroke();

     }else if(bars){

       for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

             var r = barHeight + (10 * (i/bufferLength));
             var g = 200 * (i/bufferLength);
             var b = 150;

             if(dark){
  			        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
             }else{
               ctx.fillStyle = "#f5f5dc";
             }
             ctx.fillRect(x, HEIGHT - 1.75*barHeight, barWidth/2 , 1.75 *barHeight);
             ctx.shadowColor = "white";

             x += barWidth + 1;
       }

     }else if(line){
        ctx.moveTo(0, 0);
        ctx.beginPath();
				ctx.moveTo(-20, HEIGHT - (2.5 * dataArray[0] + 50));

				for (var i = 1; i < bufferLength; i++) {
			        barHeight = dataArray[i];

					    ctx.lineTo(x, HEIGHT - (2 * barHeight + 25));

			        x += 1.05 * barWidth;

              var r = barHeight + (10 * (i/bufferLength));
              var g = 150 * (i/bufferLength);
              var b = 100;

              if(dark){
   			        ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
              }else{
                ctx.strokeStyle = "#eee";
              }
      				ctx.lineWidth = 2;

			  }

        ctx.stroke();
      }

    }

    renderFrame();
  };
};
