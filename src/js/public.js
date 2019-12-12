/*1
作用:返回一个随机整数
参数:第一个是最小值,第二个最大值
返回值:最小到最大值之间的随机整数
*/
function rand(min,max){
	return min + Math.floor(Math.random()*(max-min+1));
}


/*2
作用:生成随机颜色
参数:无
返回值:返回一个十六进制的颜色  #456ABC
*/
function getColor(){
	var str="#";
	for(var i=0;i<6;i++){
		str += rand(0,15).toString(16);
	}
	return str;
}

/*3
作用:通过id获取元素
参数:id
返回值:DOM节点
*/
function $id(id){
	return document.getElementById(id);
}

/*4
作用:获取窗口可视区域的宽高
参数:无
返回值:json对象
*/
function getClient(){
	if(window.innerWidth!=undefined){
		return {
			width:window.innerWidth,
			height:window.innerHeight
		};
	}else if(document.compatMode == "CSS1Compat"){
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		};
	}else{
		return {
			width:document.body.clientWidth,
			height:document.body.clientHeight
		};
	}
}

/*5
滚动条距离
*/
function scroll(){
	//return {
	//	left:document.documentElement.scrollLeft+document.body.scrollLeft,
	//	top:document.documentElement.scrollTop+document.body.scrollTop
	//}
	return{
		left:document.documentElement.scrollLeft || document.body.scrollLeft,
		top:document.documentElement.scrollTop || document.body.scrollTop
	}
}
/*6
定义一个数组,用于存放符合条件的DOM节点
*/
function getElements(className){
	var result=[];
	var all=document.getElementsByTagName('*');//获取页面上的所有标签
	for(var i=0;i<all.length;i++){//筛选其中类名叫one的元素
		if(all[i].className == className){//如果循环到的标签的类名和传入的类名一致,说明这个标签就是符合条件的
			result.push(all[i])
		}
	}
	return result;
}



/*7
封装一个方法获取元素样式
*/
function getStyle(element,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(element,null)[attr];
	}else{
		return element.currentStyle[attr];
	}
}

/*8
封装绑定事件函数的方法
*/ function addEvent(dom,type,fn){
	if(dom.addEventListener){
		dom.addEventListener(type,fn,false)
	}else{
		dom.attachEvent("on"+type,fn)
	}
}

/*9
 鼠标按键 封装函数
*/
function getButton(e){
	if(e){
		return e.button;
	}else{
		switch(window.event.button){
			case 1:
				return 0;
				break;
			case 4:
				return 1;
				break;
			case 2:
				return 2;
				break;
		}
	}
}
/*10
封装trim方法 清除字符串前后空格
*/
function trim(str){
	var reg=/(^\s+)|(\s+$)/g;
	str = str.replace(reg,"");
	return str;
}
/*
//封装一个函数,实现让指定目标运动到指定位置
function animate(dom,target){
	clearInterval(dom.timer);
	dom.timer=setInterval(function(){
		var current=dom.offsetLeft;
		var speed=target>current?5:-5;
		var next=current+speed;
		if(Math.abs(next-target)<=5){
			dom.style.left=target+"px";
			clearInterval(dom.timer);
		}else{
			dom.style.left=next+"px";
		}
	},20)
}	
//封装一个透明度运动的函数
function move(dom,target){
	clearInterval(dom.timer);
	dom.timer=setInterval(function(){
		var current=getStyle(dom,"opacity")*100;
		var speed=target>current?5:-5;
		var next=current+speed;
		if(Math.abs(next-target)<=5){
			dom.style.opacity=target/100;
			dom.style.filter="alpha(opacity="+target+")";
			clearInterval(dom.timer);
		}else{
			dom.style.opacity=next/100;
			dom.style.filter="alpha(opacity="+next+")";
		}
	},100)
}
//缓动函数
function move(dom,target){
	clearInterval(dom.timer);
	dom.timer=setInterval(function(){
		var current=dom.offsetLeft;
		var speed=(target-current)/10;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		var next=current+speed;
		if(next==target){
			dom.style.left=target+"px";
			clearInterval(dom.timer);
		}else{
			dom.style.left=next+"px";
		}
	},30)
}
*/
/*11
封装匀速运动函数 可以实现指定元素,指定属性运动到指定目标位置,要求属性是数值型的,单位是px 

function animate(dom,attr,target,fn){
	clearInterval(dom.timer);
	dom.timer=setInterval(function(){
		var current=getStyle(dom,attr);
		if(attr=="opacity"){
			current=current*100;
		}else{
			current=parseInt(current);
		}
		var speed=target>current?5:-5;
		var next=current+speed;
		if(Math.abs(next-target)<=5){
			if(attr=="opacity"){
				dom.style.opacity=target/100;
				dom.style.filter="alpha(opacity="+target+")";
			}else{
				dom.style[attr]=target+'px';//变量用[]
			}
			if(fn){
				fn()
			}
			clearInterval(dom.timer);
		}else{
			if(attr=="opacity"){
				dom.style.opacity=next/100;
				dom.style.filter="alpha(opacity="+next+")";
			}else{
				dom.style[attr]=next+'px';
			}
		}
	},30)
}
*/
/*12
封装缓动函数,可以实现指定元素,指定属性运动到指定目标位置,要求属性是数值型的,单位是px
 给day17-1,2,3调用

function animate(dom,attr,target,fn){
	clearInterval(dom.timer);
	dom.timer=setInterval(function(){
		var current=getStyle(dom,attr);
		if(attr=="opacity"){
			current = current*100;
		}else{
			current=parseInt(current);//取整,去除px单位
		}
		var speed=(target-current)/10;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		var next=current+speed;
		if(attr=="zIndex"){//计算下一步的值z-index一步到位
			next=target;
		}
		if(next==target){
			if(attr=="opacity"){
				dom.style.opacity=target/100;
				dom.style.filter="alpha(opacity="+target+")";
			}else if(attr=="zIndex"){
				dom.style.zIndex=target;
			}else{
				dom.style[attr]=target+"px";
			}
			if(fn){
				fn();//fn是动画完成以后执行的函数
			}
			clearInterval(dom.timer);
		}else{
			if(attr=="opacity"){
				dom.style.opacity=next/100;
				dom.style.filter="alpha(opacity="+next+")";
			}else{
				dom.style[attr]=next+"px";
			}
		}
	},20)
}
*/
/*13
封装缓动函数,缓动键值对,一个节点可实现多个属性同时缓动
json:就是要执行缓动的键值对{"width":600,"height":300,"left":300,"top":400}
fn:是动画完成后的回调函数
*/
function animate(dom,json,fn){
	clearInterval(dom.timer);
	dom.timer=setInterval(function(){
		var flag=1;//设定标志值
		for(var attr in json){
			var current=getStyle(dom,attr);
			if(attr=="opacity"){
				current *= 100;
			}else{
				current=parseInt(current);
			}
			var target=json[attr];//获取目标值
			var speed=(target-current)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			var next=current+speed;
			if(attr=="zIndex"){
				next=target;
			}
			if(next!=target){//判断是否到达目标位置
				flag=0;
			}
			//元素定位
			if(attr=="opacity"){
				dom.style.opacity=next/100;
				dom.style.filter="alpha(opacity="+next+")";
			}else if(attr=="zIndex"){
				dom.style.zIndex=next;
			}else{
				dom.style[attr]=next+"px";
			}
		}
		if(flag){
			if(fn){
				fn();
			}
			clearInterval(dom.timer);
		}
	},20)
}
