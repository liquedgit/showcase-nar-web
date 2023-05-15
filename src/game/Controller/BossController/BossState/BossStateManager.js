import BossIdleState from "./BossIdleState.js";

class BossStateManager {
    constructor(boss) {
        this.boss = boss;
        this.currentState = new BossIdleState(this);
    }

    switchState(newState) {
        if(
            this.currentState.priorityLevel >= newState.priorityLevel && 
            this.currentState.isActive && 
            !(this.currentState.canOverlap && this.currentState.id == newState.id)
        ) return;
        if(!newState.preEnterCheck(this)) return;

        this.currentState.exitState(this);
        this.currentState = newState;
        this.currentState.enterState(this);
    }

    update() {
        this.currentState.updateState(this);
    }
}

export default BossStateManager;