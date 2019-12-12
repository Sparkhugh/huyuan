//jquery引入
$(function(){
	//轮播图
	var mySwiper=new Swiper('.swiper-container',{
		autoplay:{
			delay: 2000,//2秒切换一次
		},
		loop:true,
		//分页器
		pagination: {
			el: '.swiper-pagination',
		},
		//前进后退按钮
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	});
	//鼠标移入
	//鼠标移入登录/注册 显示login-box
	$('.login-resister').on('mouseenter',function(){
		$('.login-box').css({display:'block',zIndex:99});
	});
	$('.login-resister').on('mouseleave',function(){
		$('.login-box').css('display','none');
	});
	//鼠标移入个人中心 显示personal-box
	$('.personal-center').on('mouseenter',function(){
		$('.personal-box').css({display:'block',zIndex:99});
	});
	$('.personal-center').on('mouseleave',function(){
		$('.personal-box').css('display','none');
	});
	//鼠标移入卖家中心 显示seller-box
	$('.seller-center').on('mouseenter',function(){
		$('.seller-box').css({display:'block',zIndex:99});
	});
	$('.seller-center').on('mouseleave',function(){
		$('.seller-box').css('display','none');
	});
	//鼠标移入公告 显示公告
	$('.gonggao').on('mouseenter',function(){
		$('.sign-con').css('display','block');
		$('.rule-con').css('display','none');
	});
	//鼠标移入规则 显示规则
	$('.guize').on('mouseenter',function(){
		$('.rule-con').css('display','block');
		$('.sign-con').css('display','none');
	});
	//鼠标移入帮助与客服
	$('.labels').on('mouseenter',function(){
		$('.rule-helpBox').css('display','block');
		$('.rule-con').css('display','none');
	});
	$('.labels').on('mouseleave',function(){
		$('.rule-helpBox').css('display','none');
		$('.rule-con').css('display','block');
	});
	//鼠标移入导航区li上 动画显示nav-line
	$('.nav-box li').mouseenter(function(){
		$(this).find('.nav-line').css('display','block');
	});
	$('.nav-box li').mouseleave(function(){
		$(this).find('.nav-line').css('display','none');
	});
	
	
	//搜索框关键字联想 ajax加载
	var inp=getElements('txt')[0];
	var keywordBox=getElements('keywordBox')[0];
	var flag=true;
	inp.addEventListener('compositionstart',function(){
		flag=false;
	})
	inp.addEventListener('compositionend',function(){
		flag=true;
	})
	inp.oninput=function(){
		keywordBox.style.display="block";
		setTimeout(function(){
			if(flag){
				var keyword=inp.value;
				ajax({
					url:"https://suggest.taobao.com/sug",
					dataType:'jsonp',
					data:{
						code:'utf-8',
						q:keyword,
						_ksTS:"1563970517892_385",
						k:1,
						area:"c2c",
						bucketid:10
					},
					success:function(data){
						var result=data.result;
						var str="";
						result.forEach(function(value){
							str += "<li>"+value[0]+"</li>";
						})
						keywordBox.innerHTML=str;
					}
				})
			}
		},0)
	}
	//鼠标移出input输入框 隐藏keywordBox
	$('[type=text]').mouseleave(function(){
		$('.keywordBox').hide();
	})
	//鼠标移入keywordBox 显示keywordBox
	$('.keywordBox').mouseenter(function(){
		$(this).show();
	})
	$('.keywordBox').mouseleave(function(){
		$(this).hide();
	})
	
	
	
	
})

	


