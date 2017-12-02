/**
* @ngdoc module
* @module 2lykUtils
* @description A bunch of utils for AngularJS 1
*/
angular.module('2lykUtils', ['ngStorage']);

/**
* @ngdoc constant
* @name 2lykUtils.MIME_TYPES
* @description
*  MIME types extensions and descriptions
*/
angular.module('2lykUtils')
  .constant("MIME_TYPES", {
    "audio/aac": {
      extension: "aac",
      description: "AAC audio file",
    },
    "application/x-abiword": {
      extension: "abw",
      description: "AbiWord document",
    },
    "application/octet-stream": {
      extension: "arc",
      description: "Archive document (multiple files embedded)",
    },
    "video/x-msvideo": {
      extension: "avi",
      description: "AVI: Audio Video Interleave",
    },
    "application/vnd.amazon.ebook": {
      extension: "azw",
      description: "Amazon Kindle eBook format",
    },
    "application/octet-stream": {
      extension: "bin",
      description: "Any kind of binary data",
    },
    "application/x-bzip": {
      extension: "bz",
      description: "BZip archive",
    },
    "application/x-bzip2": {
      extension: "bz2",
      description: "BZip2 archive",
    },
    "application/x-csh": {
      extension: "csh",
      description: "C-Shell script",
    },
    "text/css": {
      extension: "css",
      description: "Cascading Style Sheets (CSS)",
    },
    "text/csv": {
      extension: "csv",
      description: "Comma-separated values (CSV)",
    },
    "application/msword": {
      extension: "doc",
      description: "Microsoft Word",
    },
    "application/epub+zip": {
      extension: "epub",
      description: "Electronic publication (EPUB)",
    },
    "image/gif": {
      extension: "gif",
      description: "Graphics Interchange Format (GIF)",
    },
    "text/html": {
      extension: ["html", "htm"],
      description: "HyperText Markup Language (HTML)",
    },
    "image/x-icon": {
      extension: "ico",
      description: "Icon format",
    },
    "text/calendar": {
      extension: "ics",
      description: "iCalendar format",
    },
    "application/java-archive": {
      extension: "jar",
      description: "Java Archive (JAR)",
    },
    "image/jpeg": {
      extension: ["jpg", "jpeg"],
      description: "JPEG images",
    },
    "application/javascript": {
      extension: "js",
      description: "JavaScript (ECMAScript)",
    },
    "application/json": {
      extension: "json",
      description: "JSON format",
    },
    "audio/midi": {
      extension: ["mid", "midi"],
      description: "Musical Instrument Digital Interface (MIDI)",
    },
    "video/mpeg": {
      extension: "mpeg",
      description: "MPEG Video",
    },
    "application/vnd.apple.installer+xml": {
      extension: "mpkg",
      description: "Apple Installer Package",
    },
    "application/vnd.oasis.opendocument.presentation": {
      extension: "odp",
      description: "OpenDocuemnt presentation document",
    },
    "application/vnd.oasis.opendocument.spreadsheet": {
      extension: "ods",
      description: "OpenDocuemnt spreadsheet document",
    },
    "application/vnd.oasis.opendocument.text": {
      extension: "odt",
      description: "OpenDocument text document",
    },
    "audio/ogg": {
      extension: "oga",
      description: "OGG audio",
    },
    "video/ogg": {
      extension: "ogv",
      description: "OGG video",
    },
    "application/ogg": {
      extension: "ogx",
      description: "OGG",
    },
    "image/png": {
      extension: "png",
      description: "Portable Network Graphics",
    },
    "application/pdf": {
      extension: "pdf",
      description: "Adobe Portable Document Format (PDF)",
    },
    "application/vnd.ms-powerpoint": {
      extension: "ppt",
      description: "Microsoft PowerPoint",
    },
    "application/x-rar-compressed": {
      extension: "rar",
      description: "RAR archive",
    },
    "application/rtf": {
      extension: "rtf",
      description: "Rich Text Format (RTF)",
    },
    "application/x-sh": {
      extension: "sh",
      description: "Bourne shell script",
    },
    "image/svg+xml": {
      extension: "svg",
      description: "Scalable Vector Graphics (SVG)",
    },
    "application/x-shockwave-flash": {
      extension: "swf",
      description: "Small web format (SWF) or Adobe Flash document",
    },
    "application/x-tar": {
      extension: "tar",
      description: "Tape Archive (TAR)",
    },
    "image/tiff": {
      extension: ["tiff", "tif"],
      description: "Tagged Image File Format (TIFF)",
    },
    "font/ttf": {
      extension: "ttf",
      description: "TrueType Font",
    },
    "application/vnd.visio": {
      extension: "vsd",
      description: "Microsoft Visio",
    },
    "audio/x-wav": {
      extension: "wav",
      description: "Waveform Audio Format",
    },
    "audio/webm": {
      extension: "weba",
      description: "WEBM audio",
    },
    "video/webm": {
      extension: "webm",
      description: "WEBM video",
    },
    "image/webp": {
      extension: "webp",
      description: "WEBP image",
    },
    "font/woff": {
      extension: "woff",
      description: "Web Open Font Format (WOFF)",
    },
    "font/woff2": {
      extension: "woff2",
      description: "Web Open Font Format (WOFF)",
    },
    "application/xhtml+xml": {
      extension: "xhtml",
      description: "XHTML",
    },
    "application/vnd.ms-excel": {
      extension: "xls",
      description: "Microsoft Excel",
    },
    "application/xml": {
      extension: "xml",
      description: "XML",
    },
    "application/vnd.mozilla.xul+xml": {
      extension: "xul",
      description: "XUL",
    },
    "application/zip": {
      extension: "zip",
      description: "ZIP archive",
    },
    "video/3gpp": {
      extension: "3gp",
      description: "3GPP video container",
    },
    "audio/3gpp": {
      extension: "3gp",
      description: "3GPP audio container",
    },
    "video/3gpp2": {
      extension: "3g2",
      description: "3GPP2 video container",
    },
    "audio/3gpp2": {
      extension: "3g2",
      description: "3GPP2 audio container",
    },
    "application/x-7z-compressed": {
      extension: "7z",
      description: "7-zip archive",
    }
  });

/**
* @ngdoc provider
* @name 2lykUtils.lykConsoleProvider
* @description
*  configuration for service lykConsole
*/
angular.module('2lykUtils')
 .provider('lykConsole', function LykConsoleProvider() {

	 var dev = false;

	 this.setDev = function(value){
		 dev = value;
	 };

	 this.dev = function(){
		 callDev(console.debug, arguments);
	 };

	 function callDev(cb, args){
		 if(dev){
			 Array.prototype.unshift.call(args, "☼");
			 cb.apply(cb, args);
		 }
	 }

	 /**
	  * @ngdoc factory
	  * @name 2lykUtils.lykConsole
	  * @description Service to display messages in console
	  */
	 this.$get = ["$log", function($log){

 		var newInstance = {
 			call: call,
 			trigger: trigger,

 			log: log,
 			info: info,
 			warn: warn,
 			error: error,
 			debug: debug,

 			//custom
 			matrix: matrix,
			dev: dev
 		};

 		var statesFn = {
 			log: log,
 			info: info,
 			warn: warn,
 			error: error,
 			debug: debug,
 			matrix: matrix
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

 		/**
 	   * @memberof 2lykUtils.lykConsole
 	   * @function matrix
 	   * @description (Google Chrome) Display a string in console. Arguments are stringified if there are not strings.
 		 * @param {string} ... values
 	   */
 		function matrix(){
 			//Array.prototype.push.call(arguments, "[lykConsole]");
 			var concatedArguments = "";
 			for(var i=0; i < arguments.length; i++){
 				if(angular.isString(arguments[i])){
 					concatedArguments += " " + arguments[i];
 					continue;
 				}
 				concatedArguments += " " + JSON.stringify(arguments[i]);
 			}
 			concatedArguments += " ";

 			$log.log.apply(this, ["%c"+concatedArguments,"background-color: black; color: #00FF00;"]);
 		}

		function dev(){
			callDev(debug, arguments);
		}

 		return newInstance;

 }];

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
			//__apis = collection;
			//__apis = {};
			Object.keys(collection).forEach(
				function(key) {
					if(key == "__apis") return;
					//if(key == "__apis") return delete object[attr];
					function validateDocument(object, attr, prefix, depth){
						//if(!angular.isObject(object[attr])) return delete object[attr];
						if(!angular.isObject(object[attr])){
							return;
						}
						if(depth > 3){
							console.error("[LykXhrProvider]","Couldn't find route (max depth: 3)", {prefix: prefix, object: object, depth: depth, nextProperty: attr, nextValue: object[attr]});
							return;
						}
						if(!angular.isString(object[attr]["url"])){
							Object.keys(object[attr]).forEach(
								function (subAttr){
									validateDocument(object[attr], subAttr, prefix + ":" + subAttr, depth + 1);
								}
							);
						}
						else{
							if(!angular.isString(object[attr]["method"])) object[attr]["method"] = "GET";
							__apis[prefix] = object[attr];
						}
						//if(!angular.isString(object[attr]["url"])) return delete object[attr];
						//if(!angular.isString(object[attr]["method"])) return object[attr]["method"] = "GET";
					}
					validateDocument(collection, key, key, 1);
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
  this.$get = ["$q", "$http", "lykConsole", "MIME_TYPES", function lykXhrFactory($q, $http, lykConsole, MIME_TYPES) {

		function errorHandler(){
			Array.prototype.splice.call(arguments, 1, 0, "[lykXhr] >");
			Array.prototype.unshift.call(arguments, "error");
			return lykConsole.trigger.apply(this, arguments);
		}

		function buildConfig(apiName, customConfig, params){
			customConfig = customConfig || {};
			params = params || {};
			var api = __apis[apiName];
			var config = {};
			Object.keys(api).forEach(
				function(key){
					config[key] = api[key];
				}
			);
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
     * @function download
		 * @description
		 *   Execute a request and download the result.
		 * @param {string} name - route name (see 'lykXhr.execute')
		 * @param {object} config - add more config (see 'lykXhr.execute')
		 * @param {object} params - replace elements in url with another value (see 'lykXhr.execute')
     * @param {string} fileName - name of the dowloaded file
     * @return {object} promise
     */
    var download = function download(apiName, customConfig, params, fileName){
      var dfd = $q.defer();
      customConfig = (customConfig && angular.isObject(customConfig)) ? customConfig : {};
      customConfig.responseType = 'blob';
      execute(apiName, customConfig, params).then(
        function(data){
          dfd.resolve(data);
          try{
            var urlCreator = window.URL || window.webkitURL;
            var blobUrl = urlCreator.createObjectURL(data);
            var downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = fileName && angular.isString(fileName) ? fileName : (Math.floor(Math.random() * (99999 - 9999)) + 9999).toString();
            if(downloadLink.download.indexOf(".") == -1 && data.type){
              var type = MIME_TYPES[data.type];
              if(type){
                downloadLink.download += '.'+ (angular.isArray(type.extension) ? type.extension[0] : type.extension);
              }
            }
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.parentNode.removeChild(downloadLink);
          }
          catch(e){
            lykConsole.error(e);
          }
        },
        dfd.reject
      );
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
      download: download,

			buildConfig: buildConfig
		}
  }];
});



/**
 * @ngdoc factory
 * @name 2lykUtils.JoiSchemaUtils
 */
angular.module('2lykUtils')
	.factory('JoiSchemaUtils', ['lykConsole', function(lykConsole){

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
}]);


/**
 * @ngdoc factory
 * @name 2lykUtils.lykPropertyAccess
 * @description Service to access properties
 */
angular.module('2lykUtils')
	.factory('lykPropertyAccess', ['lykConsole', '$q', function(lykConsole, $q){

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
				if(!angular.isObject(value) && i < mapping.length-1){
					if(value){
						previous = value;
						value = undefined;
					}
					break;
				}
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
}]);

/**
 * @ngdoc factory
 * @name 2lykUtils.lykTmp
 * @description Keep data temporarily
 */
angular.module('2lykUtils')
.factory("lykTmp", ['lykXhr', '$http', '$q', '$interval', '$sessionStorage', function(lykXhr, $http, $q, $interval, $sessionStorage){

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
	 * @param {boolean} toSessionStorage - save it to session storage
	 * @returns {object} promise
	 */
	 function get(ncp, tldName, toSessionStorage){
		 if(angular.isString(ncp)){
			 ncp = {name: ncp};
		 }
		 return $q(function(res, rej){
			 tldName = tldName || defaultTLD;
			 var config = lykXhr.buildConfig(ncp.name, ncp.config, ncp.params);
			 var tld;
			 if(toSessionStorage){
				 //console.error("TO SESSION STORAGE");
				 tld = $sessionStorage[tldName];
			 }
			 else{
				 tld = responses[tldName];
			 }
			 var domainName = config.method ? config.method.toUpperCase() : "GET";
			 var responseName = config.url;
			 var domain;
       if(tld && tld[domainName] && tld[domainName][responseName]){
				 domain = tld[domainName];
				 var response = domain[responseName];
         if(!response.value || (response.value && response.value.$$state && response.value.$$state.status == 2) ){
					 console.warn("another try to retrieve");
           if(response.try < 3){
             response.try++;
           }
           else{
             return rej(response);
           }
         }
         else{
           if(response.expiredAt && (new Date(response.expiredAt)).getTime() > (new Date()).getTime()){
						 console.warn("get from tmp:", tldName, response);
						 //because Non-JSON objects (e.g.: promise, Blob, File, etc) cannot be saved in storage
						 //attribute 'saved' to get the response saved in storage
						 if(response.saved && !response.value.$$state){
							 return res(response.saved);
						 }
             return __doWaitAndRespond(response.value, res, rej);
           }
         }
       }
			 else{
				 if(!tld){
					 if(toSessionStorage){
						 //console.error("TO SESSION STORAGE");
						 $sessionStorage[tldName] = {};
						 tld = $sessionStorage[tldName];
					 }
					 else{
						 responses[tldName] = {};
						 tld = responses[tldName];
					 }
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
					 //console.debug("from API");
           /*domain[responseName].value = r;
           res(domain[responseName].value);*/
					 if(toSessionStorage){
						 //console.error("TO SESSION STORAGE");
						 domain[responseName].saved = r;
					 }
					 return r;
         },
         function(e){
           //rej(e);
					 return e;
         }
       );

			 return __doWaitAndRespond(domain[responseName].value, res, rej);
	 		}
		);
	}

	function __doWaitAndRespond(promise, resolve, reject){
		var notified = false;
		var i = total = 50;

		var interval = $interval(function(){
			if(promise.$$state && promise.$$state.status == 0){
				//console.debug("interval", i);
			}
			//console.log(i);
			if(promise.$$state && promise.$$state.status != 0 && !notified){
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
				console.error("There has been a problem with the service lykTmp");
				return reject(promise);
			}

		}, 500, total);

		function cancelInterval(){
			//console.debug("cancel interval", arguments);
			$interval.cancel(interval);
		}
	}

	 return newInstance;

}]);
