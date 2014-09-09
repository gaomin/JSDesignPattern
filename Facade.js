/*
* Facade（外观）模式
* 简化API展示，可以提高可见性
* jQuery中常见，$(el).css(),$(el).animate()...,提供更简单的公共接口
* Facade模式简化类的接口，并将类从代码中解耦
 */

// e.m.1
var addMyEvent = function(el, ev, fn){

	if(el.addEventListener){
		el.addEventListener(ev, fn, false);
	}else if(el.attachEvent){
		el.attachEvent('on' + ev, fn);
	}else{
		el['on' + ev] = fn;
	}

}

// e.m.2
var module = (function(){

	var _private = {
		i : 5,
		get : function(){
			console.log("current value:" + this.i);
		},
		set : function(val){
			this.i = val;
		},
		run : function(){
			console.log("running");
		},
		jump : function(){
			console.log("jumping");
		}
	};

	return {
		facade : function(args){
			_private.set(args.val);
			_private.get();
			if(args.run){
				_private.run();
			}
		}
	}
})();

module.facade({ run : true, val : 10});