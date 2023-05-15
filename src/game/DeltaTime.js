class DeltaTime {
    static lastCalledTime;
    static delta;
    static updateDelta() {
        if(!DeltaTime.lastCalledTime) {
            DeltaTime.lastCalledTime = Date.now();
            return;
            }
            DeltaTime.delta = (Date.now() - DeltaTime.lastCalledTime)/1000;
            DeltaTime.lastCalledTime = Date.now();
    }
    
    static getDelta() {
        return DeltaTime.delta;
    }
}

export default DeltaTime;