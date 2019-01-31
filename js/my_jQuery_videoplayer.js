$(function(){
  //return a DOM object
  /*var video = document.getElementById('videoID'); //or
  var video = $('#videoID').get(0); //or
  var video = $('#videoID')[0]; */

  //return a jQuery object
  var video = $('#video');
  console.log("video" + video);
  console.log("video[0]");
  console.log(video[0]);
  $playButton = $("#play-pause");

  //Play/Pause control clicked
$('#play-pause').on('click', function() {
    if(video[0].paused) {
        video[0].play();
        $playButton.text("pause");
    }
    else {
        video[0].pause();
        $playButton.text("play");
    }
    return false;
});

//get HTML5 video time duration
video.on('loadedmetadata', function() {
  //alert ("hey");
    $('.duration').text(video[0].duration);
});

//update HTML5 video current play time
video.on('timeupdate', function() {
    $('.current').text(video[0].currentTime);
    var currentPos = video[0].currentTime; //Get currenttime
    var maxduration = video[0].duration; //Get video duration
    var percentage = 100 * currentPos / maxduration; //in %
    $('.timeBar').css('width', percentage+'%');
});

var timeDrag = false;   /* Drag status */
$('.progressBar').mousedown(function(e) {
    timeDrag = true;
    updatebar(e.pageX);
});
$(document).mouseup(function(e) {
    if(timeDrag) {
        timeDrag = false;
        updatebar(e.pageX);
    }
});
$(document).mousemove(function(e) {
    if(timeDrag) {
        updatebar(e.pageX);
    }
});

//update Progress Bar control
var updatebar = function(x) {
    var progress = $('.progressBar');
    var maxduration = video[0].duration; //Video duraiton
    var position = x - progress.offset().left; //Click pos
    var percentage = 100 * position / progress.width();

    //Check within range
    if(percentage > 100) {
        percentage = 100;
    }
    if(percentage < 0) {
        percentage = 0;
    }

    //Update progress bar and video currenttime
    $('.timeBar').css('width', percentage+'%');
    video[0].currentTime = maxduration * percentage / 100;
};

//loop to get HTML5 video buffered data
var startBuffer = function() {
    var maxduration = video[0].duration;
    var currentBuffer = video[0].buffered.end(0);
    var percentage = 100 * currentBuffer / maxduration;
    $('.bufferBar').css('width', percentage+'%');

    if(currentBuffer < maxduration) {
        setTimeout(startBuffer, 500);
    }
};
setTimeout(startBuffer, 500);

//Mute/Unmute control clicked
$('#mute').click(function() {
    video[0].muted = !video[0].muted;
    $(this).toggleClass('red');
    //return false;
});

  //Volume control clicked
  $volume = $('#volume-bar');
  $volume.on('mouseup', function(e) {
      var position = e.pageX - $volume.offset().left;
      console.log("pos" + position);
      var volumePos = position / $volume.width();
      console.log("volumePos " + volumePos);
      //$volume.css('width', percentage+'%');
      if(volumePos < 0.02){
        video[0].volume = 0;
      }
      else if (volumePos < 0.98) {
        video[0].volume = volumePos;
      }
      else{
        video[0].volume = 1;
      }
    });

  //Fast forward control
  $('.ff').on('click', function() {
      video[0].playbackRate = 3;
      return false;
  });

  //Rewind control
  $('.rw').on('click', function() {
      video[0].playbackRate = -3;
      return false;
  });

  //Slow motion control
  $('.sl').on('click', function() {
    alert("clicked");
      video[0].playbackRate = 0.5;
      alert(video[0].playbackRate);
      return false;
  });
});
