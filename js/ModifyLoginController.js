app.controller('ModifyLoginController',function($scope,httpService,$state,$rootScope){
	
	//控制参数
	$scope.conParam = {
		errormsg:'',
		bt_disable:false
	};
	
	//修改资金密码参数
	$scope.modifyLoginParam = {
		password:'',
		newPassword:'',
		renewPassword:''
	};
	
	//修改资金密码生成验证链接提交接口
	function modifyLoginPasswordService(reqParam){
		var header = getLocalToken();
		httpService.http('private','modifyLoginPassword','post',{},reqParam,header)
		.then(function success(resp){ 
			if(httpResponse(resp).success==1) {
				$scope.conParam.errormsg='SUB_MODIFY_LOGIN_PASSWORD';
				$scope.conParam.bt_disable=true;
			} else {
				$scope.conParam.errormsg=httpResponse(resp).message;
			}
		},function error(resp){  
			
		});
	};
	
	//修改登录密码生成验证链接提交按钮
	$scope.modifyLoginPaasword = function(){
		if($scope.modifyLoginParam.password==''){
			$scope.conParam.errormsg='RESET_PASSWORD_EMPTY';
		}else{
			modifyLoginPasswordService($scope.modifyLoginParam);
		}
	};
	
	var href = window.location.href;
	if(href.indexOf('code')!=-1){
		$scope.modifyLoginParam.code=href.split('=')[1];
	};
	//设置新登陆密码提交接口
	function setNewLoginPaaswordService(reqParam){
		var header = getLocalToken();
		httpService.http('private','setNewLoginPaasword','post',{},reqParam,header)
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
	
	//设置新登陆密码提交按钮
	$scope.setNewLoginPaasword = function(){
		if($scope.modifyLoginParam.newPassword!=$scope.modifyLoginParam.renewPassword){
			$scope.conParam.errormsg='CONFIRM_PASSWORD_SAME';
		} else if ($scope.modifyLoginParam.newPassword=='' && $scope.modifyLoginParam.renewPassword==''){
			$scope.conParam.errormsg='RESET_PASSWORD_EMPTY';
		} else if (!passwordReg($scope.modifyLoginParam.newPassword)){
			$scope.conParam.errormsg='RESET_PASSWORD_FORMAT';
		} else {
			setNewLoginPaaswordService($scope.modifyLoginParam);
		}
	};
	
	//初始化
	(function(){
		$rootScope.getMenuService();
	})();
	
	
});

