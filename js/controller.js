(function(angular){
	'use strict';

	// 生成一个随机数
	function getId(){
		return Math.random();
	}
	// 获取主模块
	var todoApp = angular.module('TodoApp');

	// 定义一个主控制器
	todoApp.controller('MainController', ['$scope','$location','Storage', function($scope,$location,Storage){
		// 初始化数据成员
		$scope.input = '';
		$scope.currentEditingId = 0;
		$scope.todos = Storage.get();

		// 新增任务
		$scope.add=function(){
			if(!$scope.input){
				return;
			}
			Storage.add($scope.input);
			$scope.input='';
		}

		// 删除任务
		$scope.remove = Storage.remove;

		// 获取todos中有没有已经完成的元素
		$scope.hasCompleted = Storage.hasCompleted;

		// 清空所有已完成的
		$scope.clearCompleted = function(){
			var temp = Storage.clearCompleted();
			$scope.todos = temp;
		}

		$scope.checkedAll = false;

		// 全部完成
		$scope.allCompleted = function(){
			Storage.allCompleted($scope.checkedAll);
		}

		// 双击启用编辑
		$scope.edit = function(current){
			$scope.currentEditingId = current.id;
		}

		// 回车保存
		$scope.save = function(){
			$scope.currentEditingId = 0;
			Storage.save();
		}

		// 筛选问题
		$scope.filterData = {};

		// 使$location上的成员被监视
		$scope.location = $location;

		// $watch只能监视$scope上的成员 (不仅仅是属性，返回值也可以)
		$scope.$watch('location.url()',function(now,old){
			switch(now){
				case '/completed':
					$scope.filterData = {completed:true};
					break;
				case '/active':
					$scope.filterData = {completed:false};
					break;
				default:
					// 重新点击了All
					$scope.filterData = {};
					break;
			}
		})




	}])
})(angular);
