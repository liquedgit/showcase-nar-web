import Circle from "../../utils/objects/shape/Circle.js";
import {loadImage} from "../../utils/image_handler.js"

const IMAGE_PATH = "../../../../Assets/Sprite/MainCharacter/attack_particles/att_particle.png"

class PlayerBullet extends Circle {
    static playerBulletCounter = 0;

    constructor(boss, context, objectDrawer, dimension, border, x, y, targetX, targetY) {
        super(context, objectDrawer, dimension, border, x, y, 0);

        this.boss = boss;

        this.objectDrawer = objectDrawer;
        this.drawerID = "b" + ++PlayerBullet.playerBulletCounter;

        this.angle = Math.atan2(targetY - this.y, targetX - this.x);

        this.scale = 0.05;
        this.speed = 30;

        this.image = loadImage(IMAGE_PATH)
        this.radius = this.image.width/2 * this.scale; 

        this.context = context;
        this.hasGravity = false;
        this.canLeaveBorder = true;
        this.tag = "PlayerBullet";
    }

    draw() {
        this.context.save();
        this.context.scale(this.scale, this.scale);
        this.context.drawImage(this.image, this.x/this.scale-this.radius, this.y/this.scale-this.radius);
        this.context.restore();
        // this.context.beginPath();
        // this.context.arc(this.x+this.radius-2, this.y+this.radius, this.radius, 0, 2*Math.PI);
        // this.context.stroke();
    }

    destroy() {
        this._destroy();
    }

    
    handleCollision() {
        if(this._GetCollidingObject(this.boss)) {
            this.boss.takeDamage();
            this.destroy();
        }
    }

    mainLoop() {
        super.mainLoop();

        this.velocity.x = Math.cos(this.angle) * this.speed;
        this.velocity.y = Math.sin(this.angle) * this.speed;
        this.draw();
    }

}

export default PlayerBullet;