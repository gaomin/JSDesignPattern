/**
 * Abstract Factory 抽象工厂
 * 封装一组具有共同目标的单个工厂，能够将一组对象的实现细节从一般用法中分离出来
 * 使用场景：一个系统必须独立于它所创建的对象的生成方式，或它需要多种对象类型一起工作
 */

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

var AbstractVehicleFactory = (function(){

	var types = {};
	return {
		getVehicle : function(type, customizations){
			var Vehicle = types[type];
			return (Vehicle) ? new Vehicle(customizations) : null;
		},

		registerVehicle : function(type, Vehicle){
			var proto = Vehicle.prototype;

			if(proto.drive && proto.breakDown){
				types[type] = Vehicle;
			}
			return AbstractVehicleFactory;
		}
	};
})();


AbstractVehicleFactory.registerVehicle("car",function Car(options){
	this.doors = options.doors || 4;
	this.state = options.state || "brand new";
	this.color = options.color || "silver";
});
AbstractVehicleFactory.registerVehicle("truck",Truck);

var car = AbstractVehicleFactory.getVehicle("car",{
	color : "lime green",
	state : "like new"
});

var truck = AbstractVehicleFactory.getVehicle("Truck",{
	wheelSize : "medium",
	color : "neon yellow"
});

console.log(car);
console.log(truck);