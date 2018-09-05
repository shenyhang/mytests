app.controller('MyWalletController',function($translate,httpService,$state,$scope,$rootScope){
	
	//控制参数
	$scope.conParam = {
		cny_flag:true,
		coin_flag:false,
		msg:""
	};
	$scope.result ={
		user_info:{
			id:3008,
			nick_name:'小猪佩奇'
		}
	};
	
	
	//tab切换
	$scope.tab = function(e,symbol){
		$(e.target).addClass('active');
		$(e.target).siblings().removeClass('active');
		if(symbol=='cny'){
			$scope.conParam.cny_flag=true;
			$scope.conParam.coin_flag=false;
		}else{
			$scope.conParam.cny_flag=false;
			$scope.conParam.coin_flag=true;
		}
		
	};
	
	//点击历史记录充提按钮
	$scope.history = function(e,symbol){
		$(e.target).addClass('active');
		$(e.target).siblings().removeClass('active');
	};
	
	//点击充值
	$scope.deposit = function(){
		$('.cny_dl').css({display:'block'});
	};
	
	//点击币充值
	$scope.coindeposit = function(){
		$('.coin_dl').css({display:'block'});
	};
	
	//关闭弹出框
	$scope.closeDialog = function(){
		$('.hide').css({display:'none'});
	};
	//确定按钮
	$scope.sure = function(){
		$('.cny_dl').css({display:'none'});
		msgDialog('恭喜，充值成功!',1000);
	};
	//点击币充值
	$scope.coinsure = function(){
		$('.coin_dl').css({display:'none'});
	};
	//返回按钮
	$scope.goback = function(){
		window.history.back(); 
	};
	//初始化
	(function(){
		
	})();
});