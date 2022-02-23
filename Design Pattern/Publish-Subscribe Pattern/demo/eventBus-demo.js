import EventBus from "./eventBus.js";

const Subscriber1 = {
    update(msg) {
        console.log(`Subscriber1 received: ${msg}`);
    },
};

const Subscriber2 = {
    update(msg) {
        console.log(`Subscriber2 received: ${msg}`);
    },
};

const Subscriber3 = {
    update(msg) {
        console.log(`Subscriber3 received: ${msg}`);
    },
};

const Subscriber4 = {
    update(msg) {
        console.log(`Subscriber4 received: ${msg}`);
    },
};

EventBus.on("my-channel", Subscriber1.update);
EventBus.on("my-channel", Subscriber2.update);
EventBus.on("my-channel", Subscriber3.update);
EventBus.once("once-channel", Subscriber4.update);

const Publisher = {
    publish(p) {
        EventBus.emit("my-channel", p);
    },
    publishOnce(p) {
        EventBus.emit("once-channel", p);
    },
};

Publisher.publish("I published a new msg");
Publisher.publish("I published a new msg");
Publisher.publishOnce("once msg");
Publisher.publishOnce("once msg");
