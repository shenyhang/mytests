app.controller('ExAssetHistoryController',function($scope,httpService,$state,$rootScope){
	//控制参数
	$scope.conParam = {
		errormsg:'',
		marketdialog:false,
		hist:true,
		tabdialog:true
	};
	
	//设置请求参数
	$scope.resetParam = {};
	
	//绑定地址请求参数
	$scope.bindParam = {};
	
	//结果参数
	$scope.result = {
		markets:[],
		means:[],
		historyMarket:{},
		addressobj:{},
	};
	
	//查询所有市场接口
	function getMarketsService(reqParam){
		var header = getLocalToken();
		httpService.http('private','getAssets','get',reqParam,{},header)
		.then(function success(resp){  
			if(httpResponse(resp).success==1){
				if(httpResponse(resp).message.result.length!=0){
					$scope.result.markets=httpResponse(resp).message.result;
					$scope.result.historyMarket=$scope.result.markets[0];
					$scope.result.markets[0].choosed = true;
					$scope.resetParam.assetId = $scope.result.markets[0].id;
					$scope.resetParam.asset_name = $scope.result.markets[0].asset_name;
					$scope.resetParam.asset = $scope.result.markets[0].asset_name;
					$scope.resetParam.current = 'to';
					getBlockService($scope.resetParam);
				}
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//查询其他财务信息
	function getMeansService(reqParam){
		var header = getLocalToken();
		httpService.http('private','getMeans','get',reqParam,{},header)
		.then(function success(resp){ 
			if(httpResponse(resp).success==1){
				$scope.result.means = httpResponse(resp).message.result;
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//查询充值地址上的交易信息接口
	function getBlockService(reqParam){
		var header = getLocalToken();
		httpService.http('private','getBlock','get',reqParam,{},header)
		.then(function success(resp){ 
			if(httpResponse(resp).success==1){
				$scope.result.bockInfo = httpResponse(resp).message.result;
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//充提切换
	$scope.history = function(symbol){
		$scope.result.bockInfo = [];
		if(symbol=='to')
			$scope.conParam.hist=true;
		else
			$scope.conParam.hist=false;
		$scope.resetParam.current = symbol;
		getBlockService($scope.resetParam);
	};
	
	//显示币种弹框
	$scope.showMarketDialog = function(e){
		
		$scope.conParam.marketdialog = true;
		$scope.conParam.tabdialog = true;
		$(e.target).addClass('dams-as-his');
		$(e.target).siblings().removeClass('dams-as-his');
	};
	
	//切换其他记录
	$scope.chooseRecordTab = function(e){
		$scope.conParam.tabdialog = false;
		$scope.conParam.marketdialog = false;
		$(e.target).addClass('dams-as-his');
		$(e.target).siblings().removeClass('dams-as-his');
		getMeansService($scope.resetParam);
	};
	
	//选中某个币种
	$scope.clickMarket = function(item){
		$scope.result.bockInfo = [];
		$scope.result.historyMarket = item;
		$scope.conParam.marketdialog = false;
		$scope.resetParam.assetId = item.id;
		$scope.resetParam.condition = item.address;
		getBlockService($scope.resetParam);
	};
	
	//初始化
	(function(){
		getMarketsService({});
		//检查token
		loginURl();
		$rootScope.getMenuService();
	})();
	
});