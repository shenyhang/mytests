app.controller('ForgetController',function($scope,httpService,$state){
	
	//返回值
	$scope.resultParam = {};
	
	//表单参数
	$scope.user = {
		email:''
	};
	
	//控制参数
	$scope.conParam = {
		errormsg:''
	};
	
	//重置密码参数
	$scope.resetParam = {
		password:'',
		repassword:'',
		forget_code:'',
	};
	
	var href = window.location.href;
	if(href.indexOf('forget_code')!=-1){
		$scope.resetParam.forget_code=href.split('=')[1];
	};
	
	//忘记密码提交接口
	function forgetPasswordService(reqParam){
		httpService.http('token','forget','post',{},reqParam,{})
		.then(function success(resp){  
			if(httpResponse(resp).success==1)
				$scope.conParam.errormsg=httpResponse(resp).message.result;
			 else 
				$scope.conParam.errormsg=httpResponse(resp).message.result;
		},function error(resp){  
			
		});  
	};
	
	//重置密码提交接口
	function resetPasswordService(reqParam){
		console.log(reqParam);
		httpService.http('token','forgetSetPassword','post',{},reqParam,{})
		.then(function success(resp){  
			if(httpResponse(resp).success==1)
				$scope.conParam.errormsg=httpResponse(resp).message.result;
			 else 
				$scope.conParam.errormsg=httpResponse(resp).message.result;
			$state.go('login')
		},function error(resp){  
			
		});  
	};
	
	//忘记密码提交按钮
	$scope.registerSubmit = function(){
		forgetPasswordService($scope.user);
	};
	
	//重置密码提交按钮
	$scope.reset = function(){
		if($scope.resetParam.password!=$scope.resetParam.repassword){
			$scope.conParam.errormsg='CONFIRM_PASSWORD_SAME';
		} else if ($scope.resetParam.password=='' && $scope.resetParam.repassword==''){
			$scope.conParam.errormsg='RESET_PASSWORD_EMPTY';
		} else if (!passwordReg($scope.resetParam.password)){
			$scope.conParam.errormsg='RESET_PASSWORD_FORMAT';
		} else {
			//console.log(passwordReg($scope.resetParam.password));
			resetPasswordService($scope.resetParam);
		}
	};
	
});

