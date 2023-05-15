import DestinedDeathCircle from "./DestinedDeathCircle.js";

class DestinedDeath {
    static construct(boss) {
        return new DestinedDeath(boss)
    }
    constructor(boss) {
        this.boss = boss;
        let border = boss.border;
        this.targetRadius = border.width/3*2;
        this.rateOfChange = this.targetRadius/30;
        this.circle = new DestinedDeathCircle(boss);

        this.isDone = false;
    }

    mainLoop() {
        if(this.isDone) return;
        this.draw();

        if(this.circle.radius >= this.targetRadius) return;
        this.circle.radius += this.rateOfChange;
    }
    draw() {
        this.circle.context.save()
        this.circle.context.beginPath();
        this.circle.context.arc(this.circle.x, this.circle.y, this.circle.radius, 0, 2 * Math.PI, false);
        this.circle.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.circle.context.fill();
        this.circle.context.restore();
    }
}

export default DestinedDeath;