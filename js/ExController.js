app.controller('ExController',function($scope,httpService,$state,$rootScope){
	$state.go('exasset.asset');
	$scope.leftMenus=[{
		choosed:true,
		url:'exasset.asset',
		name:'资产信息',
		img:'asset'
	},{
		choosed:false,
		url:'exasset.assethistory',
		name:'财产记录',
		img:'money_record'
	},{
		choosed:false,
		url:'exasset.traderhistory',
		name:'交易记录',
		img:'trader'
	}];
	
	//查询用户信息接口
	function getUserInfoService(reqParam){
		var header = getLocalToken();
		httpService.http('private','getUserInfo','get',reqParam,{},header)
		.then(function success(resp){  
			if(httpResponse(resp).success==1){
				$rootScope.user_info = httpResponse(resp).message.result;
				window.localStorage.setItem('user_info',JSON.stringify(httpResponse(resp).message.result));
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	$rootScope.exLeftMenus = $scope.leftMenus;
	$scope.marketClick = function(item){
		var arr = [];
		for(var i = 0;i<$scope.leftMenus.length;i++){
			if($scope.leftMenus[i].url==item.url){
				arr.push({
					choosed:true,
					url:item.url,
					name:item.name,
					img:item.img
				});
			}else{
				arr.push({
					choosed:false,
					url:$scope.leftMenus[i].url,
					name:$scope.leftMenus[i].name,
					img:item.img
				});
			}
		}
		$rootScope.exLeftMenus = arr;
	};
	//初始化
	(function(){
		//检查token
		loginURl();
		getUserInfoService({});
		$rootScope.getMenuService();
	})();
	
});