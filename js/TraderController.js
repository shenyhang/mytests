app.controller('TraderController',function($scope,httpService,$state,$rootScope){
	//控制参数
	$scope.conParam = {
		market:'BTC',
		errormsg:'',
		dialog:false,
		ticker:{},
		symbol:'buy',
		symbolmsg:'买入',
		ordersymbol:'PENDDING',
		menuflag:false,
		klineflag:false,
		tabflag:true
	};
	
	//设置请求参数
	$scope.resetParam = {
		symbol:'buy'
	};
	
	//结果参数
	$scope.result = {
		marketsDecimals:[],
		allmarketsDecimals:[],
		baseMarkets:['BTC','USDT'],
		tickers:[],
		depth:[],
		finishedOrders:[],
		traders:[],
	};
	
	//查询所有市场以及小数位数接口
	function getMarketsDecimalsService(reqParam){
		return new Promise(function(resolve,reject){
			var header = getLocalToken();
			$scope.result.marketsDecimals = [];
			httpService.http('public','getMarketsDecimals','get',reqParam,{},header)
			.then(function success(resp){ 
				if(httpResponse(resp).success==1){
					$scope.result.allmarketsDecimals=httpResponse(resp).message.result;
					for(var j = 0;j<$scope.result.baseMarkets.length;j++){
						for(var i=0;i<httpResponse(resp).message.result.length;i++){
							var item = httpResponse(resp).message.result[i];
							if($scope.result.baseMarkets[j]==item.asset_name.split("_")[1] && $scope.conParam.market==$scope.result.baseMarkets[j]){
								$scope.result.marketsDecimals.push(item);
							}
						}
					}
					resolve();
				}else{ 
					reject();
					$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
				}
			},function error(resp){  
				reject();
			});
		});
	};
	
	//查询所有市场最新行情接口
	function getTickersService(reqParam){
		return new Promise(function(resolve,reject){
			var header = getLocalToken();
			httpService.http('public','get_tickers','get',reqParam,{},header)
			.then(function success(resp){ 
				if(httpResponse(resp).success==1){
					$scope.result.tickers=httpResponse(resp).message.result;
					for(var i=0;i<$scope.result.marketsDecimals.length;i++){
						for(var j=0;j<$scope.result.tickers.length;j++){
							if($scope.result.tickers[j].asset_name==$scope.result.marketsDecimals[i].asset_name){
								$scope.result.marketsDecimals[i].height_24h= $scope.result.tickers[j].height_24h;
								$scope.result.marketsDecimals[i].low_24h= $scope.result.tickers[j].low_24h;
								$scope.result.marketsDecimals[i].sum_24h= $scope.result.tickers[j].sum_24h;
								$scope.result.marketsDecimals[i].amount= $scope.result.tickers[j].amount;
								$scope.result.marketsDecimals[i].price= $scope.result.tickers[j].price;
							}else{
								$scope.result.marketsDecimals[i].height_24h= 0;
								$scope.result.marketsDecimals[i].low_24h= 0;
								$scope.result.marketsDecimals[i].sum_24h= 0;
								$scope.result.marketsDecimals[i].amount= 0;
								$scope.result.marketsDecimals[i].price= 0;
							}
						}
					}
					if($scope.result.tickers.length>0){
						$scope.resetParam.asset_name = $scope.result.tickers[0].asset_name;
						$scope.conParam.ticker= $scope.result.tickers[0];
					}
					resolve();
				}else{ 
					$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
					reject();
				}
			},function error(resp){  
				reject();
			});
		});
	};
	
	//查询某个市场深度接口
	function getDepthService(reqParam){
		return new Promise(function(resolve,reject){
			var header = getLocalToken();
			httpService.http('public','getDepth','get',reqParam,{},header)
			.then(function success(resp){ 
				if(httpResponse(resp).success==1){
					$scope.result.depth=httpResponse(resp).message.result;
					resolve();
				}else{ 
					$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
					reject();
				}
			},function error(resp){  
				reject();
			});
		});
	};
	
	//查询最新成交订单接口
	function getNewFinishedOrderService(reqParam){
		return new Promise(function(resolve,reject){
			var header = getLocalToken();
			httpService.http('public','getNewFinishedOrder','get',reqParam,{},header)
			.then(function success(resp){ 
				if(httpResponse(resp).success==1){
					$scope.result.finishedOrders=httpResponse(resp).message.result;
					resolve();
				}else{ 
					$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
					reject();
				}
			},function error(resp){  
				reject();
			});
		});
	};
	
	//查询某个市场余额接口
	function getBalanceService(reqParam){
		return new Promise(function(resolve,reject){
			var header = getLocalToken();
			httpService.http('private','get_balance','get',reqParam,{},header)
			.then(function success(resp){ 
				if(httpResponse(resp).success==1){
					$scope.result.balance=httpResponse(resp).message.result;
					resolve();
				}else{ 
					$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
					reject();
				}
			},function error(resp){  
				reject();
			});
		});
	};
	
	//查询某个市场订单列表接口
	function getTraderOrderService(reqParam){
		return new Promise(function(resolve,reject){
			var header = getLocalToken();
			httpService.http('private','getTraderOrder','get',reqParam,{},header)
			.then(function success(resp){ 
				if(httpResponse(resp).success==1){
					//$scope.result.traders=httpResponse(resp).message.result;
					resolve(httpResponse(resp).message.result);
				}else{ 
					$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
					reject();
				}
			},function error(resp){  
				reject();
			});
		});
	};
	
	//撤单接口
	function cancleOrderService(reqParam){
		return new Promise(function(resolve,reject){
			var header = getLocalToken();
			httpService.http('private','cancleOrder','post',{},reqParam,header)
			.then(function success(resp){ 
				if(httpResponse(resp).success==1){
					//$scope.result.traders=httpResponse(resp).message.result;
					resolve(httpResponse(resp).message.result);
				}else{ 
					$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
					reject();
				}
			},function error(resp){  
				reject();
			});
		});
	};
	
	//挂单接口
	function createOrderService(reqParam){
		return new Promise(function(resolve,reject){
			var header = getLocalToken();
			httpService.http('private','createOrder','post',{},reqParam,header)
			.then(function success(resp){ 
				if(httpResponse(resp).success==1){
					//$scope.result.traders=httpResponse(resp).message.result;
					resolve(httpResponse(resp).message.result);
				}else{ 
					$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
					reject();
				}
			},function error(resp){  
				reject();
			});
		});
	};
	
	//已完成订单接口
	function getTraderHistoryService(reqParam){
		return new Promise(function(resolve,reject){
			var header = getLocalToken();
			httpService.http('private','getTraderHistory','get',reqParam,{},header)
			.then(function success(resp){ 
				if(httpResponse(resp).success==1){
					//$scope.result.traders=httpResponse(resp).message.result;
					resolve(httpResponse(resp).message.result);
				}else{ 
					$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
					reject();
				}
			},function error(resp){  
				reject();
			});
		});
	};
	
	//已撤单订单接口
	function getTraderCancledService(reqParam){
		return new Promise(function(resolve,reject){
			var header = getLocalToken();
			httpService.http('private','getTraderCancled','get',reqParam,{},header)
			.then(function success(resp){ 
				if(httpResponse(resp).success==1){
					//$scope.result.traders=httpResponse(resp).message.result;
					resolve(httpResponse(resp).message.result);
				}else{ 
					$scope.conParam.errormsg='ERR_SET_FUND_PASSWORD';
					reject();
				}
			},function error(resp){  
				reject();
			});
		});
	};
	
	//点击切换基础交易对
	$scope.chooseBaseMarket = function(e,market){
		$(e.target).addClass('asset_t_a');
		$(e.target).siblings().removeClass('asset_t_a');
		$scope.conParam.market= market;
		$scope.result.marketsDecimals= [];
		var baseMarket = market;
		for(var i=0;i<$scope.result.allmarketsDecimals.length;i++){
			var item = $scope.result.allmarketsDecimals[i];
			if($scope.conParam.market==item.asset_name.split("_")[1]){
				$scope.result.marketsDecimals.push(item);
			}
		}
	};
	
	//切换订单历史按钮
	$scope.ordertab = function(e,symbol){
		$scope.result.traders = [];
		$(e.target).addClass('td-or-tl-cho');
		$(e.target).siblings().removeClass('td-or-tl-cho');
		$scope.conParam.tabflag = false;
		$scope.conParam.ordersymbol = symbol;
		var param = {
				asset_name:$scope.resetParam.asset_name,
				symbol:'buy'
			};
		var traders = [];
		var	sellparam = {
				asset_name:$scope.resetParam.asset_name,
				symbol:'sell'
			};
		if(symbol=='PENDDING'){
			getTraderOrderService(param)
				.then(function(rs){
					traders=rs;
					return getTraderOrderService(sellparam);
				})
				.then(function(rs){
					$scope.result.traders=arrSortOrderTime(traders.concat(rs));
					$scope.$apply();
				},function(err){
					
				});
		}else if(symbol=='FINISHED'){
			getTraderHistoryService(param)
				.then(function(rs){
					traders=rs;
					return getTraderHistoryService(sellparam);
				})
				.then(function(rs){
					$scope.result.traders=arrSortOrderTime(traders.concat(rs));
					$scope.$apply();
				},function(err){
					
				});
		}else if(symbol=='CANCLED'){
			getTraderCancledService(param)
				.then(function(rs){
					traders=rs;
					return getTraderCancledService(sellparam);
				})
				.then(function(rs){
					$scope.result.traders=arrSortOrderTime(traders.concat(rs));
					$scope.$apply();
				},function(err){
					
				});
		}
	};
	
	//挂单接口
	$scope.createOrder = function(){
		createOrderService($scope.resetParam)
			.then(function(rs){
				createDialog('success','挂单成功',1500);
			},function(err){
				createDialog('fail','挂单失败',1500);
			});
	};
	
	//撤单点击按钮
	$scope.cancleOrder = function(item){
		var param ={
			asset_name:item.asset_name,
			symbol:item.symbol,
			order_id:item.orderID
		}
		cancleOrderService(param)
			.then(function(rs){
				$scope.result.traders.remove(item);
				createDialog('success','撤单成功',1500);
			},function(err){
				createDialog('fail','撤单失败',1500);
			});
	};
	
	//选择深度
	$scope.marketdepth = function(item){
		$scope.resetParam.price=item.price;
		$scope.resetParam.amount=item.amount;
		$scope.resetParam.sumAmount=item.price*item.amount;
	};
	
	//选择买单或者卖单
	$scope.chooseSymbol = function(e,symbol){
		$(e.target).addClass('td-or-tl-cho');
		$(e.target).siblings().removeClass('td-or-tl-cho');
		$scope.conParam.tabflag = true;
		$scope.resetParam.symbol=symbol;
		if(symbol=='buy'){
			$scope.conParam.symbolmsg='买入';
			var param = {
					asset_name:$scope.resetParam.asset_name.split('_')[1]
				};
				getBalanceService(param);
		}else{
			$scope.conParam.symbolmsg='卖出';
			var param = {
					asset_name:$scope.resetParam.asset_name.split('_')[0]
				};
			getBalanceService(param);
		}
	};
	
	$scope.marketTicker = function(e,item){
		$scope.result.finishedOrders = [];
		$scope.result.depth = [];
		$scope.conParam.ticker= item;
		$(e.target).addClass('asset_btcch');
		$(e.target).siblings().removeClass('asset_btcch');
		$scope.resetParam.asset_name=item.asset_name;
		$scope.result.traders = [];
		traders = [];
		$scope.conParam.menuflag= false;
		getDepthService($scope.resetParam)
			.then(function(){
				return getNewFinishedOrderService($scope.resetParam);
			})
			.then(function(){
				return isLogin();
			})
			.then(function(){
				var param = $scope.resetParam;
				if($scope.resetParam.symbol=='buy'){
					param =  {
						asset_name:$scope.resetParam.asset_name.split('_')[1]
					};
				}else{
					param =  {
						asset_name:$scope.resetParam.asset_name.split('_')[0]
					};
				}
				return getBalanceService(param);
			})
			.then(function(){
				var param = {
					asset_name:$scope.resetParam.asset_name,
					symbol:'buy'
				};
				return getTraderOrderService(param);
			})
			.then(function(rs){
				traders=rs;
				var param = {
					asset_name:$scope.resetParam.asset_name,
					symbol:'sell'
				};
				return getTraderOrderService(param);
			})
			.then(function(rs){
				$scope.result.traders=arrSortOrderTime(traders.concat(rs));
				$scope.$apply();
			},function(err){
				
			});
	};
	
	//选择深度或者k线
	$scope.klineCheck = function(e,symbol){
		if(symbol=='kline'){
			$scope.conParam.klineflag =true;
			$(e.target).attr('src','images/kline.png');
			$(e.target).siblings().removeClass('td-or-tl-chohh');
		}else{
			$scope.conParam.klineflag =false;
			$(e.target).addClass('td-or-tl-chohh');
			$(e.target).siblings().attr('src','images/kline01.png');
		}
	};
	
	//判断是否登陆了
	function isLogin(){
		return new Promise(function(resolve,reject){
			if(window.localStorage.getItem('dams_token'))
				resolve();
			else
				reject();
		});
	};
	
	//点击按钮图标
	$scope.showMenu = function(){
		$scope.conParam.menuflag = true;
	};
	
	//轮询方法
	function getMarketPromise(){
		var traders = [];
		getMarketsDecimalsService({})
			.then(function(){
				return getTickersService($scope.resetParam);
			})
			.then(function(){
				return getDepthService($scope.resetParam);
			})
			.then(function(){
				return getNewFinishedOrderService($scope.resetParam);
			})
			.then(function(){
				return isLogin();
			})
			.then(function(){
				var param = $scope.resetParam;
				if($scope.resetParam.symbol=='buy'){
					param =  {
						asset_name:$scope.resetParam.asset_name.split('_')[1]
					};
				}else{
					param =  {
						asset_name:$scope.resetParam.asset_name.split('_')[0]
					};
				}
				return getBalanceService(param);
			})
			.then(function(){
				var param = {
					asset_name:$scope.resetParam.asset_name,
					symbol:'buy'
				};
				return getTraderOrderService(param);
			})
			.then(function(rs){
				traders=rs;
				var param = {
					asset_name:$scope.resetParam.asset_name,
					symbol:'sell'
				};
				return getTraderOrderService(param);
			})
			.then(function(rs){
				$scope.result.traders=arrSortOrderTime(traders.concat(rs));
				$scope.$apply();
				setTimeout(function(){
					getMarketPromise();
				},1000);
			},function(err){
				setTimeout(function(){
					getMarketPromise();
				},1000);
			});
	};
	
	//初始化
	(function(){
		var traders = [];
			getMarketPromise();
			
		//检查用户是否登陆
		var token = window.localStorage.getItem('dams_token');
			if(token==null || token==''){
				$('.as-hide').css({display:'block'});
				$('.as-dialog-d').css({display:'block'});
			}else{
				$('.as-hide').css({display:'none'});
				$('.as-dialog-d').css({display:'none'});
			}
		//检查token
		$rootScope.getMenuService();
	})();
	
});