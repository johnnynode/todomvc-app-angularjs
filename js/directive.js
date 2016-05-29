(function(angular){
	'use strict';

	// 创建一个模块
	var todoApp = angular.module('TodoApp');
	todoApp.directive('autoFocus',[function(){
		return {
			link:function(scope,element,attributes){
				element.on('dblclick',function(){
					angular.element(this).find('input').eq(1)[0].focus();
				})
			}
		}
	}])
})(angular)
