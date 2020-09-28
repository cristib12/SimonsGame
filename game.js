var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    //gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").text("Level" +" " + level );
    
    }


$(".btn").click(function () {

    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(event.target.id);
    animatePress(event.target.id);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var randomButtonSound = new Audio("sounds/" + name + ".mp3");
    randomButtonSound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).one("keypress", function () {
    nextSequence();
});

function checkAnswer(currentLevel) {
    if ( userClickedPattern[currentLevel] === gamePattern[currentLevel] ) {
        console.log("yay"); 
        if (userClickedPattern.length === gamePattern.length) {
             setTimeout(function () {
        nextSequence()
    }, 1000);
        }
    } else { 
        
        $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100);
        $("#level-title").text("Game Over, Refresh to Restart");
        playSound("wrong");
        console.log("wrong");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    }