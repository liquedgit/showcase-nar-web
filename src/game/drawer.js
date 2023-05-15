import Player from "./Controller/PlayerController/Player.js";
import CameraBox from "./utils/camera/CameraBox.js"
import Background from "./GameObjects/Background.js";
import Platform from "./GameObjects/Platform.js";
import Boss from "./Controller/BossController/Boss.js";
import DeltaTime from "./DeltaTime.js";
import GameController from "./GameController.js";

let canvas = document.getElementById("MainCanvas");
let context = canvas.getContext("2d");

let theme = new Audio("../../Assets/Sound/Theme.mp3");
let themePlayed = false;

let dimension = {
    "width" : window.innerWidth,
    "height" : window.innerHeight,
    extraX: 0,
    extraY: 0
}

let border = {
    width: 0,
    height: 0
}

let mouseState = {
    "x" : 0,
    "y" : 0,
    "isDown" : false
}

let keyMap = {
    "a" : false,
    "d" : false,
    "w" : false,
    " " : false,
    "s" : false
};


canvas.width = dimension.width;
canvas.height = dimension.height;

let objectDrawer = [];

// Map components
// Background
let background = new Background(context, objectDrawer, dimension, border);
// Platform
let platform = new Platform(context, objectDrawer, dimension, border, 500, 600, 2.3);
let platform1 = new Platform(context, objectDrawer, dimension, border, 300, 200, 2);
let platform2 = new Platform(context, objectDrawer, dimension, border, 100, -200, 3.4);
let platform3 = new Platform(context, objectDrawer, dimension, border, 2200, 600, 2.3);
let platform4 = new Platform(context, objectDrawer, dimension, border, 1800, 200, 2);
let platform5 = new Platform(context, objectDrawer, dimension, border, 1700, -250, 2.3);



let player = new Player(context, objectDrawer, dimension, border, mouseState, keyMap, dimension.width/2);
let boss = new Boss(player, theme, context, objectDrawer, dimension, border, border.width/2, (2*dimension.height-border.height)/2);
player.setBoss(boss);

let cameraBox = new CameraBox(context, objectDrawer, dimension, border, player);

function animate() {
    context.save();
    context.translate(0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();

    for(let i=0; i<objectDrawer.length; i++) {
        objectDrawer[i].mainLoop();
    }
    context.stroke();
    DeltaTime.updateDelta();

    requestAnimationFrame(animate)
}

animate()

window.addEventListener("keydown", (e) => {
    e = e.key.toLowerCase();
    keyMap[e] = true;
    if(e == "a") {
        keyMap["d"] = false;
        return;
    }
    if(e == "d") {
        keyMap["a"] = false;
        return;
    }
    // if(e == "w") {
    //     player.moveUp();
    // }
})

window.addEventListener("keyup", (e) => {
    e = e.key.toLowerCase();
    keyMap[e] = false;
    if(!keyMap["a"] && !keyMap["d"]) player.moveStop();
})

window.addEventListener("mousedown", () => {
    if(!themePlayed) {
        theme.play()
        themePlayed = true;
        boss.start();
    }
    mouseState.isDown = true;
})

window.addEventListener("mouseup", () => {
    mouseState.isDown = false;
})

window.addEventListener("mousemove", (e) => {
    mouseState.x = e.clientX;
    mouseState.y = e.clientY;
})

// window.addEventListener("focus", () => {
//     if(!themePlayed) {
//         themePlayed = true;
//         theme.play();
//     }
// })