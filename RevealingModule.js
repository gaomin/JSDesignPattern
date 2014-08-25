/*
* 揭示模块模式
*/

var myRevealingMoudle = function(){
	var privateName = "",
		publicName = "";

	function privateFunction(){
		console.log(privateName)
	}

	function publicSetName(strName){
		privateName = strName;
	}

	function publicGetName(){
		privateFunction();
	}

	return{
		setName : publicSetName,
		greeting : privateName,
		getName : publicGetName
	};
}