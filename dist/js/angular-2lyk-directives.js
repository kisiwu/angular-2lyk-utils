angular.module("2lykUtils")
.directive("lykNgRepeatListenTo", ['$timeout', function($timeout){
  return {
    restrict: 'A',
    scope: {
      lykNgRepeatListenTo: '<',
      lykNgRepeatDo: '&'
    },
    link: function(scope, elem, attrs, ctrl){
      switch (scope.lykNgRepeatListenTo) {
        case 'last':
          if (scope.$parent.$last){
            scope.lykNgRepeatDo();
          }
          break;
        case 'first':
          if (scope.$parent.$first){
            scope.lykNgRepeatDo();
          }
          break;
        default:
          if (scope.$parent.$index == scope.lykNgRepeatListenTo){
            scope.lykNgRepeatDo();
          }
      }
    }
  }
}]);

angular.module("2lykUtils")
.directive('lykOnBottom', function () {
  return {
    restrict: 'A',
    scope: {
      lykOnBottom: '&',
      lykOnBottomImmediateCheck: '=?',
      lykOnBottomMinus: '<?'
    },
    link: function(scope, elem, attrs){
      //console.info('onBottomDirective');
      var minus = scope.lykOnBottomMinus;
      if(!minus){
        minus = 0;
      }
      if(scope.lykOnBottomImmediateCheck){
        scope.lykOnBottom();
      }
      $(elem).on('scroll', function() {
          if($(this).scrollTop() + $(this).innerHeight() >= ($(this)[0].scrollHeight - minus)) {
              //console.info("on bottom","minus",minus);
              scope.lykOnBottom();
          }
      });
    }
  }
});

angular.module("2lykUtils")
.directive("lykStickContainer", ['$timeout', function($timeout){
  return {
      restrict: 'A',
      controller: ['$element', function($element){
          var container = $element;
          var elements = [];
          /*$( window ).resize(function() {
            console.info("resize");
            //container.scrollTop(0);
            elements.forEach(function(elem){
              elem.stickyTableHeaders({scrollableArea: $(container), cacheHeaderHeight: false, fixedOffset: $(container)});
            });
          });*/

          this.addElement = function(element, config){
            if(elements.indexOf(element) == -1){
              elements.push(element);
            }

            if(!(config && angular.isObject(config))){
                config = {'head': true};
            }

            if(angular.isUndefined(config['z-index'])){
              config['z-index'] = 10;
            }

            $timeout(function(){
              $(element).tableHeadFixer(config);
            },999);
            //$(element).stickyTableHeaders({scrollableArea: $(container), cacheHeaderHeight: false, fixedOffset: $(container)});

          };
      }]
  };
}]);

angular.module("2lykUtils")
.directive("lykStick", ['$timeout', function($timeout){
  return {
    restrict: 'A',
    require: '^lykStickContainer',
    scope: {
      stickIf: '=',
      stickConfig: '=?',
      stickWatch: '=?'
    },
    link: function(scope, elem, attrs, ctrl){
      var sticked = false;
      function stickIt() {
        if(!sticked){
          sticked = true;
          ctrl.addElement(elem, scope.stickConfig);
          scope.$watchCollection('stickWatch', function(){
            ctrl.addElement(elem, scope.stickConfig);
          });
        }
      }
      scope.$watch('stickIf', function(value){
        if(value || angular.isUndefined(value)){
          stickIt();
        }
      });
    }
  }
}]);

/*angular.module('2lykUtils')
.directive('lykScreen',
function(){
  return {
    restrict: 'A',
    controller: function($scope, $element, $attrs){
        var container = $element;
        var scopes = [];

        var firstElem;
        var lastElem;

        var _do = function(fn, args){
          var fnctn = $scope.$eval($attrs[fn]);
          if(typeof fnctn === 'function'){
            fnctn(args);
          }
        }

        $( container ).on('scroll', function() {
          //if($(this).scrollTop() + $(this).innerHeight() >= ($(this)[0].scrollHeight - minus)) {
          //}
          // search for the first
          scopes.some(function(s, idx, array){
            var elem = s.element;
            var pos = elem.offset().top - container.offset().top - ($scope.$eval($attrs.lykPaddingTop) || 0);
            if(pos >= 0){
              if(!((firstElem) && firstElem.is(elem))){
                firstElem = elem;
                _do('lykToppestFn',s.scope.lykScreenPix);
                //s.scope.first(pos);
              }
              return true;
            }
          });

          // search for the last
          scopes.some(function(s, idx, array){
            var elem = s.element;
            var scope = s.scope;
            var pos = elem.offset().top - (container.offset().top + container.innerHeight()) + ($scope.$eval($attrs.lykPaddingBottom) || 0);
            if(pos >= 0){
              if(!((lastElem) && lastElem.is(elem))){
                lastElem = elem;
                _do('lykBottomestFn',s.scope.lykScreenPix);
                //s.scope.last(pos);
              }
              return true;
            }
            if(idx == array.length -1){
              if(!((lastElem) && lastElem.is(elem))){
                lastElem = elem;
                _do('lykBottomestFn',s.scope.lykScreenPix);
                //s.scope.last(pos);
              }
              return true;
            }
          });
        });

        this.add = function(scope, elem){
            scopes.push({scope: scope, element: elem});
        };
    }
  };
}
);

angular.module("2lykUtils")
.directive("lykScreenPix", function($timeout){
  return {
    restrict: 'A',
    require: '^lykScreen',
    scope: {
      lykScreenPix: '=',
      lykPaddingTop: '=?',
      lykPaddingBottom: '=?',

      // fn to call when toppest and bottomest change
      lykToppestFn: '=?',
      lykBottomestFn: '=?'
    },
    link: function(scope, elem, attrs, ctrl){

      var _do = function(fn, args){
        if(typeof scope[fn] == 'function'){
          scope[fn](args);
        }
        else{
          console.log(fn, args);
        }
      }
      scope.first = function(pos){
        _do('lykToppestFn',scope.lykScreenPix);
      }
      scope.last = function(pos){
        _do('lykBottomestFn',scope.lykScreenPix);
      }
      ctrl.add(scope, elem);
    }
  }
});*/

