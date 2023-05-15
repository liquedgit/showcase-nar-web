import BossBaseState from "./BossBaseState.js";

class BossIdleState extends BossBaseState {
    constructor(stateManager) {
        super(1, 1, stateManager, stateManager.boss.idleSprites);
    }
}

export default BossIdleState;