<?php
header('content-type:text/html;charset=utf8');
if(array_key_exists('username',$_COOKIE)&&array_key_exists('password',$_COOKIE)){
	$username=$_COOKIE['username'];
	$password=$_COOKIE['password'];
}else{
	$username=$_POST['username'];
	$password=$_POST['password'];
}
$connect=mysqli_connect('localhost','root','root','user',3306);
if(mysqli_connect_error()){
		die('0');
}
	
$sql="SELECT * FROM information WHERE username='$username' AND password='$password'";
$result=mysqli_query($connect,$sql);
$rows=mysqli_num_rows($result);
if($rows>0){ setcookie('username',$username,time()+24*3600); setcookie('password',$password,time()+24*3600); echo "1"; }else{ setcookie('username',$username,time()-24*3600); setcookie('password',$password,time()-24*3600); echo "0"; } ?>