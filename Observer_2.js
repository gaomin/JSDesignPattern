// Observer
function ObserverList(){
	this.observerList = [];
}

ObserverList.prototype = {
	Add : function(obj){
		return this.observerList.push(obj);
	},
	Empty : function(){
		this.observerList = [];
	},
	Count : function(){
		return this.observerList.length;
	},
	Get : function(index){
		if(index > -1 && index < this.observerList.length){
			return this.observerList[index];
		}
	},
	Insert : function(obj,index){
		var pointer = -1;
		if( index === 0){
			this.observerList.unshift(obj);
			pointer = index;
		}else if(index === this.observerList.length){
			this.observerList.push(obj);
			pointer = index;
		}
		return pointer;
	},
	IndexOf : function(obj, startIndex){XQ
		var i = startIndex, pointer = -1;
		while(i < this.observerList.length){
			if(this.observerList[i] === obj){
				pointer = i;
			}
			i++;
		}
		return pointer;
	},
	RemoveIndexAt : function(index){
		if(index === 0){
			this.observerList.pop();
		}
	}


}