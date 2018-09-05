
app.controller('LabelDetailController',function($scope,httpService,$state,$rootScope){
	
	$scope.conParam ={
		labelflag:false,
		warning:false,
		msg:""
	};
	
	//点击菜单列表
	$scope.chooseTabs = function(symbol,url){
		if(symbol=='NO'){
			$('.mb-hide').addClass('mb-hidech');
			$('.dialog').addClass('dialoganimation');
		}else{
			$state.go(url);
			$('.im-view').addClass('im-view-dialog');
			$('.im-view').removeClass('im-view-dialog-rm');
		}
	};
	
	
	//点击显示大图
	$scope.showBigImage = function(){
		$('.hide').css({display:'block'});
	};
	//点击关闭大图
	$scope.closeDialog = function(){
		$('.hide').css({display:'none'});
	};
	
	//点击我要标注
	$scope.label = function(){
		$scope.conParam.labelflag = true;
	};
	
	//点击我要取消
	$scope.cancle = function(){
		$scope.conParam.warning = true;
		$scope.conParam.msg = '您确定要取消该标注嘛？';
	};
	//点击我完成了
	$scope.finish = function(){
		$scope.conParam.warning = true;
		$scope.conParam.msg = '您确定已经标注完成了嘛？';
	};
	//提示框取消按钮
	$scope.cancleDialog = function(){
		$scope.conParam.warning = false;
		$scope.conParam.labelflag = false;
	};
	//提示框确定按钮
	$scope.sureDialog = function(){
		$scope.conParam.warning = false;
		$scope.conParam.labelflag = false;
		msgDialog('恭喜，标注成功!',1000);
	};
	
	//返回按钮
	$scope.goback = function(){
		window.history.back(); 
	};
	
	
	//初始化调用
	(function(){
		
	})()
	
});