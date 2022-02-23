import { EventBus } from "./eventBus.js";

class EventBusOffline extends EventBus {
    offlineCache = [];

    /**
     * override on method, deliver previous msgs on subscription
     * @param {*} channel
     * @param {*} fn
     * @returns
     */
    on = function (channel, fn) {
        if (!this.subscriberMap[channel]) {
            this.subscriberMap[channel] = [];
        }
        this.subscriberMap[channel].push(fn);

        /** call fns in previous msgs */
        if (!this.offlineCache.length) {
            return;
        }
        for (
            let i = 0, offlineCall;
            (offlineCall = this.offlineCache[i]);
            i++
        ) {
            const [_channel, ...offlineArgs] = offlineCall;
            if (_channel !== channel) return;
            fn.apply(this, offlineArgs);
        }
    };

    /**
     * override emit, collect previous broadcast functions
     * @returns
     */
    emit = function () {
        (this.offlineCache || (this.offlineCache = [])).push(
            Array.prototype.slice.call(arguments)
        );

        const channel = Array.prototype.shift.call(arguments),
            fns = this.subscriberMap[channel];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (let i = 0, fn; (fn = fns[i]); i++) {
            fn.apply(this, arguments);
        }
    };
}

export default new EventBusOffline();
