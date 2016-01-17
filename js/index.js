function checkEnable() {
        var seconds = $('#seconds').val()
        var minutes = $('#minutes').val()
        if(seconds != '0' && minutes != '0'){
            $('#startButton').enabled = true
            console.log("Button enabled")
        }
        else{
            $('#startButton').enabled = false
            console.log("button disabled")
        }
    }

    var app = angular.module('intervalTimer', ['angular-svg-round-progress']);
        app.controller('myCtrl', ['$scope','$interval', 'roundProgressService',
            function($scope,$interval, roundProgressService){

                $scope.currentTheme = 'defaultTheme'
                $scope.changeTheme = function(theme){
                console.log("Changing theme from " + $scope.currentTheme + " to " + theme)
                    $('#top').toggleClass($scope.currentTheme)
                    $('#top').toggleClass(theme)
                    $('header').toggleClass($scope.currentTheme)
                    $('header').toggleClass(theme)
                    $scope.currentTheme = theme
                }
$scope.timeInterval = null
    $scope.intervalData = {
        singleSelect: null,
        1: '1',
        2: '2',
        3: '3'
    }

    $scope.minutesData = {
        singleSelect: null,
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6'
    }

    $scope.restData = {
        singleSelect: null,
        15: '15',
        30: '30',
        45: '45',
        60: '60'
    }

    $scope.secondsData = {
        singleSelect: null,
        0: '0',
        15: '15',
        30: '30',
        45: '45'
    }

    $scope.animations = [];

            angular.forEach(roundProgressService.animations, function(value, key){
                $scope.animations.push(key);
            });

    $scope.tabView = 'countdown'
    $scope.changeTabView = function(tabChange) {
     console.log("changing tabView to -> " + tabChange)
       $scope.tabView = tabChange;
    };

    $scope.playPredefined = function() {
        console.log("Setting intervals to 3")
        $scope.intervalData.singleSelect = "3"
        console.log($('#intervals').val())
        $scope.restData.singleSelect = "15"
        $scope.minutesData.singleSelect = "5"
        $scope.secondsData.singleSelect = "15"
        $scope.changeTabView('countdown')
    }

    $scope.startTimer = function() {
    minutes = $scope.minutesData.singleSelect
    seconds = $scope.secondsData.singleSelect
    restSeconds = $scope.restData.singleSelect
    repeats = $scope.intervalData.singleSelect
    console.log("Creating Timer object with mintes -> " + minutes + ": seconds -> " + seconds +  " - repeats -> " + repeats);
    var configuration = []
    configuration[0] = {minutes: minutes, seconds: seconds}
    if(repeats > 1)
        repeats = (repeats - 1) * 2
    var i = 1
    while(i < repeats) {
        configuration[i] = {minutes: 0, seconds: restSeconds, rest:true}
        configuration[i + 1] = {minutes :minutes, seconds: seconds}
        i += 2
    }
    var currentTimer = configuration
    console.log(configuration)
    console.log("Created timer, starting it");
    console.log(currentTimer)
    $scope.startTimerObj(configuration, 0)
}

$scope.startTimerObj = function(configuration, i) {
    // circle.set(0)
    console.log(configuration.length + " -> " + i)
    // console.log(circle)
    // circle.setText("Working")
    var first = configuration[i]
    var minutes = first.minutes
    var seconds = first.seconds
    var duration = parseInt(minutes) * 60 + parseInt(seconds)
    console.log("Duration -> " + duration)
    // circle.duration = duration
    var totalDuration = duration, minutes, seconds;
    $scope.max = totalDuration
    console.log("Setting circle max = " + $scope.max)
    var durationCount = 1
    var circleColour = first.rest ? "#008" : "#0F0"
    console.log("This is the circle colour -> " + circleColour + " based on using rest = " + first.rest)
    console.log("Timer -> " + totalDuration)
    $scope.promise = $scope.timeInterval = $interval(function () {
        var minutes = parseInt(totalDuration / 60, 10);
        var seconds = parseInt(totalDuration % 60, 10);

        minuteString = minutes < 10 ? "0" + minutes : minutes;
        secondString = seconds < 10 ? "0" + seconds : seconds;
        console.log(minuteString + ":" + secondString)
        console.log("Animate to " + durationCount + ". totalDuration = " + totalDuration)
        $scope.current = durationCount

        // circle.setText(minuteString + ":" + secondString);
        --totalDuration
        console.log("Looping")
        if (++durationCount == $scope.max + 2) {
            clearInterval(timeInterval)
            // circle.stop()
            console.log(configuration.length + " -> " + i)
            if(i < configuration.length - 1){
                startTimerObj(configuration, ++i)
            } 

        }
    }, 1000);

    
}

$scope.stopTimerObj = function() {
    console.log("Attempting to stop timer")
    var out = $interval.cancel($scope.promise)
    console.log("Interval cancelled -> " + out)
        console.log("Stopping timer")
        clearInterval(timeInterval)
        timeInterval = null
}
    }]);
