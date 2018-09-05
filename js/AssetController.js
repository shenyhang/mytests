app.controller('AssetController',function($scope,httpService,$state,$rootScope){
	
	//控制参数
	$scope.conParam = {
		errormsg:'',
		dialog:false,
		radio:false,
		fund_dialog:false,
		hist:true,
		wdDialog:false,
		selectDialog:false,
		bdwdDialog:false,
		withdravalAddress:''
	};
	
	//设置请求参数
	$scope.resetParam = {};
	
	//绑定地址请求参数
	$scope.bindParam = {};
	
	//结果参数
	$scope.result = {
		markets:[],
		addressobj:{},
		addressflag:false,
		safeInfo:{},
		balance:{},
		bockInfo:[],
		withdravalAddress:[]
	};
	
	//查询所有市场接口
	function getMarketsService(reqParam){
		var header = getLocalToken();
		httpService.http('private','getMarkets','get',reqParam,{},header)
		.then(function success(resp){  
			if(httpResponse(resp).success==1){
				if(httpResponse(resp).message.result.length!=0){
					$scope.result.markets=httpResponse(resp).message.result;
					$scope.result.markets[0].choosed = true;
					$scope.resetParam.assetId = $scope.result.markets[0].id;
					$scope.resetParam.asset = $scope.result.markets[0].asset_name;
					getAddressService($scope.resetParam);
				}
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//查询用户是否生生成过该账户地址接口
	function getAddressService(reqParam){
		var header = getLocalToken();
		httpService.http('private','getAddress','get',reqParam,{},header)
		.then(function success(resp){  
			if(httpResponse(resp).success==1){
				if(httpResponse(resp).message.result.length!=0){
					$scope.result.addressflag=true;
					$scope.result.addressobj=httpResponse(resp).message.result[0];
					$scope.resetParam.address = $scope.result.addressobj.address;
					getBalanceService($scope.resetParam);
					$scope.resetParam.current = 'to';
					$scope.resetParam.condition = $scope.resetParam.address;
					getBlockService($scope.resetParam);
				}else{
					$scope.result.addressflag=false;
				}
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//查询该用户地址账户余额接口
	function getBalanceService(reqParam){
		var header = getLocalToken();
		httpService.http('private','getBalance','get',reqParam,{},header)
		.then(function success(resp){
			if(httpResponse(resp).success==1){
				$scope.result.balance = httpResponse(resp).message;
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//生成私钥和地址接口
	function createAddressService(reqParam){
		var header = getLocalToken();
		httpService.http('private','createAddress','post',{},reqParam,header)
		.then(function success(resp){  
			if(httpResponse(resp).success==1){
				getAddressService($scope.resetParam);
				$scope.conParam.fund_dialog = false;
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//查询该用户是否设置过资金密码接口
	function getSafeInfoService(reqParam){
		var header = getLocalToken();
		httpService.http('private','getSafeInfo','get',reqParam,{},header)
		.then(function success(resp){ 		
			if(httpResponse(resp).success==1){
				if(httpResponse(resp).message.result.length==1){
					$scope.result.safeInfo=httpResponse(resp).message.result[0];
				}else {
					$scope.result.safeInfo.is_da_auth = 'NO';
					$scope.result.safeInfo.is_fund_password = 'NO';
				}
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
				$scope.result.bockInfo = httpResponse(resp).message;
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//查询转出地址接口
	function getWithdravalAddressService(reqParam){
		var header = getLocalToken();
		httpService.http('private','getWithdravalAddress','get',reqParam,{},header)
		.then(function success(resp){ 
		console.log(resp);
			if(httpResponse(resp).success==1){
				$scope.result.withdravalAddress = httpResponse(resp).message.result;
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//绑定地址接口
	function bindWithdravalAddressService(reqParam){
		var header = getLocalToken();
		httpService.http('private','bindWithdravalAddress','post',{},reqParam,header)
		.then(function success(resp){ 
			if(httpResponse(resp).success==1){
				getWithdravalAddressService($scope.resetParam);
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//转出地址接口
	function sendTransactionService(reqParam){
		var header = getLocalToken();
		httpService.http('private','sendTransaction','post',{},reqParam,header)
		.then(function success(resp){ 
			if(httpResponse(resp).success==1){
				createDialog('success','转出成功',1500);
			}else{ 
				createDialog('fail','转出失败',1500);
			}
		},function error(resp){  
			
		});
	};
	
	//选择市场点击事件
	$scope.marketClick = function(item){
		$scope.resetParam.assetId = item.id;
		$scope.resetParam.asset = item.asset_name;
		for(var i=0;i<$scope.result.markets.length;i++){
			if(item.id==$scope.result.markets[i].id){
				$scope.result.markets[i].choosed = false;
			}else{
				$scope.result.markets[i].choosed = true;
			}
		}
	};
	
	//确定生成私钥和地址按钮
	$scope.sureCreateAddress = function(){
		$scope.resetParam.asset = $scope.resetParam.asset.toLowerCase();
		createAddressService($scope.resetParam);
	};
	
	//取消生成私钥和地址按钮
	$scope.cancleCreateAddress = function(){
		$scope.conParam.dialog = false;
	};
	
	//协议单选按钮
	$scope.radioChoose = function(){
		$scope.conParam.radio = !$scope.conParam.radio;
	};
	
	//下一步
	$scope.next = function(){
		if($scope.conParam.radio){
			$scope.conParam.dialog = false;
			getSafeInfoService();
			$scope.conParam.fund_dialog = true;
		}
	};
	
	//生成私钥和地址点击按钮
	$scope.createAddress = function(){
		$scope.conParam.dialog = true;
	};
	
	//充提切换
	$scope.history = function(symbol){
		$scope.conParam.hist = !$scope.conParam.hist;
		$scope.resetParam.current = symbol;
		$scope.resetParam.condition = $scope.resetParam.address;
		getBlockService($scope.resetParam);
	};
	
	//转出按钮
	$scope.withdravalDialog = function(){
		getSafeInfoService();
		getWithdravalAddressService($scope.resetParam);
		hideDialog.show();
		$scope.conParam.wdDialog = true;
	};
	
	//显示和隐藏下拉选择
	$scope.showSelectDialog = function(){
		$scope.conParam.selectDialog = !$scope.conParam.selectDialog;
	};
	
	//转出确定按钮
	$scope.withdraval = function(){
		hideDialog.hide();
		$scope.conParam.wdDialog = false;
		sendTransactionService($scope.resetParam);
	};
	
	//转出取消按钮
	$scope.cancleWithdraval = function(){
		hideDialog.hide();
		$scope.conParam.wdDialog = false;
	};
	
	//绑定转出按钮
	$scope.bindAddressDialog = function(){
		$scope.conParam.bdwdDialog = true;
		$scope.conParam.wdDialog = false;
	};
	
	//绑定转出按钮确定
	$scope.withdravalAddress = function(){
		$scope.bindParam.assetId = $scope.resetParam.assetId;
		$scope.bindParam.asset = $scope.resetParam.asset;
		bindWithdravalAddressService($scope.bindParam);
		$scope.conParam.bdwdDialog = false;
		$scope.conParam.wdDialog = true;
	};
	
	//绑定转出按钮取消
	$scope.cancleWithdravalAddress = function(){
		$scope.conParam.bdwdDialog = false;
		$scope.conParam.wdDialog = true;
	};
	
	//选择转出地址
	$scope.addressChoose = function(item){
		$scope.conParam.withdravalAddress = item.address;
		$scope.resetParam.toAddress = item.address;
		$scope.conParam.selectDialog = false;
	};
	
	//初始化
	(function(){
		getMarketsService({});
		//检查token
		loginURl();
		$rootScope.getMenuService();
	})();
	
});