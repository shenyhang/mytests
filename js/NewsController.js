app.controller('NewsController',function($scope,httpService,$state,$rootScope,$stateParams){
	
	//设置请求参数
	$scope.resetParam = {
		row:10,
		id:0
	};
	
	//结果参数
	$scope.result = {
		newslist:[],
		newscontent:{}
	};
	
	//查询所有新闻列表接口
	function getNewsService(reqParam){
		return new Promise(function(resolve,reject){
			httpService.http('news','getNews','get',reqParam,{},{})
			.then(function success(resp){ 
				if(httpResponse(resp).success==1){
					$scope.result.newslist=httpResponse(resp).message.result;
					resolve();
				}else{ 
					reject();
				}
			},function error(resp){  
				reject();
			});
		});
	};
	
	//查询某个新闻详细接口
	function getNewContentService(reqParam){
		return new Promise(function(resolve,reject){
			httpService.http('news','getNewContent','get',reqParam,{},{})
			.then(function success(resp){ 
				if(httpResponse(resp).success==1){
					$scope.result.newscontent=httpResponse(resp).message.result;
					resolve();
				}else{ 
					reject();
				}
			},function error(resp){  
				reject();
			});
		});
	};
	
	//点击查看更多
	$scope.more = function(){
		$scope.resetParam.row = $scope.resetParam.row+10;
		getNewsService($scope.resetParam);
	};
	
	//初始化调用
	(function(){
		if($stateParams.id!=undefined){
			$scope.resetParam.id=$stateParams.id;
			getNewContentService($scope.resetParam);
		}else{
			getNewsService($scope.resetParam);
		}
	})()
	
});