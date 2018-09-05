app.controller('FundController',function($scope,httpService,$state,$rootScope){
	
	//控制参数
	$scope.conParam = {
		errormsg:'',
		bt_disable:false
	};
	
	//设置资金密码参数
	$scope.resetParam = {
		fundpassword:'',
		repassword:''
	};
	
	//设置资金密码提交接口
	function setFundPaaswordApiService(reqParam){
		var header = getLocalToken();
		httpService.http('private','setFundPaaswordApi','post',{},reqParam,header)
		.then(function success(resp){  
			if(httpResponse(resp).success==1){
				$scope.conParam.errormsg='SUB_SET_FUND_PASSWORD';
				$scope.conParam.bt_disable=true;
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
			//$state.go('login')
		},function error(resp){  
			
		});
	};
	
	//设置资金密码提交按钮
	$scope.setFundPaasword = function(){
		if($scope.resetParam.fundpassword!=$scope.resetParam.repassword){
			$scope.conParam.errormsg='CONFIRM_PASSWORD_SAME';
		} else if ($scope.resetParam.fundpassword=='' && $scope.resetParam.repassword==''){
			$scope.conParam.errormsg='RESET_PASSWORD_EMPTY';
		} else if (!passwordReg($scope.resetParam.fundpassword)){
			$scope.conParam.errormsg='RESET_PASSWORD_FORMAT';
		} else {
			setFundPaaswordApiService($scope.resetParam);
		}
	};
	
	//修改资金密码参数
	$scope.modifyFundParam = {
		password:'',
		newPassword:'',
		renewPassword:''
	};
	
	//修改资金密码生成验证链接提交接口
	function modifyFundPasswordService(reqParam){
		var header = getLocalToken();
		httpService.http('private','modifyFundPassword','post',{},reqParam,header)
		.then(function success(resp){ 
			if(httpResponse(resp).success==1) {
				$scope.conParam.errormsg='SUB_MODIFY_FUND_PASSWORD';
				$scope.conParam.bt_disable=true;
			} else {
				$scope.conParam.errormsg=httpResponse(resp).message;
			}
		},function error(resp){  
			
		});
	};
	
	//修改资金密码生成验证链接提交按钮
	$scope.modifyFundPaasword = function(){
		if($scope.modifyFundParam.password==''){
			$scope.conParam.errormsg='RESET_PASSWORD_EMPTY';
		}else{
			modifyFundPasswordService($scope.modifyFundParam);
		}
	};
	
	var href = window.location.href;
	if(href.indexOf('code')!=-1){
		$scope.modifyFundParam.code=href.split('=')[1];
	};
	//设置新资金密码提交接口
	function setNewFundPaaswordService(reqParam){
		var header = getLocalToken();
		httpService.http('private','setNewFundPaasword','post',{},reqParam,header)
		.then(function success(resp){  
			if(httpResponse(resp).success==1){
				$scope.conParam.errormsg='SUB_SET_FUND_PASSWORD';
				$scope.conParam.bt_disable=true;
				$state.go('login');
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//设置新资金密码提交按钮
	$scope.setNewFundPaasword = function(){
		if($scope.modifyFundParam.newPassword!=$scope.modifyFundParam.renewPassword){
			$scope.conParam.errormsg='CONFIRM_PASSWORD_SAME';
		} else if ($scope.modifyFundParam.newPassword=='' && $scope.modifyFundParam.renewPassword==''){
			$scope.conParam.errormsg='RESET_PASSWORD_EMPTY';
		} else if (!passwordReg($scope.modifyFundParam.newPassword)){
			$scope.conParam.errormsg='RESET_PASSWORD_FORMAT';
		} else {
			setNewFundPaaswordService($scope.modifyFundParam);
		}
	};
	
	//初始化
	(function(){
		$rootScope.getMenuService();
	})();
	
	
});

