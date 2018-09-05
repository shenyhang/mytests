
app.controller('LabelController',function($scope,httpService,$state,$rootScope){
	//结果
	$scope.result = {
		balels:[{
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
		}]
	};
	
	
	//初始化调用
	(function(){
		
	})()
	
});