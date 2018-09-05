
app.controller('HistoryController',function($scope,httpService,$state,$rootScope){
	
	$scope.conParam = {
		msg:''
	}
	//结果
	$scope.result = {
		labels:[{
			'id':1,
			'title':'百度公司路况标注任务',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'limit_time':'10',
		},{
			'id':2,
			'title':'京东公司AI数据标注任务',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'limit_time':'10',
		}],
		unAudits:[{
			'id':1,
			'title':'百度公司路况审核任务',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'label_time':'2018-08-09',
			
		},{
			'id':2,
			'title':'京东公司AI数据审核任务',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'label_time':'2018-08-09',
		}],
		audits:[{
			'id':1,
			'title':'百度公司路况',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'audit_time':'2018-08-09',
		},{
			'id':2,
			'title':'京东公司AI数据',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'audit_time':'2018-08-09',
		}],
		exchanges:[{
			'id':1,
			'title':'百度公司路况',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'exchange_time':'2018-08-09',
		},{
			'id':2,
			'title':'京东公司AI数据',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'exchange_time':'2018-08-09',
		}],
		data:[]
	};
	$scope.result.data= $scope.result.labels;
	//tab切换
	$scope.tabChoose = function(e,symbol){
		$(e.target).addClass('active');
		$(e.target).siblings().removeClass('active');
		if(symbol=='label')
			$scope.result.data= $scope.result.labels;
		else if(symbol=='unaudit')
			$scope.result.data= $scope.result.unAudits;
		else if(symbol=='audit')
			$scope.result.data= $scope.result.audits;
		else if(symbol=='exchange')
			$scope.result.data= $scope.result.exchanges;
	};
	
	//点击卖出去
	$scope.sell = function(item){
		$('.sell').css({display:'block'});
		$scope.conParam.msg='您确定要将该资源卖出去嘛？';
	};
	//点击付款
	$scope.pay = function(item){
		$('.pay').css({display:'block'});
		$scope.conParam.msg='您确定要去支付嘛？';
	};
	
	//点击取消
	$scope.cancleDialog = function(item){
		$('.pay').css({display:'none'});
		$('.sell').css({display:'none'});
	};
	//点击卖了
	$scope.sellSureDialog = function(item){
		$('.sell').css({display:'none'});
		msgDialog('恭喜，挂单成功!',1000);
	};
	//点击支付了
	$scope.paySureDialog = function(item){
		$('.pay').css({display:'none'});
		msgDialog('恭喜，付款成功!',1000);
	};
	
	
	//初始化调用
	(function(){
		
	})()
	
});