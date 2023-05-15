import Circle from "../../../../../utils/objects/shape/Circle.js";

class DestinedDeathCircle extends Circle {
    static destinedDeathCounter = 0;
    constructor(boss) {
        super(
            boss.context, boss.objectDrawer, boss.dimension, boss.border, boss.border.width/2, 
            (2*boss.dimension.height-boss.border.height)/2, 0, true
        )
        
        this.boss = boss;
        this.drawerID = "destinedDeath" + DestinedDeathCircle.destinedDeathCounter++;

        this.canLeaveBorder = true;
        this.dontDestroyOnBorderLeave = true;
    }

    handleCollision() {
        if(this.hadDamaged) return;
        if(this._GetCollidingObject(this.boss.player)) {
            this.boss.player.takeDamage()
        }
    }
}

export default DestinedDeathCircle;