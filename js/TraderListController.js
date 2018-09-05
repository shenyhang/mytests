app.controller('TraderListController',function($scope,httpService,$state,$rootScope){
	homeAnimation();
	
	$scope.conParam={
		market:'BTC'
	}
	//设置请求参数
	$scope.resetParam = {
		row:1
	};
	
	//结果参数
	$scope.result = {
		marketsDecimals:[],
		newslist:[],
		allmarketsDecimals:[],
		baseMarkets:['BTC','USDT'],
		tickers:[]
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
	
	//查询所有市场以及小数位数接口
	function getMarketsDecimalsService(reqParam){
		return new Promise(function(resolve,reject){
			var header = getLocalToken();
			$scope.result.marketsDecimals = [];
			httpService.http('public','getMarketsDecimals','get',reqParam,{},header)
			.then(function success(resp){ 
				if(httpResponse(resp).success==1){
					$scope.result.allmarketsDecimals=httpResponse(resp).message.result;
					for(var j = 0;j<$scope.result.baseMarkets.length;j++){
						for(var i=0;i<httpResponse(resp).message.result.length;i++){
							var item = httpResponse(resp).message.result[i];
							if($scope.result.baseMarkets[j]==item.asset_name.split("_")[1] && $scope.conParam.market==$scope.result.baseMarkets[j]){
								$scope.result.marketsDecimals.push(item);
							}
						}
					}
					resolve();
				}else{ 
					reject();
					$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
				}
			},function error(resp){  
				reject();
			});
		});
	};
	
	//查询所有市场最新行情接口
	function getTickersService(reqParam){
		return new Promise(function(resolve,reject){
			var header = getLocalToken();
			httpService.http('public','get_tickers','get',reqParam,{},header)
			.then(function success(resp){ 
				if(httpResponse(resp).success==1){
					$scope.result.tickers=httpResponse(resp).message.result;
					for(var i=0;i<$scope.result.marketsDecimals.length;i++){
						if($scope.result.tickers.length==0){
							$scope.result.marketsDecimals[i].height_24h= 0;
							$scope.result.marketsDecimals[i].low_24h= 0;
							$scope.result.marketsDecimals[i].sum_24h= 0;
							$scope.result.marketsDecimals[i].amount= 0;
							$scope.result.marketsDecimals[i].price= 0;
						}
						for(var j=0;j<$scope.result.tickers.length;j++){
							if($scope.result.tickers[j].asset_name==$scope.result.marketsDecimals[i].asset_name){
								$scope.result.marketsDecimals[i].height_24h= $scope.result.tickers[j].height_24h;
								$scope.result.marketsDecimals[i].low_24h= $scope.result.tickers[j].low_24h;
								$scope.result.marketsDecimals[i].sum_24h= $scope.result.tickers[j].sum_24h;
								$scope.result.marketsDecimals[i].amount= $scope.result.tickers[j].amount;
								$scope.result.marketsDecimals[i].price= $scope.result.tickers[j].price;
							}else{
								$scope.result.marketsDecimals[i].height_24h= 0;
								$scope.result.marketsDecimals[i].low_24h= 0;
								$scope.result.marketsDecimals[i].sum_24h= 0;
								$scope.result.marketsDecimals[i].amount= 0;
								$scope.result.marketsDecimals[i].price= 0;
							}
						}
					}
					if($scope.result.tickers.length>0){
						$scope.resetParam.asset_name = $scope.result.tickers[0].asset_name;
						$scope.conParam.ticker= $scope.result.tickers[0];
					}
					resolve();
				}else{ 
					$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
					reject();
				}
			},function error(resp){  
				reject();
			});
		});
	};
	
	//轮询方法
	function getMarketPromise(){
		getMarketsDecimalsService({})
			.then(function(){
				return getTickersService($scope.resetParam);
			})
			.then(function(rs){
				$scope.$apply();
				setTimeout(function(){
					getMarketPromise();
				},1000);
			},function(err){
				setTimeout(function(){
					getMarketPromise();
				},1000);
			});
	};
	
	$scope.traderHref = function(item){
		$state.go('home.trader',{asset_name:item.asset_name});
	};
	
	//初始化调用
	(function(){
		getMarketPromise();
		getNewsService($scope.resetParam);
	})()
	
});