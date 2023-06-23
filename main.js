peter_pan_song = "";
Harry_Potter_Theme_song = "";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
scoreleftWrist = 0;
song_Peter_pan = "";
scorerightWrist = 0;
song_Harry_Potter_Theme = "";


function setup() {
    canvas = createCanvas(600, 530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    peter_pan_song = loadSound("music2.mp3");
    Harry_Potter_Theme_song = loadSound("music.mp3");
}

function draw() {
    image(video, 0, 0, 600, 530);

    fill("#37ff00");
    stroke("#ff0000");

    song_Harry_Potter_Theme = Harry_Potter_Theme_song.isPlaying();
    console.log("Harry potter song = " + song_Harry_Potter_Theme);


    song_Peter_pan = peter_pan_song.isPlaying();
    console.log("Peter pan song = " + song_Peter_pan);

    if (scoreleftWrist > 0.2) {
        circle(leftWrist_x, leftWrist_y, 20);
        Harry_Potter_Theme_song.stop();
        if (song_Peter_pan == false) {
            peter_pan_song.play();
        }
        else {
            document.getElementById("song_id").innerHTML = "Song Name : Peter Pan ";
        }
    }

    if (scorerightWrist > 0.2) {
        circle(rightWrist_x, rightWrist_y, 20);
        peter_pan_song.stop();
        if (song_Harry_Potter_Theme == false) {
            Harry_Potter_Theme_song.play();
        }
        else {
            document.getElementById("song_id").innerHTML = "Song Name : Harry potter ";
        }
    }
}

function modelLoaded() {
    console.log("PoseNet Is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("leftwrist_Score = " + scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("rightwrist_Score = " + scorerightWrist);


        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftwrist_x = " + leftWrist_x + "leftwrist_y" + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightwrist_x = " + rightWrist_x + "rightwrist_y" + rightWrist_y);

    }
}