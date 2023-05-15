import { loadImage } from "../utils/image_handler.js";
import Rectangle from "../utils/objects/shape/Rectangle.js";

class Background extends Rectangle {
    constructor(context, objectDrawer, dimension, border) {
        super(context, objectDrawer, dimension, border, 0, 0, 0, 0, false);

        this.context = context;
        objectDrawer.push(this);

        this.image = loadImage("../../../Assets/Arena/background.jpg");
        this.width = this.image.width;
        this.height = this.image.height;

        this.scale = 0.7;
        this.border.width = this.width*this.scale;
        this.border.height = this.height*this.scale;
    }

    draw() {
        this.context.save();
        this.context.scale(this.scale, this.scale);
        this.context.translate(0, -this.height + this.dimension.height/this.scale);
        this.context.drawImage(this.image, 0, 0);
        this.context.restore();
    }

    mainLoop() {
        super.mainLoop();
        this.draw();
    }
}

export default Background;