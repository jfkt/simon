var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$("body").keypress(function(event) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  // $("#" + randomChosenColor).animate({opacity: 0.5}).animate({opacity: 1});
  // $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#" + randomChosenColour).fadeTo('fast', 0).fadeTo('fast', 1);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
}

$(".btn-str").click(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $(this).hide();
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound($(this).attr("id"));
  animatePress(userChosenColour);
  // if (userClickedPattern.length <= level) {
  checkAnswer(level);
  // }
  console.log(userClickedPattern);
});

function playSound(name) {
  var plSound = new Audio("sounds/" + name + ".mp3");
  plSound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {

  if (userClickedPattern[userClickedPattern.length - 1] == gamePattern[userClickedPattern.length - 1]) {
    console.log("Success");
    if (currentLevel == userClickedPattern.length) {
      setTimeout(nextSequence(), 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    $("#A-key").text("Restart");
    $(".btn-str").show();
    console.log("Wrong - Game over");
  }

}

function startOver(){
  level = 0 ;
  gamePattern = [];
  started = false;

}
