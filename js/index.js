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
//$.getScript("js/progressbar.min.js");
//$.getScript("js/timer.js");

var timeInterval = null
var minuteString = null
var secondString = null
var currentTimer = null


function startTimer(minutes, seconds, restSeconds, repeats) {
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
    startTimerObj(configuration, 0)
}



function stopTimer() {
    stopTimerObj()
}

