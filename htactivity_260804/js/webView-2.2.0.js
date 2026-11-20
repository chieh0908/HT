// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/net/webviewEvent/pwrd-sw.js?v=1', {
//         scope: './'
//     }).then(function(registration){
//         registration.update();
//     }).catch((error) => {
//         console.error(error)
//     });
//   }

var wmWebview_eventLisArr={};
function wmWebview_nativeToJs(jsonData,responseCallback){
			
									var json=jsonData;
                                       if(typeof(jsonData)=="string"){
					      					json=JSON.parse(jsonData);
										}
				if(json.type=="openJsConsole"){
					if(!VConsole){
						wmWebview_loadJS("https://static.games.laohu.com/_s/public/vconsole.min.js",function(){
							var vConsole = new VConsole();
						})
					}
					return;
				}

				if(wmWebview_eventLisArr[json.type]&&wmWebview_eventLisArr[json.type].length>0){
					for(var i=0;i<wmWebview_eventLisArr[json.type].length;i++){
						wmWebview_eventLisArr[json.type][i](json.data);
						}
					}
			
				if(responseCallback){
					responseCallback("success");
					}
				}

function wmWebview_loadJS( url, callback ){
					var script = document.createElement('script'),
					fn = callback || function(){};
					script.type = 'text/javascript';
					if(script.readyState){
						script.onreadystatechange = function(){
						if( script.readyState == 'loaded' || script.readyState == 'complete' ){
							script.onreadystatechange = null;
							fn();
							}
						};
		
					}else{
						script.onload = function(){
							fn();
						};
					}
					script.src = url;
					document.getElementsByTagName('head')[0].appendChild(script);
				}
				
var androidcallback=null;
function setupWebViewJavascriptBridgeAndroid(callback) {
						if (window.WebViewJavascriptBridge) {
							callback(WebViewJavascriptBridge)
							} else {
								androidcallback=callback;
								document.addEventListener(
									'WebViewJavascriptBridgeReady'
									, function() {
										androidcallback(WebViewJavascriptBridge)
									},
									false
								);
							}
					}
function setupWebViewJavascriptBridge(callback) {
						if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
						if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
						window.WVJBCallbacks = [callback];
						var WVJBIframe = document.createElement('iframe');
						WVJBIframe.style.display = 'none';
						WVJBIframe.src = 'https://__BRIDGE_LOADED__';
						document.documentElement.appendChild(WVJBIframe);
						setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
					}


//setupWebViewJavascriptBridge()
var uniWebview=(function(){
		var funs={}
		funs.JsToNative=function(method,data,callback){
			var params=data;
			params.funcname=method;
			WebViewJavascriptBridge.callHandler('callWmNative',params,callback);
					}
		return funs;
		})()





var webveiwFuns=(function(){
		var timeleap=0;
		
		var bridgeReadyArr=[];
		var bridgeReady=false;
		
		var u=navigator.userAgent;
		var android =u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
		//android=true;
		var interval=setInterval(retryWebview,500)
		retryWebview();
		function retryWebview(){
				timeleap++;
				if(window.WebViewJavascriptBridge||window.WVJBCallbacks){
					clearInterval(interval);
						initBridge();
				}
				else if(android&&timeleap>=2){
					clearInterval(interval);
					initBridge(true);
						//initBridge();
						
						
					}
				else if(!android&&timeleap>=1){
						clearInterval(interval);
						initBridge();
					}
				
				}
		function bridgeReadyfun(bridge) {
							for(var i=0;i<bridgeReadyArr.length;i++){
								bridgeReadyArr[i]();
								}
								bridgeReady=true;
							 bridge.registerHandler('nativeToJs', function(data, responseCallback) {
								wmWebview_nativeToJs(data,responseCallback);
							 })
						}
		
		function initBridge(android){
				if(android){
					
					setupWebViewJavascriptBridgeAndroid(bridgeReadyfun)
					}
					else{
					setupWebViewJavascriptBridge(bridgeReadyfun)
						}
		}
		
		window.setRefresh=function(){
			document.getElementById("wvsdk-errorbox").style.display="none";
			retryWebview();
			};
		
		
		function initerrorPage(){
			
			if(document.getElementById("wvsdk-errorbox")){
				document.getElementById("wvsdk-errorbox").style.display="block";
				return;
				}
			
			var errorhtml='<style>';
				errorhtml+='.wvsdk-fl{ float:left; width:100%;}';
				errorhtml+='.wvsdk-errorbox{ background:#fff; position:fixed; width:100%; height:100%; top:0;left:0; z-index:100000;}';
				errorhtml+='.wvsdk-errorboxcon{ position:absolute; top:50%;width:3.26em; height:2.8em; left:50%; margin:-1.4em 0 0 -1.63em; text-align:center;}';
				errorhtml+='.wvsdk-errorimg{ width:3.26em; height:2.8em; }';
				errorhtml+='.wvsdk-errorintro{font-size:0.24em; text-align:center; color:#767676;margin-top:0.5em;}';
				errorhtml+='.wvsdk-refreshbtnouter{ font-size:0.28em;margin-top:1em; }';
				errorhtml+='.wvsdk-refreshbtn{ color:#fff; background:#5a90d4; display:inline-block; text-align:center;width:7em; height:2em; line-height:2em}';
				errorhtml+='</style> ';
				errorhtml+='<div id="wvsdk-errorbox" class="wvsdk-errorbox">';
				errorhtml+='<div class="wvsdk-errorboxcon"><img class="wvsdk-errorimg wvsdk-fl" src="pw_act_net_error.png " /><p class="wvsdk-errorintro wvsdk-fl">加载失败，页面异常~</p><p class="wvsdk-fl wvsdk-refreshbtnouter"><a onClick="setRefresh();" 					class="wvsdk-refreshbtn">点击重试</a></p></div></div>';
				var errordiv=document.createElement("div");
				errordiv.innerHTML=errorhtml;
				document.getElementsByTagName("body").item(0).appendChild(errordiv);
				var winw=window.innerWidth;
				var	fonts=Math.floor(100*(winw/750));
				document.getElementById("wvsdk-errorbox").style.fontSize=fonts+"px";
			
			}
		
		var funs={};
		
		funs.ready=function(callback){
			if(bridgeReady){
				callback();
				}
			else{
				bridgeReadyArr.push(callback)
			}
		}
		
		funs.addEventLis=function(type,callback){
			wmWebview_eventLisArr[type]=wmWebview_eventLisArr[type]||[];
			wmWebview_eventLisArr[type].push(callback);
			}
		
		funs.closeWebview=function(callback){
			uniWebview.JsToNative("close",{},function(backdata){
					if(callback)callback(backdata);
					 })
			}
		//ajax
		funs.getDeviceInfo=function(callback){
			uniWebview.JsToNative("getDeviceInfo",{},function(backdata){
				if(callback)callback(backdata);
				 })
		}

		funs.ajax=function(url,data,callback,option){
			//var method=option.method?method:"GET";
			if(!option.method){
				option.method="POST";
				}
			var ajaxData=option;//{url:url,data:data}
				ajaxData.url=url;
				ajaxData.data=data;
				if(option.method=="jsonp"){
						var funcName ="webveiwFuns"+ Date.parse(new Date());
						window[funcName]=function(backdata){
							callback(backdata);
							}
						data.callback=funcName;
						uniWebview.JsToNative("ajax",ajaxData,function(backdata){
							callback(backdata);
							return;
							var myScript=document.createElement("script");
							myScript.innerHTML=backdata;
							var htmlBody=document.getElementsByTagName("body").item(0);
							htmlBody.appendChild(myScript);
							htmlBody.removeChild(myScript);
						})
					}
					else{
						uniWebview.JsToNative("ajax",ajaxData,function(backdata){
							//var jsonstr=JSON.stringify(backdata);
							callback(backdata);
						})
						}
			}
		
		funs.openInBroswer=function(url,callback){
			uniWebview.JsToNative("safariOpen",{type:"openOuter",url:url},function(data){
					 callback(data);
					 })
			}
		
		funs.shareMes=function(url,img,title,content,shareApp,callback){
			 uniWebview.JsToNative("share",{url:url,img:img,title:title,content:content,shareApp:shareApp},function(data){
						callback(data);
						 });
			}
		funs.getUserInfor=function(callback){
			  uniWebview.JsToNative("getUserMes",{},function(data){
						 callback(data);
						 })
			}
		funs.uploadImg=function(url,uploadData,callback,signature){
			
			var uploadImgData={url:url,data:uploadData}
			if(signature){
				uploadImgData.signature=signature;

				}
			
			uniWebview.JsToNative("uploadImg",uploadImgData,function(data){
						callback(data);
						 })
			}
	
		funs.imgPicker=function(callback,uploadData){
			uniWebview.JsToNative("imgPicker",{data:uploadData},function(data){
						 callback(data);
						 })
			}
		
		funs.uploadImgPicker=function(url,uploadData,callback,signature){
			var uploadImgData={url:url,data:uploadData}
			if(signature){
				uploadImgData.signature=signature;
				}
			uniWebview.JsToNative("uploadImgPicker",uploadImgData,function(data){
						callback(data)
						 })
			}
		
		funs.toNativeMes=function(type,data,callback){
			 
			 uniWebview.JsToNative("custom",{type:type,data:data},function(data){
				callback(data)
						 })
			}
			
			
			
		funs.reportMes=function(type,data,callback){
			 
			 uniWebview.JsToNative("custom",{type:"report",data:{"event":type,"value":data}},function(data){
				callback(data)
						 })
			}
		funs.showConsoleBorder=function(){
			 uniWebview.JsToNative("showConsole",{})
			}
		funs.log=function(logmsg){
			 uniWebview.JsToNative("log",{"log":logmsg,"level":"info"})
			}
		funs.setDataBase=function(type,dataOb,callback){
			var dataob={type:type,key:dataOb.name};
			if(type=="insert"||type=="update"){
				if(!dataOb.value)return;
				dataob.value=dataOb.value;
			}
			uniWebview.JsToNative("database",dataob,function(data){
				callback(data)
				})
		}
		funs.clearCookie=function(){
			uniWebview.JsToNative("clearCookie",{},function(data){})
		}
	var videoCanPlay=true;
	funs.canPlayVideo = function (callback) {
		uniWebview.JsToNative("canPlayVideo", {}, function (data) {
			if(String(JSON.parse(data).result.canPlay)=="false")videoCanPlay=false;
			callback(data);
		});
	};
	funs.createVideoPlayer = function (pageData, callback) {
		if(!videoCanPlay)return;
		uniWebview.JsToNative("createVideoPlayer", pageData, function (data) {
			callback(data);
		});
	};
	funs.controlVideoPlayer = function (controlData) {
		if(!videoCanPlay)return;
		uniWebview.JsToNative("controlVideoPlayer",controlData,function (data) {});
	};
	funs.updateWebViewProperty = function (pageData, callback) {
		uniWebview.JsToNative("updateWebViewProperty",pageData,function (data) {
			callback && callback(data);
			});
	};
	funs.toggleWebViewSize = function (callback) {
		uniWebview.JsToNative("getWebViewState", {}, function (data) {
			const scalePercent = JSON.parse(data).result.scalePercent;
			if (scalePercent == 30) {
				uniWebview.JsToNative("updateWebViewProperty",{'data': {'percent': 80, 'canDrag': false }},
				function (res) {
						callback && callback(res);
					});
			} else {
				uniWebview.JsToNative("updateWebViewProperty",{'data': {'percent': 30, 'canDrag': true }},function (res) {
						callback && callback(res);
				});
			}
		});
	};
	funs.getWebViewState = function (callback) {
		uniWebview.JsToNative("getWebViewState", {}, function (data) {
			callback && callback(data);
		});
	};
	funs.closeVideoPlayer = function (pageData, callback) {
		if(!videoCanPlay)return;
		uniWebview.JsToNative("closeVideoPlayer", pageData, function (data) {
			callback(data);
		});
	};

	funs.savePhoto = function (url, callback) {
		uniWebview.JsToNative("savePhoto", {data:{url:url}}, function (data) {
			callback(data);
		});
	};

	funs.screenShots = function (data, callback) {
		if(data.type!="0"&&data.type!="1"){
			alert("type参数不正确！")
			return;
		}
		if(data.type=="1"){
			data.x=data.x||0;
			data.y=data.y||0;
			data.width=data.width||window.innerWidth;
			data.height=data.height||window.innerHeight;
		}
		uniWebview.JsToNative("screenShots",{data:data}, function (data) {
			callback(data);
		});
	};
	funs.openNativeWebview = function (url, callback) {
		uniWebview.JsToNative("openNativeWebview",{data:{url:url}}, function (data) {
			callback(data);
		});
	};

	return funs;
})();