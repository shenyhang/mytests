app.service('httpService',function($http,gobalvariable){
	this.http = function(url,urlfun,method,params,data,headers){
		return $http({  
			 url:gobalvariable.url[url]+"/"+urlfun,           //请求的url路径  
			 method:method,    //GET/DELETE/HEAD/JSONP/POST/PUT  
			 params:params ,   //转为  ?param1=xx1¶m2=xx2的形式  
			 data: data,        //包含了将被当做消息体发送给服务器的数据，通常在POST请求时使用  
			 headers:headers
		});
	};
});