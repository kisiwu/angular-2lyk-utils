/**
* @ngdoc module
* @module 2lykUtils
* @description A bunch of utils for AngularJS 1
*/
angular.module('2lykUtils', []);

/**
 * @ngdoc factory
 * @name 2lykUtils.lykConsole
 * @description Service to display messages in console
 */
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

		/**
   * @memberof 2lykUtils.lykConsole
   * @function call
   * @description Display message in console.
   * @param {string} state - log, info, warn, error or debug.
	 * @param {mixed} ... values
   */
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

	/**
   * @memberof 2lykUtils.lykConsole
   * @function trigger
   * @description Display message in console if a condition is true.
   * @param {string} state - log, info, warn, error or debug.
	 * @param {boolean} condition
	 * @param {mixed} ... values
	 * @returns {boolean} true if condition is.
   */
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

		/**
	   * @memberof 2lykUtils.lykConsole
	   * @function log
	   * @description Display log in console.
		 * @param {mixed} ... values
	   */
		function log(){
			//Array.prototype.push.call(arguments, "[lykConsole]");
			$log.log.apply(this, arguments);
		}

		/**
	   * @memberof 2lykUtils.lykConsole
	   * @function info
	   * @description Display info in console.
		 * @param {mixed} ... values
	   */
		function info(){
			//Array.prototype.push.call(arguments, "[lykConsole]");
			$log.info.apply(this, arguments);
		}

		/**
	   * @memberof 2lykUtils.lykConsole
	   * @function warn
	   * @description Display warning in console.
		 * @param {mixed} ... values
	   */
		function warn(){
			//Array.prototype.push.call(arguments, "[lykConsole]");
			$log.warn.apply(this, arguments);
		}

		/**
	   * @memberof 2lykUtils.lykConsole
	   * @function error
	   * @description Display error in console.
		 * @param {mixed} ... values
	   */
		function error(){
			//Array.prototype.push.call(arguments, "[lykConsole]");
			$log.error.apply(this, arguments);
		}

		/**
	   * @memberof 2lykUtils.lykConsole
	   * @function debug
	   * @description Display debug in console.
		 * @param {mixed} ... values
	   */
		function debug(){
			//Array.prototype.push.call(arguments, "[lykConsole]");
			$log.debug.apply(this, arguments);
		}

		return newInstance;

});

 /**
 * @ngdoc provider
 * @name 2lykUtils.lykXhrProvider
 * @description
 *  configuration for service lykXhr
 */
angular.module('2lykUtils')
	.provider('lykXhr', function LykXhrProvider() {
  var __apis = {};

		/**
     * @memberof 2lykUtils.lykXhrProvider
     * @function routes
		 * @description
		 *   Register a collection of routes. The collection is an object with keys as route names and values as configs (see https://docs.angularjs.org/api/ng/service/$http for config)
     * @param {object} collection - key: {string}, value: {object}
     * @example
     *  app.config(function(lykXhrProvider) {
     *    lykXhrProvider.routes({
     *      "products:list": {
     *        url: "http://api.monsite.com/products",
		 *        method: "GET"
     *      },
		 *      "products:get": {
     *        url: "http://api.monsite.com/products/{id}",
		 *        method: "GET"
     *      },
		 *      ...
     *    });
     *  });
     */
  this.routes = function(collection) {
		if(collection && angular.isObject(collection)){
			__apis = collection;
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

	/**
	* @ngdoc factory
	* @name 2lykUtils.lykXhr
	* @description
	*  Service to quickly make http requests
	*/
  this.$get = ["$q", "$http", "lykConsole", function lykXhrFactory($q, $http, lykConsole) {

		function errorHandler(){
			Array.prototype.splice.call(arguments, 1, 0, "[lykXhr] >");
			Array.prototype.unshift.call(arguments, "error");
			return lykConsole.trigger.apply(this, arguments);
		}

		function buildConfig(apiName, customConfig, params){
			customConfig = customConfig || {};
			params = params || {};
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
			return config;
		}

		/**
     * @memberof 2lykUtils.lykXhr
     * @function get
		 * @description
		 *   Get route config from registered collection
     * @param {string} name - route name
		 * @return {object} route configuration
     */
		var get = function getConfig(key){
			if(key == "__apis"){
				return getAll();
			}
			return angular.copy(__apis[key]);
		}

		/**
     * @memberof 2lykUtils.lykXhr
     * @function getAll
		 * @description
		 *   Get registered collection
		 * @return {object} collection
     */
		var getAll = function getAllConfig(){
				return angular.copy(__apis);
		}

		/**
     * @memberof 2lykUtils.lykXhr
     * @function execute
		 * @description
		 *   Execute a request. The `params` argument allow us to change elements in the url to use.
		 *   For example, if the url in your collection's route config is like `http://api.monsite.com/products/{id}`,
		 *   you want to replace `{id}` by the product's id when you make the request (example: `A1234`).
		 *   You can do so by sending `{id: "A1234"}` as the `params` argument.
		 * @param {string} name - route name
		 * @param {object} config - add more config (see $http(config))
		 * @param {object} params - replace elements in url with another value
		 * @example
		 *  app.config(function(lykXhrProvider) {
     *    lykXhrProvider.routes({
		 *      ...
		 *      "products:get": {
     *        url: "http://api.monsite.com/products/{id}",
		 *        method: "GET"
     *      },
		 *      ...
     *    });
     *  });
		 *  app.controller("ProductDetailsCtrl",function($scope, lykConsole, lykXhr) {
		 *    $scope.item = {};
     *    lykXhr.execute("products:get", null, {id: "A1234"})
		 *      .then(
		 *        item => {$scope.item = item},
		 *        e => lykConsole.error(e.status)
	   *      );
     *  });
		 * @return {object} promise
     */
		var execute = function execute(apiName, customConfig, params){
			var dfd = $q.defer();
			if(__apis[apiName]){
				$http(buildConfig(apiName, customConfig, params)).then(
					function(r){dfd.resolve(r.data)},
					function(e){dfd.reject(e)}
				);
			}
			else{
				var proposals = Object.keys(__apis)
					.filter(function(key){return key.indexOf(apiName) != -1});
				var errMessage = '"'+apiName+'" is undefined. ';
				if(!errorHandler(proposals.length > 0 ,'[execute]', errMessage+'Did you mean:', proposals.join(', '), '?')){
					errorHandler(true, '[execute]', errMessage);
				}

				dfd.reject({data: errMessage, proposals: proposals});
			}
			return dfd.promise;
		}

		/**
     * @memberof 2lykUtils.lykXhr
     * @function set
		 * @description
		 *   Register a new route or change the config of an already registered route in the collection.
     * @param {string} name - route name
		 * @param {object} config - config
		 * @return {object} this
     */
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

			buildConfig: buildConfig
		}
  }];
});



/**
 * @ngdoc factory
 * @name 2lykUtils.JoiSchemaUtils
 */
angular.module('2lykUtils')
	.factory('JoiSchemaUtils', function(lykConsole){

		var newInstance = {
			getValids: getValids,
			getInvalids: getInvalids,
			getUnit: getUnit,
			getType: getType,
			isRequired: isRequired
		};

		function errorHandler(){
			Array.prototype.splice.call(arguments, 1, 0, "[JoiSchemaUtils] >");
			Array.prototype.unshift.call(arguments, "error");
			return lykConsole.trigger.apply(this, arguments);
		}

		function validUtilsArgs(objectSchema, key, methodName){
			if(errorHandler(!angular.isString(key), methodName,'Argument 2 must be a string.', 'Instead, received: '+ (typeof key)))
				return;
			if(!objectSchema || !angular.isObject(objectSchema)) return;
			if(!angular.isObject(objectSchema[key])) return;
			if(!objectSchema[key].isJoi) return;
			return true;
		}

		/**
     * @memberof 2lykUtils.JoiSchemaUtils
     * @function getValids
     * @param {object} object
		 * @param {string} key - key
		 * @return {Array|undefined} undefined if object[key] is not a Joi schema object
     */
		function getValids(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key, '[getValids]')) return;
			return objectSchema[key]._valids._set;
		}

		/**
     * @memberof 2lykUtils.JoiSchemaUtils
     * @function getInvalids
     * @param {object} object
		 * @param {string} key - key
		 * @return {Array|undefined} undefined if object[key] is not a Joi schema object
     */
		function getInvalids(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key, '[getInvalids]')) return;
			return objectSchema[key]._invalids._set;
		}

		/**
     * @memberof 2lykUtils.JoiSchemaUtils
     * @function getUnit
     * @param {object} object
		 * @param {string} key - key
		 * @return {string|undefined} undefined if object[key] is not a Joi schema object
     */
		function getUnit(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key, '[getUnit]')) return;
			return objectSchema[key]._unit;
		}

		/**
     * @memberof 2lykUtils.JoiSchemaUtils
     * @function getType
     * @param {object} object
		 * @param {string} key - key
		 * @return {string|undefined} undefined if object[key] is not a Joi schema object
     */
		function getType(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key, '[getType]')) return;
			return objectSchema[key]._type;
		}

		/**
     * @memberof 2lykUtils.JoiSchemaUtils
     * @function isRequired
     * @param {object} object
		 * @param {string} key - key
		 * @return {boolean|undefined} undefined if object[key] is not a Joi schema object
     */
		function isRequired(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key, '[isRequired]')) return;
			return objectSchema[key]._flags.presence == "required";
		}

		return newInstance;
});


/**
 * @ngdoc factory
 * @name 2lykUtils.lykPropertyAccess
 * @description Service to access properties
 */
angular.module('2lykUtils')
	.factory('lykPropertyAccess', function(lykConsole, $q){

		var newInstance = {
			split: split,

			isReadable: isReadable,
			getValue: getValue,
			setValue: setValue,
			getType: getType,

			async: {
				getValue: getValueAsync,
				setValue: setValueAsync,
				getType: getTypeAsync,
			}
		}

		var asnc = {

		}

		function errorHandler(){
			Array.prototype.splice.call(arguments, 1, 0, "[lykPropertyAccess] >");
			Array.prototype.unshift.call(arguments, "error");
			return lykConsole.trigger.apply(this, arguments);
		}

		function validUtilsArgs(token, object, expression){
			if(errorHandler(!angular.isObject(object) && !angular.isArray(object), token, 'Argument 1 must be an object or an array.', 'Instead, received: '+ (typeof object)))
				return;
			if(errorHandler(!angular.isString(expression), token, 'Argument 2 must be a string.', 'Instead, received: '+ (typeof expression)))
				return;

			return true;
		}

		function getTypeAsync(object, expression){
			return __doAsync(getType, object, expression);
		}

		function getValueAsync(object, expression){
			return __doAsync(getValue, object, expression);
		}

		function setValueAsync(object, expression, newValue){
			return __doAsync(setValue, object, expression, newValue);
		}

		function getType(object, expression){
			var value = getValue(object, expression);
			var retour = "";
			if( Object.prototype.toString.call( value ) === '[object Array]' ) {
				retour = 'array';
			}
			else{
				retour = typeof value;
			}
			return retour;
		}

		/**
     * @memberof 2lykUtils.lykPropertyAccess
     * @function getValue
     * @param {object} object
		 * @param {string} propertyPath
		 * @return {mixed} value
     */
		function getValue(object, expression){
			if(!validUtilsArgs("[getValue]", object, expression))
				return;
			return __access(object, expression).value;
		}

		/**
     * @memberof 2lykUtils.lykPropertyAccess
     * @function setValue
     * @param {object} object
		 * @param {string} propertyPath
		 * @param {mixed} newValue
     */
		function setValue(object, expression, newValue){
			if(!validUtilsArgs("[setValue]", object, expression))
				return;
			var accessReturn = __access(object, expression);
			if(accessReturn.isReadable){
				accessReturn.previous[accessReturn.lastKey] = newValue;
			}
			return;
		}

		/**
     * @memberof 2lykUtils.lykPropertyAccess
     * @function isReadable
     * @param {object} object
		 * @param {string} propertyPath
		 * @return {boolean}
     */
		function isReadable(object, expression){
			if(!validUtilsArgs("[isReadable]", object, expression))
				return;
			return __access(object, expression).isReadable;
		}

		function __access(object, expression){
			var mapping = split(expression);
			var value = object;
			var previous = value;
			var lastKey;
			var i = 0;
			while(i < mapping.length){
				var key = mapping[i];
				lastKey = key;
				previous = value;
				value = value[key];
				if((!value || !angular.isObject(value)) && i < mapping.length-1)
					break;
				i++;
			}
			var isReadable = i >= mapping.length;
			return {isReadable: isReadable, value: value, data: object, previous: previous, lastKey: lastKey};
		}

		function __doAsync(fn, object, expression, other){
			return $q(function(res, rej){
				var data = fn(object, expression, other);
				return res(data);
			});
		}

		function split(expression){
			expression = expression.trim();
			if(expression.indexOf('.') > -1){
				return expression.split('.');
			}
			if(expression.startsWith("[") && expression.endsWith("]")){
				expression = expression.substring(1, expression.length-1);
				return expression.split(/[\[\]]+/);
			}
			return expression.split('.');
		}

		return newInstance;
});

/**
 * @ngdoc factory
 * @name 2lykUtils.lykTmpFiles
 * @description Keep files temporarily
 */
angular.module('2lykUtils')
.factory("lykTmp", function(lykXhr, $http, $q, $interval){

	var newInstance = {
		get: get
	};

	/**
   * Keep responses in the service so we don't call the API
   * every time.
   */
   var responses = {};

	 var defaultTLD = "[tmp]";

	 function cleanAll(){
	 }

	 /**
	 * @param {object} ncp - {name: '...', config: {...}, params: {...}} (see lykXhr.execute)
	 * @param {string} tld - top-level domain
	 * @returns {boolean} bool - true if response saved
	 */
	 function isSaved(ncp, tldName){

	 }

	 /**
	 * @param {object} ncp - {name: '...', config: {...}, params: {...}} (see lykXhr.execute)
	 * @param {string} tld - top-level domain
	 * @returns {object} promise
	 */
	 function force(ncp, tldName){
	 }

	 /**
	 * @param {object} ncp - {name: '...', config: {...}, params: {...}} (see lykXhr.execute)
	 * @param {string} tld - top-level domain
	 * @returns {object} promise
	 */
	 function get(ncp, tldName){
		 return $q(function(res, rej){
			 tldName = tldName || defaultTLD;
			 var config = lykXhr.buildConfig(ncp.name, ncp.config, ncp.params);
			 var tld = responses[tldName];
			 var domainName = config.method ? config.method.toUpperCase() : "GET";
			 var responseName = config.url;
			 var domain;
       if(tld && tld[domainName] && tld[domainName][responseName]){
				 domain = tld[domainName];
				 var response = domain[responseName];
         if(!response.value || (response.value && response.value.$$state.status == 2) ){
					 console.warn("another try to retrieve");
           if(response.try < 3){
             response.try++;
           }
           else{
             return rej(response);
           }
         }
         else{
           if(response.expiredAt && response.expiredAt.getTime() > (new Date()).getTime()){
						 console.warn("get from tmp:", tldName, response);
             return __doWaitAndRespond(response.value, res, rej);
           }
         }
       }
			 else{
				 if(!tld){
					 responses[tldName] = {};
					 tld = responses[tldName];
				 }
				 if(!tld[domainName]){
					 tld[domainName] = {};
				 }
				 domain = tld[domainName];
			 }
			 var nd = new Date();
			 nd.setSeconds(nd.getSeconds() + 5 + 60);
			 if(!domain[responseName]){
				 domain[responseName] = {
					 try: 1
				 };
			 }
			 domain[responseName].expiredAt = nd;
       domain[responseName].value = $http(config).then(
         function(r){
					 console.debug("from API");
           /*domain[responseName].value = r;
           res(domain[responseName].value);*/
					 return r;
         },
         function(e){
           //rej(e);
					 return e;
         }
       );

			 __doWaitAndRespond(domain[responseName].value, res, rej);

			 /*var notified = false;
			 var i = total = 50;

			 var interval = $interval(function(){
				 if(domain[responseName].value.$$state.status == 0){
					 console.debug("interval", i);
				 }
				 console.log(i);
				 if(domain[responseName].value.$$state.status != 0 && !notified){
					 notified = true;
					 var resp = domain[responseName].value.$$state.value;
					 cancelInterval(i, total);
					 if(domain[responseName].value.$$state.status == 2){
						 return rej(resp);
					 }
					 else{
						 return res(resp);
					 }
				 }
				 i--;
				 if(i <= 0){
					 cancelInterval(i, total);
					 console.error("There has been a problem with the service lykTmp", resp);
					 return rej();
				 }

			 }, 500, total);

			 function cancelInterval(){
				 console.debug("cancel interval", arguments);
				 $interval.cancel(interval);
			 }*/

			 //return res(domain[responseName].value.$$state);
	 		}
		);
	}

	function __doWaitAndRespond(promise, resolve, reject){
		var notified = false;
		var i = total = 50;

		var interval = $interval(function(){
			if(promise.$$state.status == 0){
				console.debug("interval", i);
			}
			console.log(i);
			if(promise.$$state.status != 0 && !notified){
				notified = true;
				var resp = promise.$$state.value;
				cancelInterval(i, total);
				if(promise.$$state.status == 2){
					return reject(resp);
				}
				else{
					return resolve(resp);
				}
			}
			i--;
			if(i <= 0){
				cancelInterval(i, total);
				console.error("There has been a problem with the service lykTmp", resp);
				return reject();
			}

		}, 500, total);

		function cancelInterval(){
			console.debug("cancel interval", arguments);
			$interval.cancel(interval);
		}
	}

	 return newInstance;

});
