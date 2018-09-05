app.controller('CompanyInfoController',function($scope,httpService,$state,$rootScope){
	
	//控制参数
	$scope.conParam = {
		status:false,
		subbtn:true,
		error:false,
		apibtn:false
	};
	
	//设置请求参数
	$scope.resetParam = {};
	
	//绑定地址请求参数
	$scope.bindParam = {};
	
	//结果参数
	$scope.result = {
		companyInfo:{},
		apiInfo:{}
	};
	
	//查询企业信息接口
	function getCompanyInfoService(reqParam){
		var header = getLocalToken();
		httpService.http('private','getCompanyInfo','get',reqParam,{},header)
		.then(function success(resp){  
			if(httpResponse(resp).success==1){
				if(httpResponse(resp).message.result.length==1){
					$scope.result.companyInfo = httpResponse(resp).message.result[0];
					$scope.conParam.status = true;
					$scope.conParam.subbtn = false;
				}else{
					$scope.conParam.status = false;
					$scope.conParam.subbtn = true;
				}
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
			}
		},function error(resp){  
			
		});
	};
	
	//企业信息提交接口
	function saveCompanyInfoService(reqParam){
		var header = getLocalToken();
		httpService.http('private','saveCompanyInfo','post',{},reqParam,header)
		.then(function success(resp){  
			if(httpResponse(resp).success==1){
				getCompanyInfoService({});
			}else{ 
				$scope.conParam.errormsg=httpResponse(resp).message;
				$scope.conParam.error=true;
			}
		},function error(resp){  
			
		});
	};
	
	//查询企业apikey接口
	function getAPIKeyService(reqParam){
		var header = getLocalToken();
		httpService.http('private','getAPIKey','get',reqParam,{},header)
		.then(function success(resp){  
			if(httpResponse(resp).success==1){
				if(httpResponse(resp).message.result.length==1){
					$scope.result.apiInfo = httpResponse(resp).message.result[0];
					$scope.conParam.status = false;
					$scope.conParam.subbtn = false;
				}else{
					$scope.conParam.status = true;
					$scope.conParam.subbtn = false;
				}
				$scope.conParam.apibtn = false;
			}else{ 
				$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
				$scope.conParam.apibtn = true;
			}
		},function error(resp){  
			
		});
	};
	
	//申请aipkey
	function createAPIKeyService(reqParam){
		var header = getLocalToken();
		httpService.http('private','createAPIKey','post',{},reqParam,header)
		.then(function success(resp){  
			if(httpResponse(resp).success==1){
				createDialog('success','创建apikey成功',1500);
				getAPIKeyService({});
			}else{ 
				createDialog('fail','创建apikey失败',1500);
			}
		},function error(resp){  
			
		});
	};
	
	//企业信息提交按钮
	$scope.submitCompany = function(){
		$scope.result.companyInfo.Id_img_face = 'url';
		$scope.result.companyInfo.id_img_back = 'url';
		$scope.result.companyInfo.id_img_frond = 'url';
		$scope.result.companyInfo.company_img = 'url';
		if($scope.result.companyInfo.company_name==null || $scope.result.companyInfo.company_name==undefined || $scope.result.companyInfo.company_name==''){
			$scope.conParam.error=true;
			$scope.conParam.errormsg='公司名称不能为空';
		}else if($scope.result.companyInfo.company_address==null || $scope.result.companyInfo.company_address==undefined || $scope.result.companyInfo.company_address==''){
			$scope.conParam.error=true;
			$scope.conParam.errormsg='公司地址不能为空';
		}else if($scope.result.companyInfo.company_code==null || $scope.result.companyInfo.company_code==undefined || $scope.result.companyInfo.company_code==''){
			$scope.conParam.error=true;
			$scope.conParam.errormsg='组织机构代码不能为空';
		}else if($scope.result.companyInfo.corporation_name==null || $scope.result.companyInfo.corporation_name==undefined || $scope.result.companyInfo.corporation_name==''){
			$scope.conParam.error=true;
			$scope.conParam.errormsg='企业法人不能为空';
		}else if($scope.result.companyInfo.corporation_id==null || $scope.result.companyInfo.corporation_id==undefined || $scope.result.companyInfo.corporation_id==''){
			$scope.conParam.error=true;
			$scope.conParam.errormsg='法人身份证号码不能为空';
		}else if($scope.result.companyInfo.corporation_mobile==null || $scope.result.companyInfo.corporation_mobile==undefined || $scope.result.companyInfo.corporation_mobile==''){
			$scope.conParam.error=true;
			$scope.conParam.errormsg='法人联系方式不能为空';
		}else if($scope.result.companyInfo.real_man_name==null || $scope.result.companyInfo.real_man_name==undefined || $scope.result.companyInfo.real_man_name==''){
			$scope.conParam.error=true;
			$scope.conParam.errormsg='实际运营人不能为空';
		}else if($scope.result.companyInfo.real_man_mobile==null || $scope.result.companyInfo.real_man_mobile==undefined || $scope.result.companyInfo.real_man_mobile==''){
			$scope.conParam.error=true;
			$scope.conParam.errormsg='实际运营人联系方式不能为空';
		}else if($scope.result.companyInfo.id_img_face==null || $scope.result.companyInfo.id_img_face==undefined || $scope.result.companyInfo.id_img_face==''){
			$scope.conParam.error=true;
			$scope.conParam.errormsg='法人身份证正面照不能为空';
		}else if($scope.result.companyInfo.id_img_back==null || $scope.result.companyInfo.id_img_back==undefined || $scope.result.companyInfo.id_img_back==''){
			$scope.conParam.error=true;
			$scope.conParam.errormsg='法人身份证反面照不能为空';
		}else if($scope.result.companyInfo.id_img_frond==null || $scope.result.companyInfo.id_img_frond==undefined || $scope.result.companyInfo.id_img_frond==''){
			$scope.conParam.error=true;
			$scope.conParam.errormsg='法人手持身份证照不能为空';
		}else if($scope.result.companyInfo.company_img==null || $scope.result.companyInfo.company_img==undefined || $scope.result.companyInfo.company_img==''){
			$scope.conParam.error=true;
			$scope.conParam.errormsg='企业营业执照不能为空';
		}else{
			
			$scope.result.companyInfo.company_img = '';
			saveCompanyInfoService($scope.result.companyInfo);
		}
		
	};
	
	//申请api
	$scope.allowApikey = function(){
		createAPIKeyService({});
	};
	
	//初始化
	(function(){
		getCompanyInfoService({});
		getAPIKeyService({});
		//$rootScope.getMenuService();
	})();
	
});