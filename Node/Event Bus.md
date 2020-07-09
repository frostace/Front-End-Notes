# Event Bus

```JavaScript
class EventBus {
    constructor(){
        this._events = this._events || new Map(); 			// maintain (evtName, callback) pair
        this._maxListeners = this._maxListeners || 10;	// listener upbound
    }
}

// trigger callback of event `evtName`
EventBus.prototype.emit = function(evtName, ...args){
    let hander;
    // get event handler
    handler = this._events.get(evtName);
    if (args.length > 0) {
        hander.apply(this, args);
    } else {
        handler.call(this);
    }
    return true;
};

// register callback `fn` for event `type`
EventBus.prototype.addListener = function(evtName, fn) {
    // maintain fn in this._events
    if (!this._events.get(evtName)) {
        this._events.set(evtName, fn);
    }
};
```

