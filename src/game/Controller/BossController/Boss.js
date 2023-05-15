import Rectangle from "../../utils/objects/shape/Rectangle.js";
import { loadImage, getImagePath, } from "../../utils/image_handler.js";
import BossStateManager from "./BossState/BossStateManager.js";
import BossAttackManager from "./BossAttack/BossAttackManager.js";

class Boss extends Rectangle {
    currentImage = null;

    constructor(player, theme, context, objectDrawer, dimension, border, x, y) {
        super(context, objectDrawer, dimension, border, x, y, 0, 0, true);
        
        this.maxHealth = 50000;
        this.health = this.maxHealth;

        this.damagedSound = new Audio("../../../../Assets/Sound/bossDamaged.mp3");
        this.player = player;
        this.theme = theme;
        this.tag = "boss";
        this.hitable = true;
        this.hasGravity = false;
        this.started = false;

        this.scale = 1;
        this.direction = 1;

        this.idleSprites = []
        for(let i=0; i<5; i++) {
            let url = getImagePath("../../../../Assets/Sprite/Boss", "idle", i);
            this.idleSprites.push(
                loadImage(url)
            );
        }

        this.width = (this.idleSprites[0].width - 80) * this.scale;
        this.height = (this.idleSprites[0].height - 50) * this.scale;

        this.stateManager = new BossStateManager(this);
        this.attackManager = new BossAttackManager(this);
    }

    mainLoop() {
        super.mainLoop();

        if(this.x < this.player.x) {
            this.direction = 1;
        } else {
            this.direction = -1;
        }

        this.stateManager.update();

        if(this.started) {
            this.attackManager.update();
        }

        this.draw();
    }

    draw() {
        if(this.currentImage === null) return;

        let x = this.x;
        if(this.direction == -1) {
            x = -this.x - this.width;
        }

        this.context.save();
        this.context.scale(this.direction * this.scale, this.scale);
        this.context.drawImage(this.currentImage, x/this.scale-40, this.y/this.scale-50);
        this.context.restore();

        let healthBarWidth = this.dimension.width/2;
        let healthBarHeight = 20;
        let healthBarY = this.dimension.height + this.dimension.extraY - 50;
        let healthBarX = (this.dimension.width/2) - healthBarWidth/2 + this.dimension.extraX;

        // Name text
        this.context.save();
        this.context.fillStyle = "rgb(255, 255, 255)";
        this.context.font = "20px Arial";
        this.context.fillText("PB, Advent of Disaster", healthBarX, healthBarY-20);
        this.context.restore();
        // health bar border
        this.context.save();
        this.context.beginPath();
        this.context.rect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
        this.context.restore();

        //health bar fill
        this.context.save();
        this.context.fillStyle = "rgba(255, 0, 0, 0.6)"
        this.context.fillRect(healthBarX, healthBarY, healthBarWidth * this.health/this.maxHealth, healthBarHeight);
        this.context.restore();
    }

    takeDamage() {
        this.damagedSound.pause();
        this.damagedSound.currentTime = 0;
        this.damagedSound.play();

        if(this.health - 100 <= 0) {
            this.health += 5000;
        }
        this.health -= 100;
    }

    start() {
        this.started = true;
    }
}

export default Boss;