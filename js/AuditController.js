
app.controller('AuditController',function($scope,httpService,$state,$rootScope){
	//结果
	$scope.result = {
		balels:[{
			'id':1,
			'title':'百度公司路况审核任务',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'0.2',
			'total':'25',
			'limit_time':'10',
		},{
			'id':2,
			'title':'京东公司AI数据审核任务',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'0.1',
			'total':'25',
			'limit_time':'10',
		}]
	};
	
	//点击进入待审核详细页面
	$scope.goaudit = function(item){
		$state.go('home.auditdetail',{'id':item.id,'title':item.title});
	};
	
	
	//初始化调用
	(function(){
		
	})()
	
});