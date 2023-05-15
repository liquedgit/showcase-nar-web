import PlayerBaseState from "./PlayerBaseState.js";
import PlayerIdleState from "./PlayerIdleState.js";

class PlayerRunState extends PlayerBaseState {
    constructor(stateManager) {
        super(2, 2, stateManager, stateManager.player.runSprites);
    }

    preEnterCheck(stateManager) {
        return stateManager.player.IsGrounded() || stateManager.player.IsOnPlatform();
    }

    updateState(stateManager) {
        super.updateState(stateManager);

        if(stateManager.player.velocity.x == 0) {
            this.exitState(stateManager);
            stateManager.switchState(new PlayerIdleState(stateManager));
        }
    }
}

export default PlayerRunState;