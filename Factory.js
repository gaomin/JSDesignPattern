/**
 * Factory 工厂模式
 * 不显式地使用一个构造函数，提供一个通用的接口创建对象
 * 适用场景：
 * 		当对象或组件涉及高复杂性时
 * 		当需要根据所在的不同环境轻松生成对象的不同实例时
 * 		当处理很多共享相同属性的小型对象或组件时
 * 		在编写只需要满足一个API 的其他对象的实例对象时
 *  除非为创建对象提供一个接口是我们正在编写的库或框架的设计目标，否则建议使用显式构造函数，以避免不必要的开销
 */

//e.m.1
//构造函数
function Car(options){
	this.doors = options.doors || 4;
	this.state = options.state || "brand new";
	this.color = options.color || "silver";
}

function Truck(options){
	this.state = options.state || "used";
	this.wheelSize = options.wheelSize || "large";
	this.color = options.color || "blue";
}

//工厂 vehicle
function VehicleFactory(){}

VehicleFactory.prototype.vehicleClass = Car;	
VehicleFactory.prototype.createVehicle = function(options){
	if(options.vehicleType == "car"){
		this.vehicleClass = Car;
	}else{
		this.vehicleClass = Truck;
	}
	return new this.vehicleClass(options);
};

var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
	vehicleType : "car",
	color : "yellow",
	doors : 6
});

console.log(car instanceof Car);		
console.log(car);

var movingTruck = carFactory.createVehicle({
	vehicleType : "truck"，
	state : "like new",
	color : "red",
	wheelSize : "small"
});

console.log(movingTruck instanceof Truck);
console.log(movingTruck);

//e.m.2
function TruckFactory(){}
TruckFactory.prototype = new VehicleFactory;
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle({
	state : "omg..so bad.",
	color : "pink",
	wheelSize : "so big"
})

console.log(myBigTruck instanceof Truck);
console.log(myBigTruck)