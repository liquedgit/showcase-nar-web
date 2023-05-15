import Rectangle from "../../../../../utils/objects/shape/Rectangle.js";
import CrimsonRain from "./CrimsonRain.js";

class CRParticle extends Rectangle {
    static CRCounter = 0
    constructor(particles, boss, velocity) {
        super(boss.context, boss.objectDrawer, boss.dimension, boss.border, 0, 0, 0, 0, true);
        
        this.particles = particles;
        this.boss = boss;
        
        this.x = boss.player.x;
        this.y = boss.dimension.height - boss.border.height;

        this.particleID = CRParticle.CRCounter;
        this.drawerID = "cr" + CRParticle.CRCounter++;

        this.image = CrimsonRain.image;
        this.width = this.image.width;
        this.height = this.image.height;

        this.hasGravity = false;
        this.canLeaveBorder = true;
        this.velocity.y = velocity;
    }

    mainLoop() {
        super.mainLoop();
        this.draw();
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y);
    }

    handleCollision() {
        if(this._GetCollidingObject(this.boss.player)) {
            this.boss.player.takeDamage();
        }
    }

    _destroy() {
        super._destroy();
        for(let i=0; i<this.particles.length; i++) {
            if(this.particles[i].particleID == this.particleID) {
                this.particles.splice(i, 1);
            }
        }
    }

    clear() {
        super._destroy();
    }
}

export default CRParticle;