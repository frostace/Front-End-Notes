var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Adder = /** @class */ (function () {
    function Adder(a) {
        var _this = this;
        this.a = a;
        // This function is now safe to pass around
        this.add = function (b) {
            return _this.a + b;
        };
    }
    return Adder;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.superAdd = _this.add;
        // Create our override
        _this.add = function (b) {
            return _this.superAdd(b);
        };
        return _this;
    }
    return Child;
}(Adder));
var child = new Child(123);
console.log(child.add(123));
