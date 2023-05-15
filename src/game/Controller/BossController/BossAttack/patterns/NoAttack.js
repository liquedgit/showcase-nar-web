class NoAttack {
    static construct(boss) {
        return new NoAttack(boss);
    }
    static constructWithTimeout(timeout) {
        function inner(boss) {
            return new NoAttack(boss, timeout)
        }
        return inner;
    }
    constructor(boss, timeout=0) {
        this.isDone = false;

        if(timeout > 0) {
            setTimeout(() => {
                this.isDone = true
            }, timeout)
        }

    }

    stop() {
        return;
    }
    mainLoop() {

    }
}
export default NoAttack;