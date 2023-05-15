import Shape from './Shape.js'
import Rectangle from './Rectangle.js';

class Circle extends Shape {
    /*
    Center: Coordinate
    Radius: integer 
    */
    constructor(context ,objectDrawer, dimension, border, centerX, centerY, radius, canCollide=true) {
        super(context, objectDrawer, dimension, border, centerX, centerY, canCollide);
        this.radius = radius;
    }
    
    _CheckCollision(object) {
        if(object instanceof Rectangle) {
            return this._Circle2RectangleCollision(object);
        } else if(object instanceof Circle) {
            return this._Circle2CircleCollision(object);
        }
    }

    _Circle2CircleCollision(circle) {
        return (
            Math.pow(this.x - circle.x, 2) + Math.pow(this.y - circle.y, 2)
            <= Math.pow(this.radius + circle.radius, 2)
        )
    }

    _Circle2RectangleCollision(rect) {
        let distX = Math.abs(this.x - rect.x-rect.width/2);
        let distY = Math.abs(this.y - rect.y-rect.height/2);
    
        if (distX > (rect.width/2 + this.radius)) return false;
        if (distY > (rect.height/2 + this.radius)) return false;
    
        if (distX <= (rect.width/2)) return true;
        if (distY <= (rect.height/2)) return true;
    
        let dx = distX-rect.width/2;
        let dy = distY-rect.height/2;
        return (dx*dx+dy*dy <= (this.radius*this.radius));
    }

    IsGrounded() {
        return (
            this.y += this.radius >= this.border.height
        )
    }

    _borderCheck() {
        if(this.x - this.radius <= 0) {
            this.x += this.radius;
        }
        if(this.x + this.radius >= this.border.width) {
            this.x = this.border.width - this.radius;
        }
        if(this.y - this.radius <= this.yTopLimit) {
            this.y = this.yTopLimit + this.radius;
        }
        if(this.y + this.radius >= this.dimension.height) {
            this.y = this.dimension.height - this.radius;
        }
    }

    IsOutsideBorder() {
        return (
            this.x + this.radius < 0 || this.x - this.radius > this.border.width 
            || this.y + this.radius < this.yTopLimit || this.y - this.radius > this.border.height
        )
    }
}

export default Circle;