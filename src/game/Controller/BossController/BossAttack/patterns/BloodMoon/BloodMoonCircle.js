import Circle from "../../../../../utils/objects/shape/Circle.js";

class BloodMoonCircle extends Circle {
    static bloodMoonCounter = 0;
    constructor(boss) {
        super(
            boss.context, boss.objectDrawer, boss.dimension, boss.border, boss.border.width/2, 
            (2*boss.dimension.height-boss.border.height)/2, 0, true
        )
        
        this.boss = boss;
        this.drawerID = "bloodmoon" + BloodMoonCircle.bloodMoonCounter++;

        this.canLeaveBorder = true;
        this.dontDestroyOnBorderLeave = true;
        this.hadDamaged = false;
    }

    handleCollision() {
        if(this.hadDamaged) return;
        if(this._GetCollidingObject(this.boss.player)) {
            if(this.boss.player.takeDamage()) {
                this.hadDamaged = true;
            }
        }
    }
}

export default BloodMoonCircle;