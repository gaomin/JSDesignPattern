// e.g.1
var myCar = {
	name : "ford",
	drive : function(){
		console.log("sss");
	},
	panic : function(){
		console.log("sss");
	}
};

var yourCar = Object.create(myCar);
console.log(yourCar.name);

// e.g.2
var vehicle = {
	getModel : function(){
		console.log("The model of this vehicle is .." +　this.model);
	}
};

var car = Object.create(vehicle, {
	"id" : {
		value : "MY_GLOBAL",
		enumerable : true
	},
	"model" : {
		value : "ford",
		enumerable : true
	}
});

//e.g.3
var vehiclePrototype = {
	init : function(carModel){
		this.model = carModel;
	},
	getModel : function(){
		console.log(this.model);
	}
};

function vehicle(model){
	function F(){};
	F.prototype = vehiclePrototype;
	var f = new F();
	f.init(model);
	return f;

}

var car = vehicle("Ford");
car.getModel();

// e.g.4

var beget = (function(){
	function F(){};
	return function(proto){
		F.prototype = proto;
		return new F();
	}
})();