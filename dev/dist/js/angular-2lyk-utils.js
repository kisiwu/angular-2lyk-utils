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

			execute: execute
		}
  }];
});



/**
 * @ngdoc factory
 * @name 2lykUtils.JoiSchemaUtils
 * @description Service utility with Joi validation objects
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

		function validUtilsArgs(objectSchema, key, methodName){
			if(errorHandler(!angular.isString(key), methodName,'Argument 2 must be a string.', 'Instead, received: '+ (typeof key)))
				return;
			if(!objectSchema || !angular.isObject(objectSchema)) return;
			if(!angular.isObject(objectSchema[key])) return;
			if(!objectSchema[key].isJoi) return;
			return true;
		}

		function getValids(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key, '[getValids]')) return;
			return objectSchema[key]._valids._set;
		}

		function getInvalids(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key, '[getInvalids]')) return;
			return objectSchema[key]._invalids._set;
		}

		function getUnit(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key, '[getUnit]')) return;
			return objectSchema[key]._unit;
		}

		function getType(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key, '[getType]')) return;
			return objectSchema[key]._type;
		}

		function isRequired(objectSchema, key){
			if(!validUtilsArgs(objectSchema, key, '[isRequired]')) return;
			return objectSchema[key]._flags.presence == "required";
		}

		function errorHandler(){
			Array.prototype.splice.call(arguments, 1, 0, "[JoiSchemaUtils] >");
			Array.prototype.unshift.call(arguments, "error");
			return lykConsole.trigger.apply(this, arguments);
		}

		return newInstance;

});
