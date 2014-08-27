/*
* Mediator中介者模式
* 软件开发中，中介者是一个行为设计模式，通过提供一个统一的接口让系统的不同部分进行通信。
*     一般，如果系统有很多子模块需要直接沟通，都要创建一个中央控制点让其各模块通过该中央控制点进行交互。
*     中介者模式可以让这些子模块不需要直接沟通，而达到进行解耦的目的。
* 打个比方，平时常见的机场交通控制系统，塔台就是中介者，它控制着飞机（子模块）的起飞和降落，因为所有的沟通都是从飞机向塔台汇报来完成的，而不是飞机之前相互沟通。
* 中央控制系统就是该系统的关键，也就是软件设计中扮演的中介者角色。
*/

var mediator = (function(){

	var channels = {};
	// 订阅一个事件，并提供一个事件触发以后的回调函数
	var subscribe = function(channel, fn){
		if(!mediator.channels[channel]) mediator.channels[channel] = [];
		mediator.channels[channel].push({context:this, callback:fn});
		return this;
	};

	var	publish = function(channel){
		if(!mediator.channels[channel]) return false;
		var args = Array.prototype.slice.call(arguments, 1);
		for(var i = 0, l = mediator.channels[channel].lenghth; i < 1; i++){
			var subscription = mediator.channels[channel][i];
			subscription.callback.apply(subscription.context, args);
		}
		return this;
	};

	return {
		channels : {},
		publish : publish,
		subscribe : subscribe,
		installTo : function(obj){
			obj.subscribe = subscribe;
			obj.publish = publish;
		}
	};
})();


// 调用代码
(function(mediator){

	function init(){
		mediator.name = "dudu";
		//订阅一个事件nameChange， 回调显示修改后的信息
		mediator.subscribe('nameChange', function(arg){
			console.log(this.name);
			this.name = arg;
			console.log(this.name);
		});
	}

	function updateName(){
		//广播触发事件，参数为新数据
		mediator.publish('nameChange','tom');
	}

	init();				//dudu , tom 、tom,tom
	updateName();		//事件匹配，动态触发 回调函数
	updateName(); 		
})(mediator);