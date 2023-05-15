import GameController from "../../../GameController.js";
import PlayerBaseState from "./PlayerBaseState.js";

class PlayerDeadState extends PlayerBaseState {
    constructor(stateManager) {
        super(5, 5, stateManager, stateManager.player.deadSprites);
        this.animationPlayedOnce = true;
        this.IntervalBetweenFrames = 300;
        GameController.stop();
    }

    updateState(stateManager) {
        super.updateState(stateManager);
        if(this.animationPlayed) {
            GameController.stop();
            let player = stateManager.player;
            player.context.drawImage(
                GameController.deadImage,
                player.dimension.width/2 - GameController.deadImage.width/2 + player.dimension.extraX,
                (player.dimension.height - player.dimension.extraY)/2 - GameController.deadImage.height/2  + player.dimension.extraY  
            )

            setTimeout(() => {
                window.location.href = "./showcase.html"
            }, 5000)
        }
    }

    exitState(stateManager) {
        GameController.stop();
    }
}

export default PlayerDeadState;