/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
$.getScript("js/progressbar.min.js");

var timeInterval = null
var minuteString = null
var secondString = null

var circle = new ProgressBar.Circle('#progressBar', {
        color: '#F00',
        strokeWidth: 3,
        trailWidth: 1,
        text: {
            value: "00:00"
        },

    });


function startTimer(minutes, seconds, display) {
    console.log("Starting timer")
    console.log("Minutes -> " + minutes)
    console.log("Seconds -> " + seconds)
    var duration = parseInt(minutes * 60) + parseInt(seconds)
    circle.duration = duration
    console.log("Duration -> " + duration)
    var timer = duration, minutes, seconds;
    timeInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minuteString = minutes < 10 ? "0" + minutes : minutes;
        secondString = seconds < 10 ? "0" + seconds : seconds;

        display.text(minuteString + ":" + secondString);
        circle.setText(minuteString + ":" + secondString);
        if (--timer < 0) {
            clearInterval(timeInterval)
            display.text("Timer Complete");
            circle.stop()
        }
    }, 1000);


    circle.animate(1, {
        duration : duration * 1000,
        from : {color : "#F00"},
        to : {color : "#0F0"}
    })
}

function stopTimer(display) {
    console.log("Attempting to stop timer")
    if(timeInterval){
        console.log("Stopping timer")
        clearInterval(timeInterval)
        display.text("Timer Stopped")
        timeInterval = null
    } else {
        console.log("No interval timer to stop")
    }
}