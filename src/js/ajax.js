function ajax(option){
	//获取默认值
	var method=(option.method||'get').toLowerCase();//请求方法
	var url=option.url;//请求路径
	if(!url){
		console.error("必须传入请求路径");
		return;
	}
	var data=option.data||{};
	//处理请求参数/请求主体
	var params="";
	for(var key in data){
		params += key+"="+data[key]+"&";
	}
	params=params.slice(0,-1);
	//获取响应成功的回调函数
	var success=option.success;
	//获取响应出错的回调函数
	var error=option.error;
	//获取是否使用xhr进去数据请求
	var dataType=(option.dataType||'json').toLowerCase();
	//如果使用script标签请求数据,传给后台回调函数名的键,默认是callback
	var jsonp=option.jsonp||"callback";
	//如果使用script标签请求数据,传给后台的回调函数名,默认是随机
	var cbName=option.cbName||('hugh'+new Date().getTime()+Math.random().toString().slice(2));
	
	//如果使用xhr对象(json)请求数据
	if(dataType=="json"){
		//创建xhr对象
		var xhr=new XMLHttpRequest;
		//请求
		if(method=='get'){
			xhr.open('get',url+"?"+params);
			xhr.send(null);
		}
		if(method=='post'){
			xhr.open('post',url);
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			xhr.send(params);
		}
		//响应
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					success(xhr.response);
				}else{
					if(error){
						error();
					}
				}
			}
		}
	}
	
	//如果使用script标签请求(jsonp)数据
	//创建script标签
	var script=document.createElement('script');
	//设置该标签的src属性
	script.src=url+"?"+params+"&"+jsonp+"="+cbName;
	//定义一个函数,以备调用
	window[cbName]=function(data){
		success(data);
		script.remove();
	}
	document.body.appendChild(script);
	
}





//函数调用方法
/*
ajax({
	method:"get/post",  //请求方式是get/post,不区分大小写,默认get;
	url:"",            //请求路径,不需参数
	data:{
		a:1,
		b:2
	},                //请求参数或者请求主体
	success:function(response){
		//响应完成或回调函数, response为响应数据
	},
	error:function(){
		
	},
	dataType:'json/jsonp',  //指定使用xhr请求json数据还是用script标签请求jsonp数据
	jsonp:"",        //若使用script标签请求数据,传给后台回调函数的键,默认为callback;
	cbName:          //若使用script标签请求数据,传给后台的回调函数名,默认是随机
})
*/