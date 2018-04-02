// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    let screenWidth = document.body.clientWidth;
    let tileCount = 20;
    let canvasSize = screenWidth - 20 - screenWidth % tileCount;    
    let tileSize = canvasSize / tileCount;
    let positionX = 10;
    let positionY = 10;
    let velocityX = 0;
    let velocityY = 0;
    let trail = [];
    let tail = 5;

    let appleX = 5;
    let appleY = 15;

    document.body.innerHTML += '<canvas id="gc" height="' + canvasSize + '" width="' + canvasSize + '"></canvas>';
    
    let canvas = document.getElementById("gc");
    let ctx = canvas.getContext("2d");

    let messageBox = document.getElementById('message');
    let swipearea = document.getElementById('swipearea');
    let gestures = new Hammer(swipearea);
    gestures.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    gestures.on('panleft', function () {
        velocityX = -1; velocityY = 0;
    });
    gestures.on('panright', function () {
        velocityX = 1; velocityY = 0;
    });
    gestures.on('panup', function () {
        velocityX = 0; velocityY = -1;
    });
    gestures.on('pandown', function () {
        velocityX = 0; velocityY = 1;
    });
    setInterval(game, 1000 / 15);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    }

    function game() {
        positionX += velocityX;
        positionY += velocityY;

        // wrap around screen
        if (positionX < 0) {
            positionX = tileCount - 1;
        }
        if (positionX > tileCount - 1) {
            positionX = 0;
        }
        if (positionY < 0) {
            positionY = tileCount - 1;
        }
        if (positionY > tileCount - 1) {
            positionY = 0;
        }

        ctx.clearRect(0, 0, canvasSize, canvasSize);

        ctx.fillStyle = "lime";

        for (let i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tileSize, trail[i].y * tileSize, tileSize - 2, tileSize - 2);
            if (trail[i].x === positionX && trail[i].y === positionY) {
                tail = 5;
            }
        }

        trail.push({ x: positionX, y: positionY });

        while (trail.length > tail) {
            trail.shift();
        }

        if (appleX == positionX && appleY == positionY) {
            tail++;
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
        }
        ctx.fillStyle = "red";
        ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize - 2, tileSize - 2);
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    }

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    }
} )();