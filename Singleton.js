/**
* 单例模式
*/


var single1 = (function(){
	var instance;
	function init(){ 
		function privateMethod(){
			console.log("Private");
		}
		var privateVar = "private also";
		var privateRandomNumber = Math.random();

		return{
			publicMethod : function(){
				console.log("public");
			},
			publicProperty : "public also",
			getRandomNumber : function(){
				return privateRandomNumber;
			}
		};
	};

	return{
		getInstance : function(){
			if(!instance){						//每次调用getInstance时，返回同一个instance
				instance = init();			
			}
			return instance;
		}
	};

})();


var single2 = (function(){
	var instance;
	function init(){
		var privateRandomNumber = Math.random();
		return{
			getRandomNumber : function(){
				return privateRandomNumber;
			}
		};
	}

	return{
		getInstance : function(){
			instance = init();					//每次调用getInstance时，返回一个新引用instance
			return instance;
		}
	}
})();


var A = single1.getInstance();
var B = single1.getInstance();
console.log(A.getRandomNumber() === B.getRandomNumber());	//true

var C = single2.getInstance();
var D = single2.getInstance();
console.log(C.getRandomNumber() === D.getRandomNumber());	//false