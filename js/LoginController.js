
app.controller('LoginController',function($scope,httpService,$state,$rootScope){
	//请求参数
	$scope.reqParam = {
		auth_type:'LOGIN'
	};
	//返回值
	$scope.resultParam = {};
	$scope.auth_token="";
	$scope.prama={
		email:""
	};
	//表单参数
	$scope.userInof = {
		username:'',
		password:'',
		auth_token:''
	};
	
	//控制参数
	$scope.conParam = {
		errmsg:false,
		errormsg:'',
		ga:false
	};
	
	//获取图形验证码
	function getAuthImgService(reqParam){
		httpService.http('auth','ask','post',{},reqParam,{},{})
		.then(function success(resp){  
			$scope.resultParam = httpResponse(resp).message;
			$scope.auth_token = httpResponse(resp).message.token;
		},function error(resp){  
			
		});  
	};
	
	//校验用户是否需要谷歌认证
	function checkGaService(reqParam){
		httpService.http('token','checkGa','get',reqParam,{},{})
		.then(function success(resp){ 
			if(httpResponse(resp).success==1 && httpResponse(resp).message.result=='SUC_NEED_GOOGLE_AUTH')
				$scope.conParam.ga = true;
			else
				$scope.conParam.ga = false;
		},function error(resp){  
		});  
	};
	
	//登录提交接口
	function loginService(reqParam){
		httpService.http('token','login','post',{},reqParam,{})
		.then(function success(resp){  
			if(httpResponse(resp).success==1){
				$scope.conParam.errmsg=true;
				$scope.conParam.errormsg='SUB_LOGIN';
				window.localStorage.setItem('dams_token',httpResponse(resp).message.user_token);
				$rootScope.getMenuService()
					.then(function success(resp){  
						if(httpResponse(resp)!=undefined && httpResponse(resp).success==1){
							$rootScope.menus = httpResponse(resp).message.result;
							for(var i=0;i<$rootScope.menus.length;i++){
								if($rootScope.menus[i]['url']=='exasset'||$rootScope.menus[i]['url']=='company_asset'){
									$state.go($rootScope.menus[i]['url']);
									break;
								}
							}	
						}
					},function error(resp){  
						
					});
				
			} else {
				$scope.conParam.errmsg=true;
				$scope.conParam.errormsg=httpResponse(resp).message;
				window.localStorage.removeItem('dams_token');
			}
		},function error(resp){  
			
		});  
	};
	
	//点击图形验证码
	$scope.reflesh = function(){
		getAuthImgService($scope.reqParam);
	};
	
	//登录提交按钮
	$scope.loginSubmit = function(){
		if($scope.prama.email==undefined  || $scope.prama.email==null || $scope.prama.email==''){
			$scope.conParam.errmsg=true;
			$scope.conParam.errormsg='USERNAME_EMPTY';
		}else if($scope.userInof.password==undefined  || $scope.userInof.password==null || $scope.userInof.password==''){
			$scope.conParam.errmsg=true;
			$scope.conParam.errormsg='PASSWORD_EMPTY';
		}else if($scope.userInof.auth_code==undefined  || $scope.userInof.auth_code==null || $scope.userInof.auth_code==''){
			$scope.conParam.errmsg=true;
			$scope.conParam.errormsg='AUTH_EMPTY';
		}else{
			$scope.userInof.username = $scope.prama.email;
			$scope.userInof.auth_token = $scope.auth_token;
			loginService($scope.userInof);
		}
	};
	
	//回车事件
	$scope.enterEvent = function(event){
		var keycode = window.event?event.keyCode:event.which;
		if(keycode==13){
			if($scope.prama.email==undefined  || $scope.prama.email==null || $scope.prama.email==''){
				$scope.conParam.errmsg=true;
				$scope.conParam.errormsg='USERNAME_EMPTY';
			}else if($scope.userInof.password==undefined  || $scope.userInof.password==null || $scope.userInof.password==''){
				$scope.conParam.errmsg=true;
				$scope.conParam.errormsg='PASSWORD_EMPTY';
			}else if($scope.userInof.auth_code==undefined  || $scope.userInof.auth_code==null || $scope.userInof.auth_code==''){
				$scope.conParam.errmsg=true;
				$scope.conParam.errormsg='AUTH_EMPTY';
			}else{
				$scope.userInof.username = $scope.prama.email;
				$scope.userInof.auth_token = $scope.auth_token;
				loginService($scope.userInof);
			}
		}
	};
	
	//检验账户是否需要谷歌认证
	$scope.checkGa = function(){
		checkGaService($scope.prama);
	};
	
	//初始化调用
	(function(){
		getAuthImgService($scope.reqParam);
	})()
});


