// BSQ DJ 2014
// Property of CHERRY

// LOOP
var vendors = ['webkit', 'moz'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
        window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}
var interval = 1000 / 60,
    lastTime = (new Date()).getTime(),
    currentTime = 0,
    delta = 0;


var soundBGM;
var arrBGM = [];
var currentBGM = 0;

var dataRecord = [];

var position = 0;


var lastNote = 0;


var time;
var elapsed = 0;
function gameLoop1() {
    setTimeout(function () {
        requestAnimationFrame(gameLoop);
        // Drawing code goes here
        var now = new Date().getTime(),
            dt = now - (time || now);
        time = now;

        // Drawing code goes here... for example updating an 'x' position:
        if (elapsed > 1000) {
        
            elapsed = elapsed - 1000;
        }			    
        elapsed += dt;
        
        $("#time").html(elapsed);


    }, 1000 / 60);
}

function gameLoop() {

    window.requestAnimationFrame(gameLoop);
    currentTime = (new Date()).getTime();
    delta = (currentTime - lastTime);

    if (delta > interval) {

        //$("#time").html(lastNote++);


        //if (!bPHONEGAP) {
        //    
        //   
        //    
        //} else {
        //
        //
        //    soundBGM.getCurrentPosition(
        //        // success callback
        //        function (position) {
        //            if (position > -1) {
        //                //$("#time").html(position*1000);
        //                //console.log((position) + " sec");
        //            }
        //        },
        //        // error callback
        //        function (e) {
        //            //console.log("Error getting pos=" + e);
        //        }
        //    );
        //}
        //
        if (bReplay) {
          
            var temp;

            if (!bPHONEGAP) {
                temp = Math.round(soundBGM.currentTime * 1000);
                
                
                var percent = temp/(soundBGM.duration*1000) * 100;                
                percent = Math.round(percent);
                
                $("#time").html(percent);
                $("#slider").width((percent*555/100)+"px");

                for (var i = 0; i < dataRecord.length; i++) {
                    var tempRecord = dataRecord[i].split(",");
                    var tempTime = tempRecord[0];
                    var tempNote = tempRecord[1];

                    var temp1 = parseInt(tempTime);



                    if ((temp1 - 10) < temp && (temp1 + 10) > temp) {

                        if (lastNote == 0 || lastNote != i) {

                            playSound(parseInt(tempNote));

                            console.log(temp1 + " " + parseInt(tempNote));

                            lastNote = i;
                        }



                    }
                }
            } else {
                soundBGM.getCurrentPosition(
                    // success callback
                    function (position) {
                        if (position > -1) {
                            temp = (position * 1000);

                            for (var i = 0; i < dataRecord.length; i++) {
                                var tempRecord = dataRecord[i].split(",");
                                var tempTime = tempRecord[0];
                                var tempNote = tempRecord[1];

                                var temp1 = parseInt(tempTime);
                                
                                if ((temp1 - 10) < temp && (temp1 + 10) > temp) {

                                    if (lastNote == 0 || lastNote != i) {

                                        playSound(tempNote);

                                        //console.log(temp1 + " " + parseInt(tempNote));

                                        lastNote = i;
                                    }


                                }
                            }

                        }
                    },
                    // error callback
                    function (e) {
                        //console.log("Error getting pos=" + e);
                    }
                );

            }


        }

        lastTime = currentTime - (delta % interval);
    }


}

var strSnd = [];
strSnd[0] = "res/SOUND/snd-0.wav";
strSnd[1] = "res/SOUND/snd-1.wav";
strSnd[2] = "res/SOUND/snd-2.wav";
strSnd[3] = "res/SOUND/snd-3.wav";
strSnd[4] = "res/SOUND/beat-edm.wav";
strSnd[5] = "res/SOUND/beat-hiphop.wav";
strSnd[6] = "res/SOUND/beat-house.wav";

var listAudio = [];

listAudio[0] = new Audio(strSnd[0]);
listAudio[1] = new Audio(strSnd[1]);
listAudio[2] = new Audio(strSnd[2]);
listAudio[3] = new Audio(strSnd[3]);
//listAudio[4] = new Audio("res/EF_UBEAT_05.mp3");
//listAudio[5] = new Audio("res/EF_UBEAT_06.mp3");




var beat = [];


var counter = 0;

function playSoundReplay(id) {
    if (bPHONEGAP) {

        var tempID = parseInt(id);

        beat[tempID].pause();
        beat[tempID].seekTo(0);
        beat[tempID].play();
    }
}

function playSound(id) {
    if (bPHONEGAP) {

        var tempID = parseInt(id);

        //beat[tempID].pause();
        //beat[tempID].seekTo(0);
        //beat[tempID].play();

        var url = strSnd[tempID];

        var my_media = new Media(url,
            // success callback
            function () {
                //console.log("playAudio():Audio Success");
                //my_media.release();
            },
            // error callback
            function (err) {
                //console.log("playAudio():Audio Error: " + err);
            }
        );
        // Play audio
        my_media.play();

    } else {
        if (listAudio[id].currentTime > 0) {
            listAudio[id].pause();
            listAudio[id].currentTime = 0;
            listAudio[id].play();
        } else {
            listAudio[id].play();
        }
    }

    if (bRecord) {
        var temp;

        if (!bPHONEGAP) {
            temp = Math.round(soundBGM.currentTime * 1000);


            var tempRecord = temp + "," + id;

            dataRecord.push(tempRecord);

            $("#time").html(tempRecord + " length : " + dataRecord.length);
            console.log(tempRecord);
        } else {
            soundBGM.getCurrentPosition(
                // success callback
                function (position) {
                    if (position > -1) {
                        temp = (position * 1000) + 10;

                        var tempRecord = temp + "," + id;

                        dataRecord.push(tempRecord);

                        $("#time").html(tempRecord + " length : " + dataRecord.length);

                        console.log(tempRecord);
                        //console.log((position) + " sec");
                    }
                },
                // error callback
                function (e) {
                    //console.log("Error getting pos=" + e);
                }
            );
        }


    }

}


if (bPHONEGAP) document.addEventListener("deviceready", onDeviceReady, false);
else {
    $(document).ready(function () {
        onDeviceReady();
    })
}


function onDeviceReady() {

    if (bPHONEGAP) {
        beat[0] = new Media(strSnd[0], function () {}, function () {});
        beat[1] = new Media(strSnd[1], function () {}, function () {});
        beat[2] = new Media(strSnd[2], function () {}, function () {});
        beat[3] = new Media(strSnd[3], function () {}, function () {});        
    }

    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.

        //alert("Support !");

        if (localStorage['test']) {

            localStorage.setItem("test", "bsq2");

        } else if (!localStorage['test']) {

            localStorage.setItem("test", "bsq");

        }

        //alert("bsq " + localStorage.test);

    } else {
        // Sorry! No Web Storage support..
    }

    window.addEventListener("touchmove", function (e) {
        e.preventDefault();
    })




    $(".buttonMusic").bind("touchstart", function () {

        var tempid = $(this).attr("bsq-id");
        playSound(tempid);

        //$(this).css({
        //    'background': 'red'
        //})
    })

    $(".buttonMusic").bind("touchend", function () {

        //var tempid = $(this).attr("bsq-id");
        //playSound(tempid);

        //$(this).css({
        //    'background': 'white'
        //})

    })

    //$(soundBGM).bind('ended', function () {
    //    stopMusic();
    //})

    if (!bPHONEGAP) {
        
        arrBGM[0] = new Audio(strSnd[4]);
        arrBGM[1] = new Audio(strSnd[5]);
        arrBGM[2] = new Audio(strSnd[6]);
        
        soundBGM = arrBGM[currentBGM];
        
    } else {
        
        arrBGM[0] = new Media(strSnd[4], function () {}, function () {});
        arrBGM[1] = new Media(strSnd[5], function () {}, function () {});
        arrBGM[2] = new Media(strSnd[6], function () {}, function () {});
        
        soundBGM = arrBGM[currentBGM];

    }

    gameLoop();
    
    //alert("Load done!");
    
    introState();
    
    $(".buttonStyle").bind('touchstart',function(){
        var tempID = $(this).attr('style-id');
        
        soundBGM = arrBGM[tempID];
        
        currentBGM = tempID;
        
        gotoScene("#panelGame");
        startRecord();
    })
    
    $("#doneReplay").bind('touchstart',function(){
        
        gotoScene("#panelSend");
    })
    
    //$("#doneSend").bind('touchstart',function(){
    //    
    //    thankState();
    //})
    
    $("#buttonCONFIG").bind('touchstart',function(){
        var tempPass = prompt("Input password");
        if (tempPass == "a") {
            $("#panelConfig").fadeIn();
        }
        
        
        //$("#panelConfig").fadeIn();
        
    })
}

function introState() {
    gotoScene("#panelIntro");
    setTimeout(function(){
        gotoScene("#panelSelectStyle");
    },2000)
}


function thankState(){
    
    document.activeElement.blur();
    
    resetGame();
    gotoScene("#panelThank");
    setTimeout(function(){
        introState();
    },2000);
}

function gotoScene(id){
    $(".panel").hide();
    $(id).show();
}


function resetGame(){
    
    dataRecord = [];
    lastNote = 0;
    
    
    stopMusic();
}


var bRecord = false;

function startRecord() {

    bRecord = true;
    soundBGM.play();
}

var bReplay = false;

function stopMusic() {
    
    
    soundBGM.pause();
    if (!bPHONEGAP) {
        if (soundBGM.currentTime != 0) {
            soundBGM.currentTime = 0;    
        }
        
    } else {
        soundBGM.seekTo(0);
    }
    
    if (bRecord) {        
        bRecord = false;
    }
    if (bReplay) {
        bReplay = false;
    }

}

function stopRecord() {


    soundBGM.pause();

    if (!bPHONEGAP) {
        soundBGM.currentTime = 0;
    } else {
        soundBGM.seekTo(0);
    }

    if (bRecord) {
        bRecord = false;
    }
    
    gotoScene("#panelReplay");
}

function startReplay() {
    if (!bReplay) {
        
        soundBGM.play();
        $("#icon3").fadeIn();
        $("#slider").fadeIn();
        bReplay = true;
        
    }else{
        stopMusic();
        $("#icon3").fadeOut();
    }
    
}


function reload(){
    var temp = confirm("Do you want to reload ?");
    if(temp) window.location.href = "";
}

///////////////////////////////////
var stopWatch = 0;
var stopWatchLast = 0;
var bStopWatch = false;

function startTime() {
    if (!bStopWatch) {
        stopWatch = (new Date()).getTime();

        bStopWatch = true;
    }
}

function updateTime() {
    if (bStopWatch) {

        return stopWatchLast = (new Date()).getTime() - stopWatch;

    }

    return 0;
}

function stopTime() {
    if (bStopWatch) {
        bStopWatch = false;
    }
}