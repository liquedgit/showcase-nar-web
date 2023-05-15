const GRAVITY_VALUE = 0.5;
// Abstract
class Shape {
    static objects = []
    static idCounter = 0;

    velocity = {
        x: 0,
        y: 0
    }

    constructor(context, objectDrawer, dimension, border, x, y, canCollide = true) {
        this.context = context;
        this.dimension = dimension;
        this.border = border;
        this.objectDrawer = objectDrawer;

        this.canCollide = canCollide;

        this.yTopLimit = -(this.border.height - this.dimension.height);

        this.objectDrawer.push(this);

        this.x = x;
        this.y = y;

        this.shapeID = Shape.idCounter++;
        this.tag = "default";

        this.hasGravity = false;
        this.canLeaveBorder = false;
        this.dontDestroyOnBorderLeave = false;
        
        if(canCollide) {
            Shape.objects.push(this);
        }
    }

    _GetCollidingObjects() {
        let shapeList = Shape.objects;
        let collidingObjects = []

        for(let i=0; i<shapeList.length; i++) {
            if(this.shapeID == shapeList[i].shapeID) continue;
            let object = shapeList[i]
            if(this._CheckCollision(object)) collidingObjects.push(object)
        }

        return collidingObjects;
    }

    _GetCollidingObject(object) {
        return this._CheckCollision(object);
    }

    _CheckCollision() {
        // abstract function, override in basic shapes
        throw new Error("Abstract function must be override in child class");
    }

    IsGrounded() {
        // abstract function, override in basic shapes
        throw new Error("Abstract function must be override in child class");
    }

    IsOutsideBorder() {
        // abstract function, override in basic shapes
        throw new Error("Abstract function must be override in child class");
    }

    _setToGround() {
        // abstract function, override in basic shapes
        throw new Error("Abstract function must be override in child class");
    }

    _borderCheck() {
        // abstract function, override in basic shapes
        throw new Error("Abstract function must be override in child class");
    }

    _onBorderLeave() {
        this._destroy();
    }

    _destroy() {
        for(let i=0; i<this.objectDrawer.length; i++) {
            if(this.objectDrawer[i].drawerID == this.drawerID) {
                this.objectDrawer.splice(i, 1);
            }
        }

        if(!this.canCollide) return;
        for(let i=0; i<Shape.objects.length; i++) {
            if(Shape.objects[i].shapeID == this.shapeID) {
                Shape.objects.splice(i, 1);
            }
        }
    }

    setGravity(option) {
        this.hasGravity = option;
    }

    setLeaveBorder(option) {
        this.canLeaveBorder = option;
    }

    _callGravity() {
        if(this.IsGrounded()) {
            this.velocity.y = 0;
            return;
        }
        if(this.y == 0) {
            this.velocity.y = 1;
            return;
        }
        this.velocity.y = Math.min(this.velocity.y + GRAVITY_VALUE, 20);
    }

    handleCollision() {
        // abstract function, override in controller
        return;
    }

    mainLoop() {
        // override in controller, then call parent method
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if(!this.canLeaveBorder) {
            this._borderCheck();
        } else {
            if(this.IsOutsideBorder() && !this.dontDestroyOnBorderLeave) {
                this._onBorderLeave();
            }
        }
        if(this.hasGravity) {
            this._callGravity()
        }

        this.handleCollision();
    }

}

export default Shape;