import { loadImage } from "./utils/image_handler.js";

class GameController {
    static gameEnded = false;
    static deadImage = loadImage("../../Assets/dead.png")

    static stop() {
        GameController.gameEnded = true;
    }
}

export default GameController;