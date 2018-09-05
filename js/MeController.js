app.controller('MeController',function($translate,httpService,$state,$scope,$rootScope){
	
	//控制参数
	$scope.conParam = {
		msg:""
	};
	$scope.result ={
		user_info:{
			id:3008,
			nick_name:'小猪佩奇'
		}
	};
	
	//点击退出按钮
	$scope.loginout = function(){
		$('.hide').css({display:'block'});
		$scope.conParam.msg = '您确定要买要退出嘛？';
	};
	//点击忍痛割爱
	$scope.cancleDialog = function(){
		$('.hide').css({display:'none'});
	};
	//点击咬牙买了
	$scope.sureDialog = function(){
		$('.hide').css({display:'none'});
	};
	
	//初始化
	(function(){
		
	})();
});