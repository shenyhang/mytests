app.controller('SettingController',function($scope,httpService,$rootScope){
	
	//安全设置请求参数
	$scope.settingReqParam = {};
	//安全设置返回值
	$scope.safeResult={};
	//安全通知返回值
	$scope.safeNoticeResult={};
	//安全设置操作参数
	$scope.variable={
		dialog:false,
		title_msg:'OPEN',
	};
	
	//查询安全设置状态信息接口
	function getSafeInfo(reqParam){
		var header = getLocalToken();
		httpService.http('private','getSafeInfo','get',reqParam,{},header)
		.then(function success(resp){  
			if(httpResponse(resp).success==1)
				$scope.safeResult=httpResponse(resp).message.result[0];
			 else 
				$scope.safeResult=httpResponse(resp).message;
			
		},function error(resp){  
			
		});  
	};
	//安全通知展开按钮
	$scope.safeNotice = function(){
		$scope.variable.dialog = !$scope.variable.dialog;
		if($scope.variable.dialog)
			$scope.variable.title_msg = 'CLOSED';
		else
			$scope.variable.title_msg = 'OPEN';
	};
	
	//查询安全通知信息接口
	function getNoticeInfo(reqParam){
		var header = getLocalToken();
		httpService.http('private','getNoticeInfo','get',reqParam,{},header)
		.then(function success(resp){  
			console.log(resp);	
			if(httpResponse(resp).success==1)
				$scope.safeNoticeResult=httpResponse(resp).message.result;
			else 
				$scope.safeNoticeResult=httpResponse(resp).message;
		},function error(resp){  
			
		});  
	};
	
	//设置安全通知接口
	function setNoticeInfo(reqParam,index){
		var header = getLocalToken();
		httpService.http('private','setNoticeInfo','post',{},reqParam,header)
		.then(function success(resp){
			if(httpResponse(resp).success==1)
				$scope.safeNoticeResult[index].value = reqParam.value;
			else 
				$scope.safeNoticeResult[index].value = reqParam.value;
		},function error(resp){  
			
		});  
	}
	
	//安全通知开关按钮
	$scope.chooseNoticeOpen = function(index,item){
		var param = {
			set_type:item.set_type
		};
		if(item.value=='OPEN')
			param.value='CLOSED';
		else
			param.value='OPEN';
		setNoticeInfo(param,index);
	};
	
	//初始化调用
	(function(){
		getSafeInfo();
		getNoticeInfo();
		$rootScope.getMenuService();
	})();
});

app.controller('BindGoogleController',function($scope,httpService,$rootScope){
	
	//绑定谷歌认证返回值
	$scope.bindgaResult={};
	//请求参数
	$scope.reqParam = {};
	//绑定谷歌认证接口
	function createTfa(reqParam){
		var header = getLocalToken();
		httpService.http('private','createTfa','post',{},reqParam,header)
		.then(function success(resp){ 
			console.log(resp);		
			if(httpResponse(resp).success==1)
				$scope.bindgaResult=httpResponse(resp).message.result;
			else 
				$scope.bindgaResult=httpResponse(resp).message;
			
		},function error(resp){  
			
		});  
	};
	
	//检验谷歌认证是否成功接口
	function checkCreateTfa(reqParam){
		var header = getLocalToken();
		httpService.http('private','checkCreateTfa','post',{},reqParam,header)
		.then(function success(resp){ 
			if(httpResponse(resp).success==1)
				createDialog('success','绑定成功',1500);	
			else 
				createDialog('fail','绑定失败',1500);
		},function error(resp){  
			
		});  
	};
	
	//启用谷歌认证按钮
	$scope.checkCreateTfa = function(){
		checkCreateTfa($scope.reqParam);
	};
	
	
	//初始化调用
	(function(){
		createTfa();
		$rootScope.getMenuService();
	})();
	
});