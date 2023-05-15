import PlayerBaseState from "./PlayerBaseState.js";

class PlayerIdleState extends PlayerBaseState {
    constructor(stateManager) {
        super(1, 1, stateManager, stateManager.player.idleSprites);
    }
}

export default PlayerIdleState;