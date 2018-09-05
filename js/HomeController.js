
app.controller('HomeController',function($scope,httpService,$state,$rootScope){
	$state.go('home.homepage');
	//
	$scope.conParam ={
		symbol:'home'
	};
	
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
		}],
		audits:[{
			'id':1,
			'title':'百度公司路况审核任务',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'limit_time':'10',
		},{
			'id':2,
			'title':'京东公司AI数据审核任务',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'limit_time':'10',
		}],
		auditrecords:[{
			'id':1,
			'title':'百度公司路况已审核',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'limit_time':'10',
		},{
			'id':2,
			'title':'京东公司AI数据已审核',
			'condition':'快，准，狠，只要标注质量好，钱不是问题，所以，请大家认真标注吧',
			'price':'2',
			'total':'25',
			'limit_time':'10',
		}]
	}
	
	//点击发布按钮
	$scope.publicClick=function(){
		$state.go('home.public');
	};
	//点击上传按钮
	$scope.uploadClick=function(){
		$state.go('home.upload');
	};
	//点击进入待标注详细页面
	$scope.golabel = function(item,symbol){
		if(symbol=='label'){
			$state.go('home.labeldetail',{'id':item.id,'title':item.title});
		}else if(symbol=='audit'){
			$state.go('home.auditdetail',{'id':item.id,'title':item.title});
		}else if(symbol=='audited'){
			$state.go('home.auditeddetail',{'id':item.id,'title':item.title});
		}
	};
	
	//点击菜单列表
	$scope.chooseTabs = function(event,url){
		$(event.target).addClass('active');
		$(event.target).siblings().removeClass('active');
		$state.go(url);
	};
	
	
	
	//初始化调用
	(function(){
		
	})()
	
});