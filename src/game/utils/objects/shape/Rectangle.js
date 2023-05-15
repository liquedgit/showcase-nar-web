import Shape from "./Shape.js"
import Circle from "./Circle.js"

class Rectangle extends Shape {
    /*
    startX: int
    startY: int
    Start: top/rightmost
    width: int
    height: int
    Rectangle will be drawn starting from top/rightmost to bottom/leftmost
    */
    constructor(context, objectDrawer, dimension, border, startX, startY, width, height, canCollide=true) {
        super(context, objectDrawer, dimension, border, startX, startY, canCollide);
        this.width = width;
        this.height = height;
    }

    _CheckCollision(object) {
        if(object instanceof Rectangle) {
            return this._Rectangle2RectangleCollision(object);
        } else if(object instanceof Circle) {
            return this._Rectangle2CircleCollision(object);
        }
    }

    _Rectangle2CircleCollision(circle) {
        let distX = Math.abs(circle.x - this.x - this.width/2);
        let distY = Math.abs(circle.y - this.y - this.height/2);
    
        if (distX > (this.width/2 + circle.radius)) return false;
        if (distY > (this.height/2 + circle.radius)) return false;
    
        if (distX <= (this.width/2)) return true;
        if (distY <= (this.height/2)) return true;
    
        let dx = distX - this.w/2;
        let dy = distY - this.h/2;
        return (dx*dx+dy*dy <= (circle.radius*circle.radius));
    }   

    _Rectangle2RectangleCollision(rect) {
        return (
            this.x + this.width >= rect.x &&
            this.x <= rect.x + rect.width &&
            this.y + this.height >= rect.y &&
            this.y <= rect.y + rect.height
        )
    }

    IsGrounded() {
        return (
            this.y + this.height >= this.dimension.height
        )
    }

    _borderCheck() {
        if(this.x <= 0) {
            this.x = 0;
        }
        if(this.x + this.width >= this.border.width) {
            this.x = this.border.width - this.width
        }
        if(this.y < this.yTopLimit) {
            this.velocity.y = 0;
            this.y = this.yTopLimit;
        }
        if(this.y + this.height >= this.dimension.height) {
            this.y = this.dimension.height - this.height;
        }
    }

    IsOutsideBorder() {
        return (
            this.x < 0 || this.x > this.border.width 
            || this.y < this.yTopLimit || this.y > this.border.height
        )
    }
}

export default Rectangle;