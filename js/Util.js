/**工具类*/

Array.prototype.remove = function(val) { 
	var index = this.indexOf(val); 
	if (index > -1) { 
	this.splice(index, 1); 
	} 
};

/**
*@description 生成遮罩层
*/
var hideDialog = {
	createHide:function createHide(){
		return $('<div id="hide-dialog" class="hide-dialog"></div>');
	},
	show:function(){
		$('body').append(this.createHide());
	},
	hide:function(){
		$('#hide-dialog').remove();
	}
};

//数组排序(降序)
function arrSortOrderTime(arr){
	return arr.sort(function(a, b) {
		if (a["time"] > b["time"]) {
			return 1;
		} else {
			return - 1;
		}
	});
}

/**
*@description 监听文档加载事件
*/

function loginURl(){
	var hrefArr = ['login','register','forget','forgetReset','resetloginpassword','resetfundpassword','home'];
	var href = window.location.href;
	var token = window.localStorage.getItem('dams_token');
	if(token==null || token==''){
		$("#asset-center").css({display:'none'});
		$("#user-center").css({display:'none'});
		$("#safe-center").css({display:'none'});
		$("#logout").css({display:'none'});
		//window.location.href="http://127.0.0.1/webDAMS/#!/login";
	}else{
		$("#asset-center").css({display:'block'});
		$("#user-center").css({display:'block'});
		$("#safe-center").css({display:'block'});
		$("#logout").css({display:'block'});
	}
};

/**
*@description 处理http请求返回结果
*/
function httpResponse(result){
	var hrefArr = ['login','register','forget','forgetReset','resetloginpassword','resetfundpassword'];
	if(result.data.status.message=='ERR_USERTOKEN_VERIFY'){
		window.localStorage.removeItem('dams_token');
		window.localStorage.removeItem('user_info');
		var flag = true;
		for(var i=0;i<hrefArr.length;i++){
			if(window.location.href.indexOf(hrefArr[i])!=-1)
			{
				flag= false;
				break;
			}
		}
		if(flag)
			window.location.href="http://127.0.0.1/webDAMS/#!/login";
		return;
	}
	var rs = {
		message:result.data.status.message,
		success:result.data.status.success
	};
	return rs
}

/**
*@description 密码校验
*/
function passwordReg(password){
	var reg = /^[0-9A-Za-z]{6,12}$/
	if(password.match(reg)){
		return true;
	} else {
		return false;
	}
};

/**
*@description 获取本地token
*/
function getLocalToken(){
	var header = {
		'x-access-token':window.localStorage.getItem('dams_token')
	}
	return header;
};

/**
*@description 获取本地token
*/
function msgDialog(msg,time){
	var html = $('<div id="msg-show" class="msg-show">'+msg+'</div>');
	$('body').append(html);
	setTimeout(function(){
		$("#msg-show").fadeOut(500);
		$("#msg-show").remove();
	},time);
};


/**
*@description 获取本地token
*/
function createDialog(symbol,msg,time){
	var imgsrc ="";
	if(symbol=='success')
		imgsrc="images/success.png";
	else
		imgsrc="images/fail.png";
	var html = $('<div id="cm-dialog" class="cm-dialog"><span>'+msg+'</span></div>');
	$('body').append(html);
	setTimeout(function(){
		$("#cm-dialog").fadeOut(500);
		$("#cm-dialog").remove();
	},time);
};


