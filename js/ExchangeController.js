
app.controller('ExchangeController',function($scope,httpService,$state,$rootScope){
	
	$scope.conParam ={
		warning:false,
		msg:""
	};
	//结果
	$scope.result = {
		balels:[{
			'id':1,
			'title':'百度公司路况资料交易',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'limit_time':'10',
			'status':'FINISHED',
		},{
			'id':2,
			'title':'京东公司AI数据标注资料交易',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'limit_time':'10',
			'status':'PENDDING',
		}]
	};
	
	//点击我要买了
	$scope.buyClick = function(){
		$('.hide').css({display:'block'});
		$scope.conParam.warning = true;
		$scope.conParam.msg = '您确定要买该资源嘛？';
	};
	//点击忍痛割爱
	$scope.cancleDialog = function(){
		$scope.conParam.warning = false;
		$('.hide').css({display:'none'});
	};
	//点击咬牙买了
	$scope.sureDialog = function(){
		$scope.conParam.warning = false;
		msgDialog('恭喜，购买成功!',1000);
		$('.hide').css({display:'none'});
	};
	//点击进入待交易详细页面
	$scope.goexchange = function(item){
		$state.go('home.exchangedetail',{'id':item.id,'title':item.title});
	};
	
	//初始化调用
	(function(){
		
	})()
	
});