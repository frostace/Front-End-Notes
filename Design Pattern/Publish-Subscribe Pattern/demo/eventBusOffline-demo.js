import EventBusOffline from "./eventBusOffline.js";

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

EventBusOffline.on("my-channel", Subscriber1.update);
EventBusOffline.on("my-channel", Subscriber2.update);

const Publisher = {
    publish(p) {
        EventBusOffline.emit("my-channel", p);
    },
};

Publisher.publish("I published a msg");

console.log("---");
EventBusOffline.on("my-channel", Subscriber3.update);
console.log("---");

Publisher.publish("I published another msg");
console.log("---");
EventBusOffline.on("my-channel", Subscriber4.update);
