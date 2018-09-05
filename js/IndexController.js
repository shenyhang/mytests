app.controller('IndexController',function($translate,httpService,$state,$scope,$rootScope){
	
	//控制参数
	$scope.conParam = {
		titlemsg:'首页'
	};
	
	//切换语言
	$scope.changeLang=function(langKey){
		$translate.use(langKey);
	};
	
	$scope.tabs = [{'name':'首页','url':'home','img':'homech','class':true,'symbol':'首页'},{'name':'公告','url':'newslist','img':'notice','class':false,'symbol':'公告'},{'name':'我','url':'me','img':'me','class':false,'symbol':'我'}];
	
	//页脚点击
	$scope.chooseFooter = function(index,symbol){
		
		$scope.conParam.titlemsg=symbol;
		var arr = [];
		for(var i=0;i<$scope.tabs.length;i++){
			var item = $scope.tabs[i]; 
			if(index==i){
				arr.push({
					'name':$scope.tabs[i].name,
					'url':$scope.tabs[i].url,
					'img':$scope.tabs[i].img.replace('ch','')+'ch',
					'class':true,
					'symbol':$scope.tabs[i].symbol
				});
			}else{
				var img = $scope.tabs[i].img;
				if($scope.tabs[i].img.indexOf('ch')!=-1){
					img = $scope.tabs[i].img.replace('ch','');
				}
				arr.push({
					'name':$scope.tabs[i].name,
					'url':$scope.tabs[i].url,
					'img':img,
					'class':false,
					'symbol':$scope.tabs[i].symbol
				});
			}
		}
		$scope.tabs = arr;
	};
	

	//初始化
	(function(){
		$rootScope.getMenuService()
			.then(function success(resp){  
				if(httpResponse(resp)!=undefined && httpResponse(resp).success==1){
					$rootScope.menus = httpResponse(resp).message.result;
				}
			},function error(resp){  
				
			});
	})();
});