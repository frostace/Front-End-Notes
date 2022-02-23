export class EventBus {
    subscriberMap = {};

    /**
     * subscribe to a channel with a function
     * @param {*} channel
     * @param {*} fn
     */
    on = function (channel, fn) {
        console.log(channel, fn, this.subscriberMap[channel]);
        if (!this.subscriberMap[channel]) {
            this.subscriberMap[channel] = [];
        }
        this.subscriberMap[channel].push(fn);
    };
    /**
     * call functions provided by all subscribers when event is fired on a channel
     * @returns
     */
    emit = function () {
        const channel = Array.prototype.shift.call(arguments),
            fns = this.subscriberMap[channel];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (let i = 0, fn; (fn = fns[i]); i++) {
            fn.apply(this, arguments);
        }
    };
    /**
     * unsubscribe to a channel with the same function passed to `on`
     * @param {*} channel
     * @param {*} fn
     * @returns
     */
    off = function (channel, fn) {
        const fns = this.subscriberMap[channel];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            let findIndex = -1;
            for (let i = 0; i < fns.length; i++) {
                if (fns[i] === fn || fns[i] === fn.fn) {
                    findIndex = i;
                    break;
                }
            }
            if (findIndex !== -1) {
                fns.splice(findIndex, 1);
            }
        }
    };
    /**
     * publish exactly once
     * @param {*} channel
     * @param {*} fn
     */
    once = function (channel, fn) {
        /** unsubscribe right after fn call */
        function on() {
            fn.apply(this, arguments);
            this.off(channel, on);
        }
        this.on(channel, on);
    };
}

export default new EventBus();
