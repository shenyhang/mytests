
app.controller('ExchangeDetailController',function($scope,httpService,$state,$rootScope){
	
	$scope.conParam ={
		labelflag:false,
		warning:false,
		msg:""
	};
	
	//点击菜单列表
	$scope.chooseTabs = function(symbol,url){
		if(symbol=='NO'){
			$('.mb-detail').addClass('mb-hidech');
			$('.dialog').addClass('dialoganimation');
		}else{
			$state.go(url);
			$('.im-view').addClass('im-view-dialog');
			$('.im-view').removeClass('im-view-dialog-rm');
		}
	};
	
	
	//点击显示大图
	$scope.showBigImage = function(){
		$('.details').css({display:'block'});
	};
	//点击关闭大图
	$scope.closeDialog = function(){
		$('.details').css({display:'none'});
	};
	
	
	//点击我要购买
	$scope.buy = function(){
		$scope.conParam.warning = true;
		$scope.conParam.msg = '您确定要买该资源嘛？';
		$('.show').css({display:'block'});
	};
	//点击忍痛割爱
	$scope.cancleDialog = function(){
		$scope.conParam.warning = false;
		$('.show').css({display:'none'});
	};
	//点击咬牙买了
	$scope.sureDialog = function(){
		$scope.conParam.warning = false;
		msgDialog('恭喜，购买成功!',1000);
		$('.show').css({display:'none'});
	};
	
	//返回按钮
	$scope.goback = function(){
		window.history.back(); 
	};
	
	
	//初始化调用
	(function(){
		
	})()
	
});