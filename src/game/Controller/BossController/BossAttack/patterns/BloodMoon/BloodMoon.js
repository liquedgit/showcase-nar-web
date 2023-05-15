import DeltaTime from "../../../../../DeltaTime.js";
import BloodMoonCircle from "./BloodMoonCircle.js";

class BloodMoon{
    static construct(boss) {
        return new BloodMoon(boss)
    }
    constructor(boss) {
        this.boss = boss;
        let border = boss.border;
        this.targetRadius = border.width/5*3;
        this.rateOfChange = this.targetRadius*2;
        this.circle = new BloodMoonCircle(boss);

        this.isDone = false;
    }

    mainLoop() {
        if(this.isDone) return;
        this.draw();
        this.circle.radius += this.rateOfChange * DeltaTime.getDelta();

        if(this.circle.radius >= this.targetRadius) {
            this.circle._destroy();
            this.isDone = true;
        }
    }

    stop() {
        if(this.isDone) return;
        this.circle._destroy();
    }

    draw() {
        this.circle.context.save()
        this.circle.context.beginPath();
        this.circle.context.arc(this.circle.x, this.circle.y, this.circle.radius, 0, 2 * Math.PI, false);
        this.circle.context.fillStyle = 'rgba(255, 0, 0, 0.5)';
        this.circle.context.fill();
        this.circle.context.restore();
    }
}

export default BloodMoon;