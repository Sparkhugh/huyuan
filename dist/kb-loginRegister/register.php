<?php
	header("content-type:text/html;charset=utf8");
	$connect=mysqli_connect('localhost','root','root','user',3306);
	if(mysqli_connect_error()){
		die("数据库连接错误");
	}
	
	$username=$_POST['username'];
	$password=$_POST['password'];

	$sql="INSERT INTO information (username,password) VALUES ('$username','$password')";
	$result=mysqli_query($connect,$sql);

	if($result){
		//如果注册成功 设置cookie 下次直接登录
		setcookie("username",$username,time()+24*3600);
		setcookie("password",$password,time()+24*3600);
		echo $username."注册成功";
	}else{
		echo "注册失败";
	}
	
	
	
	
	
	
?>