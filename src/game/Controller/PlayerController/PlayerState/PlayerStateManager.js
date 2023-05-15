import PlayerAttackState from "./PlayerAttackState.js";
import PlayerIdleState from "./PlayerIdleState.js";
import PlayerRunState from "./PlayerRunState.js";

class PlayerStateManager {
    constructor(player) {
        this.window = window;

        this.player = player;
        this.currentState = new PlayerIdleState(this);
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
        if(this.player.velocity.x != 0) {
            this.switchState(new PlayerRunState(this));
        }
        if(this.player.mouseState.isDown) {
            this.switchState(new PlayerAttackState(this));
        }
        this.currentState.updateState(this);
    }
}

export default PlayerStateManager;