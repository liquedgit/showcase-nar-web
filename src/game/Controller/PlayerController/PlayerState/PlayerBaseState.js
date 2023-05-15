// Abstract
class PlayerBaseState {
    static LastAnimationPlayed = 0;

    animationPlayedOnce = false;
    animationPlayed = false;

    constructor(id, priorityLevel, stateManager, images) {
        this.id = id;
        this.priorityLevel = priorityLevel;

        this.images = images;
        this.maxImages = images.length;
        this.imageCounter = 0;
        this.IntervalBetweenFrames = 100;

        this.canOverlap = false;
    }

    preEnterCheck(stateManager) {
        return true;
    }

    enterState(stateManager) {
        // override this function in every state, then call parent function
        this.isActive = true;
    }

    updateState(stateManager) {
        // override this function in every state, then call parent function
        if(this.animationPlayedOnce && this.animationPlayed) return

        let date = new Date();
        let currentTime = date.getTime();

        if(currentTime - PlayerBaseState.LastAnimationPlayed >= this.IntervalBetweenFrames) {
            this.imageCounter = (this.imageCounter + 1) % this.maxImages;
            stateManager.player.currentImage = this.images[this.imageCounter];
            
            PlayerBaseState.LastAnimationPlayed = currentTime;
        }

        if(this.imageCounter == this.maxImages-1) this.animationPlayed = true;
    }

    exitState(stateManager) {
        // override this function in every state, then call parent function
        this.isActive = false;
    }
}

export default PlayerBaseState;