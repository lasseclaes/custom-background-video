/* This is very much inspired by a Lynda course and
http://blog.teamtreehouse.com/building-custom-controls-for-html5-videos
For pedagogical reasons the later has been translated to jQuery */

$(function(){
  //alert("hello");

  // Video
  //var video = document.getElementById("video");
  $video = $("#video").get(0); //lcj important!

  // Buttons
  //var playButton = document.getElementById("play-pause");
  //var muteButton = document.getElementById("mute");
  //var fullScreenButton = document.getElementById("full-screen");
  $playButton = $("#play-pause");
  $muteButton = $("#mute");
  $fullScreenButton = $("#full-screen");
  //console.log($muteButton);

  // Sliders
  //var seekBar = document.getElementById("seek-bar");
  //var volumeBar = document.getElementById("volume-bar");
  $seekBar = $("#seek-bar");
  $volumeBar = $("#volume-bar");

  // Event listener for the play/pause button
  //playButton.addEventListener("click", function() {
  $playButton.on("click", function() {
    //alert ("play-pause-button clicked");
    if ($video.paused == true) {
      //alert ("video paused: TRUE");
      // Play the video
      $video.play();

      // Update the button text to 'Pause'
      //playButton.innerHTML = "Pause";
      $playButton.text("pause");

    } else {
      // Pause the video
      $video.pause();

      // Update the button text to 'Play'
      //playButton.innerHTML = "Play";
      $playButton.text("play");
    }
  });

  // Event listener for the mute button
  $muteButton.on("click", function() {
    if ($video.muted == false) {
      // Mute the video
      $video.muted = true;

      // Update the button text
      $muteButton.text("Unmute");
    } else {
      // Unmute the video
      $video.muted = false;

      // Update the button text
      $muteButton.text ("Mute");
    }
  });

  // Event listener for the full-screen button
  //fullScreenButton.addEventListener("click", function() {
  $fullScreenButton.on("click", function(){
    if ($video.requestFullscreen) {
      $video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      $video.mozRequestFullScreen(); // Firefox
    } else if (video.webkitRequestFullscreen) {
      $video.webkitRequestFullscreen(); // Chrome and Safari
    }
  });

  // Event listener for the seek bar
  $seekBar.on("change", function() {
    //alert ("seekBar changed" );
  // Calculate the new time
  //console.log($video.duration);
  console.log("Seekbar value " + $seekBar.value);
  //console.log($seekBar.get(0).value);
  //var time = $video.duration * ($(this).get(0).value / 100);
  console.log("video duration " + $video.duration);
  var time = $video.duration * ($seekBar.get(0).value / 100);

  console.log(time);
  // Update the video time
  $video.currentTime = time;
  });

  // Update the seek bar as the video plays
  $video.addEventListener("timeupdate", function() {
    //alert("timeupdate");
    // Calculate the slider value
    //alert("hey");
    var seekBarValue = (100 / $video.duration) * $video.currentTime;
    //console.log(seekBarValue);
    // Update the slider value
    $seekBar.get(0).value = seekBarValue;

  });

  // Pause the video when the slider handle is being dragged
  //Problemet er vist ikke i Chrome - NOT A BIG FAN udelad evt.
  /*
  $seekBar.on("mousedown", function() {
    $video.pause();
  });

  // Play the video when the slider handle is dropped
  $seekBar.on("mouseup", function() {
    $video.play();
  })*/

  // Event listener for the volume bar
  $volumeBar.on("change", function() {
    // Update the video volume
    $video.volume = $volumeBar.get(0).value;
  });

//something related to how far the video is
  var currentTime = 0;
  //$video har vi
  $aside1 = $("#aside-1");
  $aside2 = $("#aside-2");
  $aside3 = $("#aside-3");
  $aside4 = $("#aside-4");

  function reset_opacity(){
    $aside1.css("opacity", 0);
    $aside2.css("opacity", 0);
    $aside3.css("opacity", 0);
    $aside4.css("opacity", 0);
  }

  //please note we already have en addEventListener above for this event (where we could put our code) - or add a function for the code here
  //duplicate eventListener for pedagogical reasons
  $video.addEventListener("timeupdate", function() {
    //alert("hey2");
  currentTime = $video.currentTime;
  console.log (currentTime);
  if(currentTime < 2){
    //alert ("below 5");
    reset_opacity();
    //$aside1.css("opacity", 1);
    $aside1.css("opacity", 1);
  }
  else if(currentTime < 4){
    reset_opacity();
    $aside2.css("opacity", 1);
  }
  else if(currentTime < 6){
    reset_opacity();
    $aside3.css("opacity", 1);
  }
  else {
    reset_opacity();
    $aside4.css("opacity", 1);
  }
});
//alert("hej");
});
