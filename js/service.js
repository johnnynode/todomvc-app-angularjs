(function(angular){
	'use strict'

	// 获取主模块
	var todoApp = angular.module('TodoApp');

	// 注册服务
	todoApp.service('Storage', ['$window', function($window){
		var storage = $window.localStorage;
		function getId(){
			return Math.random();
		}

		var todos = JSON.parse(storage.getItem('my_todos') || '[]');
		this.save = function(){
			storage.setItem('my_todos',JSON.stringify(todos));
		}
		this.get = function(){
			return todos;
		};
		this.add = function(input){
			todos.push({id:getId(),text:input,completed:false});
			this.save();
		}
		this.remove = function(current){
			var index = todos.indexOf(current);
			todos.splice(index,1);
			this.save();
		}

		this.hasCompleted = function(){
			return todos.some(todo => todo.completed);
		}

		this.clearCompleted = function(){
			// 先找到所有没有完成的任务，装到一个新数组中
			var unCompleteds = [];
			todos.forEach(todo => {
				if(!todo.completed){
					unCompleteds.push(todo);
				}
			})
			todos = unCompleteds;
			return todos;
		};

		this.allCompleted = function(checked){
			todos.forEach(todo =>{
				todo.completed = checked;
			})
		}
	}])
})(angular);
