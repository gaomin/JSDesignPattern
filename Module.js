/**
* Module 模块模式
* Module模式用于进一步模拟类的概念，通过这种方式，能够使一个单独的对象拥有公有/私有方法和变量，
		从而屏蔽来自全局作用域的特殊部分
* Module 使用闭包封装 私有 状态和组织
* 降低与其他脚本的命名冲突
* 缺点：由于访问公有和私有成员的方式不同，当想改变可见性时，必须修改每一个使用该成员的地方
*/

//example1
var testModule = (function(){

	var counter = 0;
	return {

		incrementCounter : function(){
			return ++counter;
		},

		resetCounter : function(){
			console.log("counter value prior to reset: " + counter);
			counter = 0;
		}
	}
})();

testModule.incrementCounter();
testModule.resetCounter();
console.log(testModule.counter); //undefined


//example2
var myNamespace = (function(){

	var myPrivateVar = 0; 		//私有计数器变量
	var myprivateMethod = function(foo){		//私有函数
		console.log(foo);
	};

	return {
		myPublicVar : 'foo',	//公有变量
		myPublicFunction : function(bar){		//公有函数
			myPrivateVar++;
			myprivareMethod(bar);
		}

	};
})();


//example3
var basketModule = (function(){

	var basket = [];
	function doSomethingPrivate(){}
	function doSomethingElsePrivate(){}

	return{
		addItem : function(values){
			basket.push(values);
		},

		getItemCount : function(){
			return basket.length;
		},

		doSomething : doSomethingPrivate,

		getTotal : function(){
			var itemCount = this.getItemCount(),
				total = 0;
			while(itemCount--){
				total += basket[itemCount].price;
			}

			return total;
		}
	}
})();

basketModule.addItem({
	item : "bread",
	price : 0.5
});
basketModule.addItem({
	item : "butter",
	price : 0.3
});

console.log(basketModule.getItemCount());			// 2
console.log(basketModule.getTotal());				// 0.8
console.log(basketModule.basket);					//undefined
console.log(basket);				// ERROR: not defined


// Module 模式变化
// 引入，将全局变量作为参数传递给模块的匿名函数
var myModule = (function(jQ,_){			//可以在模块中使用别名

	function privateMethod1(){
		jQ(".container").html("test");
	}

	function privateMethod2(){
		console.log(_.min([10,5,100,2,1000]));
	}

	return{
		publicMethod : function(){
			privateMethod1();
		}
	}
})(jQuery,_);

myModule.publicMethod();

// 引出
var myModule = (function(){				//全局模块

	var module = {},
		privateVar = "Hello World";

	function privateMethod(){}

	module.publicProperty = "Foobar";
	module.publicMethod = function(){
		console.log(privateVar);
	};

	return module;				//返回模块对象
})();