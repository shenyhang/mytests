
app.controller('UploadController',function($scope,httpService,$state,$rootScope){
	
	$scope.conParam = {
		msg:''
	}
	//结果
	$scope.result = {
		
	};
	$scope.result.data= $scope.result.labels;
	//tab切换
	$scope.tabChoose = function(e,symbol){
		$(e.target).addClass('active');
		$(e.target).siblings().removeClass('active');
	};
	
	//点击上传
	$scope.upload = function(item){
		$('.hide').css({display:'block'});
		$scope.conParam.msg='您确定要将该资源上传嘛？';
	};
	
	//点击取消
	$scope.cancleDialog = function(item){
		$('.hide').css({display:'none'});
	};
	//点击
	$scope.sureDialog = function(item){
		$('.hide').css({display:'none'});
		msgDialog('恭喜，上传成功!',1000);
	};
	//返回按钮
	$scope.goback = function(){
		window.history.back(); 
	};
	
	//初始化调用
	(function(){
		
	})()
	
});