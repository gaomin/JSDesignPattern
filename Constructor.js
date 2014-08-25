/*
* Constructor 构造器模式
*/

//基本Constructor
//存在的问题：
//	1.继承困难
//	2.创建实例的时候，为每个实例都创建了toString方法
function Car(model,year,miles){

	this.model = model;
	this.year = model;
	this.miles = miles;

	this.toString = function(){
		return this.model + " has done " + this.miles + " miles ";
	}
}

//创建Car实例
var civic = new Car("Honda Civic",2009,20000);
var mondeo = new Car("Ford",2010,5000);

console.log(civic.toString());
console.log(mondeo.toString());


//！！原型Constructor
//		方法共享
function Car(model,year,miles){
	this.model = model;
	this.year = year;
	this.miles = miles;
}

Car.prototype.toString = function(){
	return this.model + " has done " + this.miles + " miles ";
}

//创建Car实例
var civic = new Car("Honda Civic",2009,20000);
var mondeo = new Car("Ford",2010,5000);

console.log(civic.toString());
console.log(mondeo.toString());