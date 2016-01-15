

	console.log("Hello, I'm a timer")

   var circle = new ProgressBar.Circle('#progressBar', {
        strokeWidth: 3,
        trailWidth: 1,
        text: {
            value: "00:00"
        },

    });
    console.log("I have just created " + circle)

var timeInterval = null

function startTimerObj(configuration, i) {
    circle.set(0)
	console.log(configuration.length + " -> " + i)
	console.log(circle)
	circle.setText("Working")
	var first = configuration[i]
	var minutes = first.minutes
	var seconds = first.seconds
	var duration = parseInt(minutes) * 60 + parseInt(seconds)
    console.log("Duration -> " + duration)
    circle.duration = duration
    var totalDuration = duration, minutes, seconds;
    var originalDuration = totalDuration
    var durationCount = 1
	var circleColour = first.rest ? "#008" : "#0F0"
    console.log("This is the circle colour -> " + circleColour + " based on using rest = " + first.rest)
    console.log("Timer -> " + totalDuration)
    timeInterval = setInterval(function () {
        var minutes = parseInt(totalDuration / 60, 10);
        var seconds = parseInt(totalDuration % 60, 10);

        minuteString = minutes < 10 ? "0" + minutes : minutes;
        secondString = seconds < 10 ? "0" + seconds : seconds;
        console.log(minuteString + ":" + secondString)
        console.log("Animate to " + durationCount + "/" + originalDuration + ". totalDuration = " + totalDuration)
        circle.animate(durationCount / originalDuration, {
            duration : 1000,
            from : {color : circleColour},
            to : {color : circleColour}
        })

        circle.setText(minuteString + ":" + secondString);
        --totalDuration
        console.log("Looping")
        if (++durationCount == originalDuration + 2) {
            clearInterval(timeInterval)
            circle.stop()
            console.log(configuration.length + " -> " + i)
            if(i < configuration.length - 1){
            	startTimerObj(configuration, ++i)
            } 

        }
    }, 1000);

    
}

function stopTimerObj() {
    console.log("Attempting to stop timer")
    if(timeInterval){
        console.log("Stopping timer")
        clearInterval(timeInterval)
        timeInterval = null
        circle.stop()
        circle.setText("00:00")
        // reset circle here
    } else {
        console.log("No interval timer to stop")
    }
}
