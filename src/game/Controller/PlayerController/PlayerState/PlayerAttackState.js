import PlayerBullet from "../../Projectiles/PlayerBullet.js";
import PlayerBaseState from "./PlayerBaseState.js";
import PlayerIdleState from "./PlayerIdleState.js";

class PlayerAttackState extends PlayerBaseState {
    constructor(stateManager) {
        super(4, 4, stateManager, stateManager.player.attackSprites);
        this.animationPlayedOnce = true;
        
        this.IntervalBetweenFrames = 50;
    }

    enterState(stateManager) {
        super.enterState(stateManager);

        let player = stateManager.player
        player.attackSound.pause();
        player.attackSound.currentTime = 0;
        player.attackSound.play();

        let playerX = player.x;

        let targetX = player.mouseState.x + player.dimension.extraX;
        let targetY = player.mouseState.y + player.dimension.extraY;

        if(targetX < playerX) player.direction = -1;
        else player.direction = 1;



        new PlayerBullet(
            player.boss, player.context, player.objectDrawer,
            player.dimension, player.border,
            player.x, player.y,
            targetX, targetY
        )
        //TODO: Spawn bullet
    }

    updateState(stateManager) {
        super.updateState(stateManager)
        if(this.animationPlayed) {
            this.exitState(stateManager);
            stateManager.switchState(new PlayerIdleState(stateManager));
        }
    }

}
export default PlayerAttackState;