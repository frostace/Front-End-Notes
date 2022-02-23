function baojian1(money) {
    return money >= 200 ? "prime" : "basic";
}

function baojian2(money) {
    return money >= 1000 ? "double" : "single";
}

module.exports = {
    baojian1,
    baojian2,
};
