/*
* 观察者模式
* 观察者模式又叫发布订阅模式，它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，
 	这个主题对象的状态发证变化时就会通知所有的观察者对象，使它们能够自动更新自己
* 使用观察者模式的好处：
	1.支持简单的广播通信，自动通知所有已经订阅过的对象
	2.页面载入后目标对象很容易与观察者存在一种动态关联，增加了灵活性
	3.目标对象与观察者之间的抽象耦合关系能够单独扩展以及重用
* 观察者的使用场合就是：当一个对象的改变需要同时改变其它对象，并且它不知道具体有多少对象需要改变的时候，
	就应该考虑使用观察者模式。
* 总的来说，观察者模式所做的工作就是在解耦，让耦合的双方都依赖于抽象，而不是依赖于具体。从而使得各自的变化都不会影响到另一边的变化。
*/

// Version_1
// JS 里对观察者模式的实现通过回调， 定义一个pubsub对象， 其内部包含了3个方法：订阅、退订、发布

var pubsub = {};
(function(q){

	var topics = [],		//回调函数存放的数组
		subUid = -1;

	//发布方法
	q.publish = function(topic,args){
		if(!topics[topic]){
			return false;
		}

		setTimeout(function(){
			var subscribers = topics[topic],
				len = subscribers ? subscribers.length : 0;

			while(len--){
				subscribers[len].func(topic,args);
			}
		},0);

		return true;
	};
	//订阅方法
	q.subscribe = function(topic, func){
		if(!topics[topic]){
			topics[topic] = [];
		}
		var token = (++subUid).toString();
		topics[topic].push({
			token: token,
			func : func
		});
		return token;
	};
	//退订方法
	q.unsubscribe = function(token){
		for (var m in topics){
			if(topics[m]){
				for(var i = 0, j = topics[m].length; i < j; i++){
					if(topics[m][i].token === token){
						topics[m].splice(i,1);
						return token;
					}
				}
			}
		}
	return false;
	}


})(pubsub);

//将订阅赋值给一个变量，以便退订
var testSubscription = pubsub.subscribe('example1', function (topics, data) {
    console.log(topics + ": " + data);
});

//发布通知
pubsub.publish('example1', 'hello world!');
pubsub.publish('example1', ['test', 'a', 'b', 'c']);
pubsub.publish('example1', [{ 'color': 'blue' }, { 'text': 'hello'}]);

//退订
setTimeout(function () {
    pubsub.unsubscribe(testSubscription);
}, 0);

//再发布一次，验证一下是否还能够输出信息
pubsub.publish('example1', 'hello again! (this will fail)');