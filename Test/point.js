// var __extends = (this && this.__extends) || (function () {
//     var extendStatics = function (d, b) {
//         extendStatics = Object.setPrototypeOf ||
//             ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
//             function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
//         return extendStatics(d, b);
//     };
//     return function (d, b) {
//         extendStatics(d, b);
//         function __() { this.constructor = d; }
//         d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
//     };
// })();
var __extends =
	this.__extends ||
	function (d, b) {
		for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		function __() {
			// this.constructor = d;
		}
		console.log("here1", __.prototype.constructor);
		__.prototype = b.prototype;
		console.log("here1", d.prototype.constructor);
		console.log("here1", __.prototype.constructor);
		d.prototype = new __();
		console.log("here2", d.prototype.constructor);
	};
var Point = /** @class */ (function () {
	function Point(x, y) {
		this.x = x;
		this.y = y;
	}
	Point.prototype.add = function (point) {
		return new Point(this.x + point.x, this.y + point.y);
	};
	return Point;
})();
var Point3D = /** @class */ (function (_super) {
	__extends(Point3D, _super);
	function Point3D(x, y, z) {
		var _this = _super.call(this, x, y) || this;
		_this.z = z;
		return _this;
	}
	Point3D.prototype.add = function (point) {
		var point2D = _super.prototype.add.call(this, point);
		return new Point3D(point2D.x, point2D.y, this.z + point.z);
	};
	return Point3D;
})(Point);
let point1 = new Point3D(1, 2, 3);
console.log(point1.x, point1.y, point1.z);
console.log(point1.constructor);
