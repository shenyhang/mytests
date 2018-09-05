
app.controller('PublicController',function($scope,httpService,$state,$rootScope){
	
	$scope.conParam ={
		warning:false,
		msg:""
	};
	//结果
	$scope.result = {
		balels:[{
			'id':1,
			'title':'百度公司路况标注资料',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'limit_time':'10',
			'status':'FINISHED',
		},{
			'id':2,
			'title':'百度公司路况标注资料',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'limit_time':'10',
			'status':'PENDDING',
		}]
	};
	
	//点击我要买了
	$scope.buyClick = function(){
		$('.pc-dg').css({display:'block'});
	};
	//点击我要发布
	$scope.publicSureDialog = function(){
		$scope.conParam.warning = true;
		$('.pc-dg').css({display:'none'});
		$('.msg-hide').css({display:'block'});
		$scope.conParam.msg="您确定要发布该资源嘛？";
	};
	//点击忍痛割爱
	$scope.cancleDialog = function(){
		$scope.conParam.warning = false;
		$('.pc-dg').css({display:'none'});
		$('.msg-hide').css({display:'none'});
	};
	//
	$scope.publicCancleDialog = function(){
		$scope.conParam.warning = false;
		$('.pc-dg').css({display:'block'});
		$('.msg-hide').css({display:'none'});
	};
	
	//点击咬牙买了
	$scope.sureDialog = function(){
		$scope.conParam.warning = false;
		msgDialog('恭喜，发布成功!',1000);
		$('.msg-hide').css({display:'none'});
	};
	//点击进入待交易详细页面
	$scope.goexchange = function(item){
		$state.go('home.exchangedetail',{'id':item.id,'title':item.title});
	};
	//返回按钮
	$scope.goback = function(){
		window.history.back(); 
	};
	
	//初始化调用
	(function(){
		
	})()
	
});