angular.module('2lykUtils', []);

angular.module('2lykUtils')
	.factory('lykConsole', function($log){

		var newInstance = {
			call: call,
			trigger: trigger,

			log: log,
			info: info,
			warn: warn,
			error: error,
			debug: debug
		};

		var statesFn = {
			log: log,
			info: info,
			warn: warn,
			error: error,
			debug: debug
		}

		function call(){
			var state = arguments[0];
			if(angular.isString(state) && statesFn[state]){
				Array.prototype.shift.call(arguments);
			}
			else{
				state = "log";
			}
			return statesFn[state].apply(this, arguments);
		}

		function trigger(){
			if(arguments.length < 2){
				return;
			}
			var state = arguments[0];
			var condition = arguments[1];
			if(condition){
				Array.prototype.splice.call(arguments, 1,1)
				call.apply(this, arguments);
				return true;
			}
			return false;
		}

		function log(){
			//Array.prototype.push.call(arguments, "[lykConsole]");
			$log.log.apply(this, arguments);
		}
		function info(){
			//Array.prototype.push.call(arguments, "[lykConsole]");
			$log.info.apply(this, arguments);
		}
		function warn(){
			//Array.prototype.push.call(arguments, "[lykConsole]");
			$log.warn.apply(this, arguments);
		}
		function error(){
			//Array.prototype.push.call(arguments, "[lykConsole]");
			$log.error.apply(this, arguments);
		}
		function debug(){
			//Array.prototype.push.call(arguments, "[lykConsole]");
			$log.debug.apply(this, arguments);
		}

		return newInstance;

});


angular.module('2lykUtils')
	.provider('lykXhr', function LykXhrProvider() {
  var __apis = {};

  this.routes = function(value) {
		if(value && angular.isObject(value)){
			__apis = value;
			Object.keys(__apis).forEach(
				function(key) {
					if(key == "__apis") return delete __apis[key];
					if(!angular.isObject(__apis[key])) return delete __apis[key];
					if(!angular.isString(__apis[key]["url"])) return delete __apis[key];
					if(!angular.isString(__apis[key]["method"])) return __apis[key]["method"] = "GET";
				}
			);
		}
  };

  this.$get = ["$q", "$http", "lykConsole", function lykXhrFactory($q, $http, lykConsole) {

		var utils = {
			getType: getType,
			getValids: getValids,
			getInvalids: getInvalids,
			getUnit: getUnit,
			isRequired: isRequired
		}

		function validUtilsArgs(objectSchema, key){
			if(errorHandler(!angular.isString(key), '[isRequired]','Argument 2 must be a string.', 'Instead, received: '+ (typeof key)))
				return;
			if(!objectSchema || !angular.isObject(objectSchema)) return;
			if(!angular.isObject(objectSchema[key])) return;
			if(!objectSchema[key].isJoi) return;
			return true;
		}

		function getValids(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key)) return;
			return objectSchema[key]._valids._set;
		}

		function getInvalids(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key)) return;
			return objectSchema[key]._invalids._set;
		}

		function getUnit(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key)) return;
			return objectSchema[key]._unit;
		}

		function getType(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key)) return;
			return objectSchema[key]._type;
		}

		function isRequired(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key)) return;
			return objectSchema[key]._flags.presence == "required";
		}

		function errorHandler(){
			Array.prototype.splice.call(arguments, 1, 0, "[lykXhr] >");
			Array.prototype.unshift.call(arguments, "error");
			return lykConsole.trigger.apply(this, arguments);
		}

		var get = function getConfig(key){
			if(key == "__apis"){
				return getAll();
			}
			return angular.copy(__apis[key]);
		}

		var getAll = function getAllConfig(){
				return angular.copy(__apis);
		}

		var execute = function execute(apiName, customConfig, params){
			customConfig = customConfig || {};
			params = params || {};

			var dfd = $q.defer();
			if(__apis[apiName]){
				var api = __apis[apiName];
				var config = {
					method: api.method,
					url: api.url
				};
				Object.keys(params).forEach(
					function(key){
						var re = new RegExp( '{'+key+'}', 'g');
						config.url = config.url.replace(re, params[key]);
					}
				);
				Object.keys(customConfig).forEach(
					function(key){
						if(key.toLowerCase() != 'method' && key.toLowerCase() != 'url')
							config[key] = customConfig[key];
					}
				);
				$http(config).then(
					function(r){dfd.resolve(r.data)},
					function(e){dfd.reject(e)}
				);
			}
			else{
				var proposals = Object.keys(__apis)
					.filter(function(key){key.indexOf(apiName) != -1});
				var errMessage = '"'+apiName+'" is undefined. ';
				if(!errorHandler(proposals.length > 0 ,'[execute]', errMessage+'Did you mean:', proposals.toString(), '?')){
					errorHandler(true, '[execute]', errMessage);
				}

				dfd.reject({data: errMessage, proposals: proposals});
			}
			return dfd.promise;
		}

		var set = function set(key, value){
			if(errorHandler(!angular.isString(key), '[set]', 'Argument 1 must be a string.', 'Instead, received: '+ (typeof key)))
				return;
			if(errorHandler(key == "__apis", '[set]', 'Argument 1:', '"__apis" is reserved'))
				return;
			if(errorHandler(!angular.isObject(value), '[set]', 'Argument 2 must be an object.', 'Instead, received: '+ (typeof value)))
				return;
			if(errorHandler(!angular.isString(value.url), '[set]', 'Within argument 2, url must be a string', 'Instead, received: '+ (typeof value.url) ))
				return;
			__apis[key] = value;
			return this;
		}

		return {
			get: get,
			getAll: getAll,
			set: set,

			execute: execute,

			utils: utils
		}
  }];
});
