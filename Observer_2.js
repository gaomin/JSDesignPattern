// e.g.1  ??
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
			this.observerList.shift();
		}else if(index === this.observerList.length - 1){
			this.observerList.pop();
		}
	}
};

//使用extension扩展对象
function extend(obj,extension){
	for(var key in obj){
		extension[key] = obj[key];
	}
}

//Subject

function Subject(){
	this.observers = new ObserverList();
}

Subject.prototype = {
	AddObserver : function(observer){
		this.observers.Add(observer);
	},
	RemoveObserver : function(observer){
		this.observers.RemoveIndexAt(this.observers.IndexOf(observer,0));
	},
	Notify : function(context){
		var observerCount = this.observers.Count();
		for( var i = 0; i < observerCount; i++){
			this.observers.Get(i).Update(context);
		}
	}
};

//Observer
function Observer(){
	this.Update = function(){}
}

//HTML
// <button id="addNewObserver">Add New Observer checkbox </button>
// <input id="mainCheckbox" type="checkbox"/>
// <div id="observersContainer"></div>

var controlCheckbox = document.getElementById("mainCheckbox"),
	addBtn = document.getElementById("addNewObserver"),
	container = document.getElementById("observersContainer");

// 具体目标 Concrete Subject
extend(new Subject(), controlCheckbox);

controlCheckbox['onclick'] = new Function("controlCheckbox.Notify(controlCheckbox.checked)");
addBtn["onclick"] = addNewObserver;

// 具体观察者 Concrete Observer

function AddNewObserver(){
	var check = document.createElement("input");
	check.type = "checkbox";

	extend(new Observer(), check);
	check.Update = function(value){
		this.checked = value;
	};

	controlCheckbox.AddObserver(check);
	container.appendChild(check);
}


