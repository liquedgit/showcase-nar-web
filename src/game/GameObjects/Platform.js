import { loadImage } from "../utils/image_handler.js";
import Rectangle from "../utils/objects/shape/Rectangle.js";

class Platform extends Rectangle {
    constructor(context, objectDrawer, dimension, border, x, y, xScale) {
        super(context, objectDrawer, dimension, border, x, y, 0, 0, true);

        this.image = loadImage("../../../Assets/Arena/platform.png");
        this.xScale = xScale;

        this.height = this.image.height;
        this.width = this.image.width * this.xScale;
        
        this.tag = "platform";
    }

    mainLoop() {
        this.draw();
    }

    draw() {
        this.context.save();
        this.context.scale(this.xScale, 1);
        this.context.drawImage(this.image, this.x/this.xScale, this.y);
        this.context.restore();
    }
 }

export default Platform;