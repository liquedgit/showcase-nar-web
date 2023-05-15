import Circle from "../../../../../utils/objects/shape/Circle.js";
import FestivalOfBlood from "./FestivalOfBlood.js";

class FOBProjectile extends Circle {
    static FOBCounter = 0;

    constructor(particles, boss, x, y, speed=4, spawnMultiplier=1) {
        super(boss.context, boss.objectDrawer, boss.dimension, boss.border, x, y, 0, true);

        this.boss = boss;
        this.particles = particles;

        this.image = FestivalOfBlood.image;
        this.radius = this.image.width/2+3;

        this.speed = speed;
        this.spawnMultiplier = spawnMultiplier;

        this.drawerID = "fob" + FOBProjectile.FOBCounter;
        this.particleID = FOBProjectile.FOBCounter++;

        this.canDamage = false;
        this.canCollide = true;
        this.canLeaveBorder = true;

        this.opacity = 0;
        this.particles.push(this)
    }

    mainLoop() {
        super.mainLoop();

        this.manager();
        this.draw();
    }

    draw() {
        this.context.save();
        this.context.globalAlpha = this.opacity;
        this.context.drawImage(this.image, this.x, this.y);
        this.context.restore();
    }

    handleCollision() {
        if(
            this._CheckCollision(this.boss.player) &&
            this.canDamage
        ) {
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
    manager() {
        if(this.canDamage) return;

        this.opacity = Math.min(1, this.opacity + 0.002 * this.spawnMultiplier);
        if(this.opacity < 1) return;

        this.canDamage = true;
        
        let targetX = this.boss.player.x;
        let targetY = this.boss.player.y;

        let angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.velocity.x = Math.cos(angle) * this.speed;
        this.velocity.y = Math.sin(angle) * this.speed;
    }
}

export default FOBProjectile;