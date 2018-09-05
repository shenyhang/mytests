app.directive('comparePwd',function(){
    //angular 自定义指令，可上网自行查找
    return{
        require : 'ngModel',
        //scope表示作用域，elem表示使用这个指令的元素对象（这里指第二个密码框），attrs。。。ctrl。。。
        link : function(scope,elem,attrs,ctrl){
            ///写自己的业务逻辑
            //注意这样取值的话，第一密码框的Id值必须要设置且必须与第二个密码框的compare-pwd属性的值相同
            var firstPwdIdObj = "#" + attrs.comparePwd;
            $(elem).add(firstPwdIdObj).on('keyup',function(){
               //手动执行脏检查
                scope.$apply(function(){
                    //$(firstPwdIdObj).val()表示第一个密码框的值。elem.val()表示第二个密码框的值
                    var flag = elem.val() === $(firstPwdIdObj).val();
                    //alert(flag+",--"+elem.val()+",--"+$(firstPwdIdObj).val());
                    ctrl.$setValidity("pwdmatch",flag);//flag,表示是否相等。pwdmatch用于$error时的标识符，注意看页面，$setValidity是require中ngModel的方法！
                });
            });
        }
    }
});
app.controller('registerController',function($scope,httpService,$state){
	//请求参数
	$scope.reqParam = {
		auth_type:'REGISTER'
	};
	//返回值
	$scope.resultParam = {};
	
	//表单参数
	$scope.user = {
		username:'',
		password:'',
		user_type:'NORMAL'
	};
	
	//控制参数
	$scope.conParam = {
		errmsg:false,
		errormsg:'',
	};
	
	//获取图形验证码
	function getAuthImgService(reqParam){
		httpService.http('auth','ask','post',{},reqParam,{})
		.then(function success(resp){  
			$scope.resultParam = httpResponse(resp).message;
			$scope.user.auth_token = httpResponse(resp).message.token;
		},function error(resp){  
			
		});  
	};
	
	//注册提交接口
	function registerService(reqParam){
		httpService.http('token','register','post',{},reqParam,{})
		.then(function success(resp){  
			if(httpResponse(resp).success==1){
				$scope.conParam.errmsg=true;
				$scope.conParam.errormsg=httpResponse(resp).message;
				$state.go('login');
			} else {
				$scope.conParam.errmsg=true;
				$scope.conParam.errormsg=httpResponse(resp).message;
			}
		},function error(resp){  
			
		});  
	};
	
	//图形验证码点击按钮
	$scope.reflesh = function(){
		getAuthImgService($scope.reqParam);
	};
	
	//注册提交按钮
	$scope.registerSubmit = function(){
		registerService($scope.user);
	};
	
	//初始化调用
	(function(){
		getAuthImgService($scope.reqParam);
	})();
	
});

