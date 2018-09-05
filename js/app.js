var app = angular.module('app', ['ui.router','pascalprecht.translate'])
    app.value('gobalvariable',{
		'url':{
			'token':'http://127.0.0.1:8080',
			'private':'http://127.0.0.1:8020',
			'auth':'http://127.0.0.1:8010',
			'public':'http://127.0.0.1:8030',
			'news':'http://127.0.0.1:8090',
		}
	})
	app.config(['$translateProvider',function($translateProvider){
		var lang = window.localStorage.lang || 'zh';
        $translateProvider.translations('en',enjson);
        $translateProvider.translations('zh',zhjson);
		$translateProvider.preferredLanguage(lang);
    }]);
    app.config(function($stateProvider, $urlRouterProvider) {  
		/*路由重定向 $urlRouterProvider:如果没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至 home.html,  
		 *这个页面就是状态名称被声明的地方. */  
		$urlRouterProvider.otherwise('/home');  
		$stateProvider  
		.state('home', {  
			url: '/home',  
			templateUrl: 'home/index.html',  
			controller: 'HomeController'
		})
		.state('home.homepage', {  
			url: '/homepage',  
			templateUrl: 'home/homepage.html',  
			controller: 'HomeController'
		})
		.state('home.labeldetail', {  
			url: 'home/labeldetail/:id/:title',  
			templateUrl: 'label/label-detail.html',  
			controller: 'LabelDetailController'
		})
		.state('home.label', {  
			url: 'home/label/',  
			templateUrl: 'label/label.html',  
			controller: 'LabelController'
		})
		.state('home.audit', {  
			url: 'home/audit',  
			templateUrl: 'audit/audit.html',  
			controller: 'AuditController'
		})
		.state('home.auditdetail', {  
			url: 'home/auditdetail/:id/:title',  
			templateUrl: 'audit/audit_detail.html',  
			controller: 'AuditDetailController'
		})
		.state('home.audited', {  
			url: 'home/audited',  
			templateUrl: 'audit/audited.html',  
			controller: 'AuditedController'
		})
		.state('home.auditeddetail', {  
			url: 'home/auditeddetail/:id/:title',  
			templateUrl: 'audit/audited_detail.html',  
			controller: 'AuditEdDetailController'
		})
		.state('home.exchange', {  
			url: 'home/exchange',  
			templateUrl: 'exchange/exchange.html',  
			controller: 'ExchangeController'
		})
		.state('home.exchangedetail', {  
			url: 'home/exchangedetail/:id/:title',  
			templateUrl: 'exchange/exchange_detail.html',  
			controller: 'ExchangeDetailController'
		})
		.state('home.public', {  
			url: 'home/public',  
			templateUrl: 'public/public.html',  
			controller: 'PublicController'
		})
		.state('home.upload', {  
			url: 'home/upload',  
			templateUrl: 'upload/upload.html',  
			controller: 'UploadController'
		})
		
		.state('home.me', {  
			url: 'home/me',  
			templateUrl: 'me/me_index.html',  
			controller: 'MeController'
		})
		.state('home.wallet', {  
			url: 'home/wallet',  
			templateUrl: 'me/my_wallet.html',  
			controller: 'MyWalletController'
		})
		.state('home.history', {  
			url: 'home/history',  
			templateUrl: 'history/history.html',  
			controller: 'HistoryController'
		})
		
		.state('asset', {  
			url: '/asset',  
			templateUrl: 'asset/asset.html',  
			controller: 'AssetController'
		})
		.state('exasset', {  
			url: '/exasset',  
			templateUrl: 'exasset/exasset.html',  
			controller: 'ExController'
		})
		.state('exasset.assethistory', {  
			url: '/assethistory',  
			templateUrl: 'exasset/exasset_assethistory.html',  
			controller: 'ExAssetHistoryController'
		})
		.state('exasset.asset', {  
			url: '/asset',  
			templateUrl: 'exasset/exasset_asset.html',  
			controller: 'ExAssetController'
		})
		.state('exasset.traderhistory', {  
			url: '/traderhistory',  
			templateUrl: 'exasset/trader_history.html',  
			controller: 'ExTraderHistoryController'
		})
		.state('home.trader', {  
			url: '/trader/:asset_name',  
			templateUrl: 'trader/trader.html',  
			controller: 'TraderController'
		})
		.state('home.traderlist', {  
			url: '/traderlist',  
			templateUrl: 'trader/trader_list.html',  
			controller: 'TraderListController'
		})
		.state('setting', {  
			url: '/setting',  
			templateUrl: 'setting/setting.html',  
			controller: 'SettingController'
		})
		.state('bindga', {  
			url: '/bindga',  
			templateUrl: 'setting/google_auth.html',  
			controller: 'SettingController'
		})
		.state('setfundpassword', {  
			url: '/setfundpassword',  
			templateUrl: 'fundpassword/fund_password.html',  
			controller: 'FundController'
		})
		.state('modifyfundpassword', {  
			url: '/modifyfundpassword',  
			templateUrl: 'fundpassword/modify_fund_password.html',  
			controller: 'FundController'
		})
		.state('resetfundpassword', {  
			url: '/resetfundpassword',  
			templateUrl: 'fundpassword/fund_password_reset.html',  
			controller: 'FundController'
		})
		.state('login', {  
			url: '/login',  
			templateUrl: 'relogin/login.html',  
			controller: 'LoginController'
		})
		.state('modifyloginpsw', {  
			url: '/modifyloginpsw',  
			templateUrl: 'relogin/modify_login_password.html',  
			controller: 'ModifyLoginController'
		})
		.state('resetloginpassword', {  
			url: '/resetloginpassword',  
			templateUrl: 'relogin/login_password_reset.html',  
			controller: 'ModifyLoginController'
		})
		.state('register', {  
			url: '/register',  
			templateUrl: 'relogin/register.html',  
			controller: 'registerController'
		})
		.state('forget', {  
			url: '/forget',  
			templateUrl: 'forgot/forget_password.html',  
			controller: 'ForgetController'
		})
		.state('forgetReset', {  
			url: '/forgetReset',  
			templateUrl: 'forgot/forget_password_reset.html',  
			controller: 'ForgetController'
		})
		.state('company_asset', {  
			url: '/company_asset',  
			templateUrl: 'company/company_asset.html',  
			controller: 'CompanyAssetController'
		})
		.state('company_info', {  
			url: '/company_info',  
			templateUrl: 'company/company_data.html',  
			controller: 'CompanyInfoController'
		})
		.state('hotwallet', {  
			url: '/hotwallet',  
			templateUrl: 'company/company_hot_wallet.html',  
			controller: 'HotWalletController'
		});
		
	});
	app.run(function($rootScope,httpService){
		$rootScope.hrefArr = ['login','register','forget','forgetReset','resetloginpassword','resetfundpassword'];
		$rootScope.bannerFlag = false;
		for(var i=0;i<$rootScope.hrefArr.length;i++){
			if(window.location.href.indexOf($rootScope.hrefArr[i])!=-1)
			{
				$rootScope.bannerFlag = true;
				break;
			}
		}
		if(window.localStorage.getItem('user_info')!=null && window.localStorage.getItem('user_info')!=""){
			$rootScope.user_info = JSON.parse(window.localStorage.getItem('user_info'));
		}
		//获取菜单
		$rootScope.getMenuService = function (){
			var header = getLocalToken();
			return httpService.http('private','getMenu','get',{},{},header)
		};
		//退出按钮
		$rootScope.logout = function(){
			window.localStorage.removeItem('dams_token');
			window.localStorage.removeItem('user_info');
			$rootScope.menus = [];
			window.location.href="http://127.0.0.1/webDAMS/#!/login";
		};
	});