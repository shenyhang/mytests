app.controller('ExTraderHistoryController',function($scope,httpService,$state,$rootScope){
	//控制参数
	$scope.conParam = {
		errormsg:'',
		marketdialog:false,
		symbol:'finished',
	};
	
	//设置请求参数
	$scope.resetParam = {};
	
	//绑定地址请求参数
	$scope.bindParam = {};
	
	//结果参数
	$scope.result = {
		markets:[],
		historyMarket:{},
		addressobj:{},
		traderhistory:[],
	};
	
	//查询所有市场接口
	function getMarketsService(reqParam){
		var header = getLocalToken();
		httpService.http('private','getMarkets','get',reqParam,{},header)
		.then(function success(resp){  
			if(httpResponse(resp).success==1){
				if(httpResponse(resp).message.result.length!=0){
					$scope.result.markets=httpResponse(resp).message.result;
					$scope.result.historyMarket=$scope.result.markets[0];
					$scope.result.markets[0].choosed = true;
					$scope.resetParam.symbol = 'buy';
					$scope.resetParam.asset_name = $scope.result.markets[0].asset_name;
					getTraderHistoryService($scope.resetParam);
				}
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//查询成交记录信息接口
	function getTraderHistoryService(reqParam){
		var header = getLocalToken();
		httpService.http('private','getTraderHistory','get',reqParam,{},header)
		.then(function success(resp){ 
		console.log(resp);
			if(httpResponse(resp).success==1){
				$scope.result.traderhistory = httpResponse(resp).message.result;
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//查询撤销记录信息接口
	function getTraderCancledService(reqParam){
		var header = getLocalToken();
		httpService.http('private','getTraderCancled','get',reqParam,{},header)
		.then(function success(resp){ 
		console.log(resp);
			if(httpResponse(resp).success==1){
				$scope.result.traderhistory = httpResponse(resp).message.result;
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//充提切换
	$scope.history = function(symbol){
		$scope.conParam.symbol = symbol;
		if(symbol=="finished"){
			getTraderHistoryService($scope.resetParam);
		}else{
			getTraderCancledService($scope.resetParam);
		}
	};
	
	//显示币种弹框
	$scope.showMarketDialog = function(){
		$scope.conParam.marketdialog = true;
	};
	
	//选中某个币种
	$scope.clickMarket = function(item){
		$scope.result.historyMarket = item;
		$scope.conParam.marketdialog = false;
		$scope.resetParam.asset_name = item.asset_name;
		if($scope.conParam.symbol=='finished'){
			getTraderHistoryService($scope.resetParam);
		}else{
			getTraderCancledService($scope.resetParam);
		}
	};
	
	//初始化
	(function(){
		getMarketsService({});
		//检查token
		loginURl();
		$rootScope.getMenuService();
	})();
	
});