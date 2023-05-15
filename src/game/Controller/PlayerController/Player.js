import Rectangle from "../../utils/objects/shape/Rectangle.js";
import {loadImage, getImagePath} from "../../utils/image_handler.js";
import PlayerStateManager from "./PlayerState/PlayerStateManager.js";
import GameController from "../../GameController.js";
import PlayerDeadState from "./PlayerState/PlayerDeadState.js";

const IMAGE_DIRECTORY_PATH = "../../../../Assets/Sprite/MainCharacter"

class Player extends Rectangle {
    currentImage = null;

    speed = 8;
    jumpSpeed = 10;
    dashSpeedMultiplier = 2.5;

    hadDoubleJumped = false;
    isDashing = false;
    canDash = true;
    
    constructor(context, objectDrawer, dimension, border, mouseState, keyMap, x=100, y=0, width=100, height=100) {
        super(context, objectDrawer, dimension, border, x, y, width, height);
        
        this.scale = 0.7;
        this.mouseState = mouseState;
        this.keyMap = keyMap;

        this.health = 5;

        this.attackSound = new Audio("../../../../Assets/Sound/PlayerAttack.mp3");
        this.attackSound.playbackRate = 10;
        this.attackSound.volume = 0.4;

        this.dashSound = new Audio("../../../../Assets/Sound/dash.mp3");
        this.dashSound.playbackRate = 5;

        this.validDash = false;

        this.setGravity(true);
        this.setLeaveBorder(false);

        this.direction = 1 // left = -1, right = 1

        this.runSprites = []
        for(let i=0; i<8; i++) {
            this.runSprites.push(
                loadImage(getImagePath(IMAGE_DIRECTORY_PATH, "walk", i))
            );
        }

        this.width = (this.runSprites[0].width - 100) * this.scale;
        this.height = (this.runSprites[0].height - 50) * this.scale;

        this.idleSprites = [];
        for(let i=0; i<5; i++) {
            this.idleSprites.push(
                loadImage(getImagePath(IMAGE_DIRECTORY_PATH, "idle", i))
            );
        }

        this.jumpSprites = [];
        for(let i=0; i<7; i++) {
            this.jumpSprites.push(
                loadImage(getImagePath(IMAGE_DIRECTORY_PATH, "jump", i))
            );
        }

        this.attackSprites = []
        for(let i=0; i<5; i++) {
            this.attackSprites.push(
                loadImage(getImagePath(IMAGE_DIRECTORY_PATH, "attack", i))
            )
        }

        this.deadSprites = []
        for(let i=0; i<8; i++) {
            this.deadSprites.push(
                loadImage(getImagePath(IMAGE_DIRECTORY_PATH, "dead", i))
            )
        }
        

        this.stateManager = new PlayerStateManager(this);
        this.tag = "Player";
        this.hitable = true;
        this.dashIframe = false;
    }

    mainLoop() {
        if(this.health <= 0) {
            this.stateManager.switchState(new PlayerDeadState(this.stateManager));
        }

        super.mainLoop();
        this.stateManager.update();
        this.draw();

        if(GameController.gameEnded) return;

        if(this.keyMap["a"]) {
            this.moveLeft();
        } else if(this.keyMap["d"]) {
            this.moveRight();
        }
        
        if(this.keyMap["w"]) {
            this.velocity.y = Math.max(this.velocity.y - 1, -12);
        }
        
        if(this.keyMap[" "]) {
            if(!this.validDash) {
                this.dash();
            }
            this.validDash = true;
        } else if(!this.keyMap["space"]) {
            this.validDash = false;
        }

        if(this.keyMap["s"]) {
            this.moveDown();
        }
    }

    moveLeft() {
        this.direction = -1;
        if(this.isDashing) return;
        this.velocity.x = -this.speed;
    }
    moveRight() {
        this.direction = 1;
        if(this.isDashing) return;
        this.velocity.x = this.speed;
    }

    moveStop() {
        if(this.isDashing) return;
        this.velocity.x = 0;
    }

    moveDown() {
        if(this.IsOnPlatform()) {
            this.y += 20;
        }
    }

    async dash() {
        if(!this.canDash) return;

        this.dashSound.pause();
        this.dashSound.currentTime = 0;
        this.dashSound.play();

        this.dashIframe = true;
        this.isDashing = true;
        this.canDash = false;
        if(this.velocity.x != 0) {
            this.velocity.x *= this.dashSpeedMultiplier;
        } else {
            this.velocity.x = this.direction * this.speed * this.dashSpeedMultiplier;
        }

        setTimeout(() => {
            this.isDashing = false;
            this.velocity.x = 0;
        }, 200);

        setTimeout(() => {
            this.dashIframe = false;
        }, 500)

        setTimeout(() => {
            this.canDash = true;
        }, 700);
    }

    draw() {
        if(this.currentImage === null) return;

        let x = this.x;
        if(this.direction == -1) {
            x = -this.x - this.width
        }

        this.context.save();
        this.context.scale(this.direction * this.scale, this.scale);
        this.context.drawImage(this.currentImage, x/this.scale-50, this.y/this.scale-50);
        this.context.restore();
        
        let healthBarX = 10 + this.dimension.extraX;
        let healthBarY = 70 + this.dimension.extraY;
        // Draw health
        this.context.save();
        this.context.fillStyle = "rgb(255, 255, 255)";
        this.context.font = "70px Arial";
        this.context.fillText(this.health, healthBarX, healthBarY);
        this.context.restore();
    }

    setCameraBox(cameraBox) {
        this.cameraBox = cameraBox; 
    }

    handleCollision() {
        let objects = this._GetCollidingObjects();

        for(let i=0; i<objects.length; i++) {
            if(objects[i].tag == "platform") {
                let minY = this.y + this.height/3 * 2
                if(this.velocity.y > 0 && minY < objects[i].y) {
                    this.velocity.y = 0

                    this.y = objects[i].y - 0.01 - this.height;
                    break;
                }
            }
        }
    }

    setBoss(boss) {
        this.boss = boss;
    }

    IsOnPlatform() {
        return this.velocity.y == 0 && this.y < this.dimension.height;
    }

    takeDamage() {
        let canBeHit = false;
        if(this.hitable && !this.dashIframe) {
            this.health = Math.max(0, this.health -1);
            this.hitable = false;
            canBeHit = true;

            setTimeout(() => {
                this.hitable = true
            }, 1000);
        }
        return canBeHit;
    }
}

export default Player;