<?php
	header("content-type:text/html;charset=utf8");
	$connect=mysqli_connect('localhost','root','root','user',3306);
	if(mysqli_connect_error()){
		die("数据库连接错误");
	}
	$username=$_COOKIE['username'];
	$password=$_COOKIE['password'];
	
	$sql="SELECT * FROM information WHERE username='$username' AND password='$password'";
	$result=mysqli_query($connect,$sql);
	$rows=mysql_num_rows($result);
	if($rows>0){
		echo "欢迎回来".$username;
	}else{
		echo "点击重新注册:<a href='http://localhost/day36/kb-loginRegister/kbook-register.html'>注册</a>";
	}
	
	
?>