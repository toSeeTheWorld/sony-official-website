window.onload = function(){
	var container = document.getElementsByClassName('NewRecommendList');
	var list = document.getElementsByClassName('list');
	var buttons = document.getElementsByClassName('buttons')[0].getElementsByTagName('span');//获取class节点得到数组
	var prev = document.getElementsByClassName('prev');
	var next = document.getElementsByClassName('next');
	var index = 1;
	var animated = false;								//用以判断程序是否在运行中，要等一次换图后才能进行下一次
	var timer;											//定时器播放

	/////////////////////////////////////////////换图//////////////////////////////////////////////////////

	function animate(offset){
		var time = 300;									//位移总时间
		var interval = 10;								//位移间隔时间
		var speed = offset / (time / interval);				//每次位移量
		var newleft = parseInt(list[0].style.left) + offset;//移动后的位置，parseInt将100px变成100，才能与数字相加减
		function go(){
			animated = true;								//换图过程中
			if ((speed > 0 && parseInt(list[0].style.left) < newleft) || (speed < 0 && parseInt(list[0].style.left) > newleft)) {
				list[0].style.left = parseInt(list[0].style.left) + speed + 'px';
				setTimeout(go,interval);                //递归，每隔interval时间后执行一次go函数
			}
			else{
				list[0].style.left = newleft + 'px';
				if (newleft >- 960) {						//判断是否到两侧极限多存的副图，如果是，跳到主图。
					list[0].style.left = -2880 + 'px';
				}
				if (newleft <- 2880) {
					list[0].style.left =- 960 + 'px';
				}
				animated = false;							//不在换图中
			}
		}
		go();
	}

	/////////////////////////////////////////箭头调用/////////////////////////////////////////////////////

	next[0].onclick = function(){
		if (animated) {
			return;										//换图中，跳出if的父级函数
		}
		animate(-960);
		if (index == 3) {									//按钮同步切换
			index = 1;
		}
		else{
			index += 1;
		}
		showButton();
	}
	prev[0].onclick = function(){
		if (animated) {									//换图中，跳出if的父级函数
			return;
		}
		animate(960);
		if (index == 1) {									//按钮同步切换
			index = 3;
		}
		else{
			index -= 1;
		}
		showButton();
	}

	///////////////////////////////////////////按钮调用////////////////////////////////////////////////////

	for(var i = 0;i < buttons.length;i++){
		buttons[i].onclick = function(){								
			if (animated) {													//换图中，跳出if的父级函数
				return;
			}
			var myIndex = parseInt(this.getAttribute('index'));               //this//
			var offset = -960 * (myIndex - index);								//（点击按钮-原始按钮差）*单次移动像素
			animate(offset);
			index = myIndex;													//更新index
			showButton();													//更新按钮css
		}
	}

	/////////////////////////////////////////////更新按钮css//////////////////////////////////////////////

	function showButton(){
		for(var i = 0;i < buttons.length;i++){               //遍历，找出原来亮着的按钮，并熄灭
			if (buttons[i].className == 'on') {
				buttons[i].className = ' ';
				break;
			}                                   
		}
		buttons[index - 1].className = 'on';				//点亮新的按钮,index的1，2，3对应的buttons数组的[0][1][2]
	}

	///////////////////////////////////////////////paly&stop////////////////////////////////////////////////

	function play(){
		timer = setTimeout(function(){
			next[0].onclick();
			play();
		},3000);
	}
	function stop(){
		clearTimeout(timer);
	}

	list[0].onmouseover = stop;
	list[0].onmouseout = play;

	play();

	///////////////////////////////////////////hover///////////////////////////////////

	var websiteLink = document.getElementsByClassName("linkContainer")[0].getElementsByTagName("a");
	for (var i = 0; i < websiteLink.length; i++) {
		websiteLink[i].onmouseover = function(){
			this.style.top = "-114px";
		}
		websiteLink[i].onmouseout = function(){
			this.style.top = "0";
		}
	}


	var linkColor = document.getElementById("footerContainer1").getElementsByTagName("a");
	for (var i = 0; i < linkColor.length; i++) {
		linkColor[i].onmouseover = function(){
			this.style.color = "#009ffb";
		}
		linkColor[i].onmouseout = function(){
			this.style.color = "white";
		}
	}

	var footLink = document.getElementById("footLinkContainer").getElementsByTagName("img");
	for (var i = 0; i < footLink.length; i++) {
		footLink[i].onmouseover = function(){
			this.style.top = "0";
		}
		footLink[i].onmouseout = function(){
			this.style.top = "-14px";
		}
	}

	var onlineService = document.getElementById("onlineService");
	onlineService.onmouseover = function(){
		this.style.top = "-18px";
	}
	onlineService.onmouseout = function(){
		this.style.top = "0";
	}

	var linkSpan = document.getElementsByClassName("followUs");
	for (var i = 0; i < linkSpan.length; i++) {
		linkSpan[i].onmouseover = function(){
			this.style.backgroundColor = "#009ffb";
		}
		linkSpan[i].onmouseout = function(){
			this.style.backgroundColor = "#424243";
		}
	}
}

