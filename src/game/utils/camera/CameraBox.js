import Rectangle from "../objects/shape/Rectangle.js";

class CameraBox extends Rectangle {
    constructor(context, objectDrawer, dimension, border, player) {
        super(context, objectDrawer, dimension, border, player.x-dimension.width/2, player.y-dimension.height/2, dimension.width, dimension.height, false);
        this.player = player;

        this.leftMost = this.x;
        this.rightMost = this.dimension.width;
        this.top = 0;
        this.bottom = this.dimension.height;
    }

    checkRightBorder() {
        let rightSide = this.x + this.width;

        if(rightSide >= this.rightMost && rightSide < this.border.width) {
            let move = this.player.velocity.x;
            if(this.rightMost + move > this.border.width) {
                move = this.border.width - this.rightMost;
            }

            this.context.translate(-move, 0)
            this.rightMost += move;
            this.leftMost += move;
            this.dimension.extraX += move;
            return;
        }
    }

    checkLeftBorder() {
        let leftSide = this.x;
        if(leftSide <= this.leftMost && leftSide > 0) {
            let move = this.player.velocity.x;
            if(this.leftMost + move < 0) {
                move = this.leftMost;
            }

            this.context.translate(-move, 0)
            this.rightMost += move;
            this.leftMost += move;
            this.dimension.extraX += move;
            return;
        }
    }

    checkTopBorder() {
        let topSide = this.y;
        if(topSide <= this.top && topSide > this.yTopLimit) {
            let move = this.player.velocity.y;
            if(this.top + move < this.yTopLimit) {
                move = this.yTopLimit - this.top;
            }

            this.context.translate(0, -move)
            this.top += move;
            this.bottom += move;
            this.dimension.extraY += move;
            return;
        }
    }

    checkBottomBorder() {
        let bottomSide = this.y + this.height;

        if(bottomSide >= this.bottom && bottomSide < this.dimension.height) {
            let move = this.player.velocity.y;
            if(this.bottom + move > this.dimension.height) {
                move = this.dimension.height - this.bottom;
            }

            this.context.translate(0, -move)
            this.top += move;
            this.bottom += move;
            this.dimension.extraY += move;
            return;
        }
    }

    mainLoop() {
        this.x = this.player.x - this.dimension.width/2;
        this.y = this.player.y - this.dimension.height/2;


        if(this.player.velocity.x > 0) {
            this.checkRightBorder()
        } else if(this.player.velocity.x < 0) {
            this.checkLeftBorder()
        }
        if(this.player.velocity.y < 0) {
            this.checkTopBorder()
        } else if(this.player.velocity.y > 0) {
            this.checkBottomBorder()
        }
        this.context.save();
    }
    
    draw() {
        // this.context.fillStyle = 'rgba(0, 0, 255, 0.2)';
        // this.context.fillRect(
        //     this.x,
        //     this.y,
        //     this.width,
        //     this.height
        // )
    }
}

export default CameraBox;