(function() {
    'use strict';
})();
/*global angular, $snaphy, $*/

angular.module($snaphy.getModuleName())

/**
 Defigning templated for angular-formly.
 */
.run(['formlyConfig', function(formlyConfig, SnaphyValidate) {
    formlyConfig.setType({
        name: 'input',
        template: '<div ng-if="options.templateOptions.display !== false" >'+
            '<div  ng-class="{\'form-group\': !options.templateOptions.inline, \'inline-elements\': options.templateOptions.inline}" >' +
            '<div  ng-class="[options.templateOptions.colSize, options.templateOptions.color]">' +
            '<div class="form-material" ng-class="options.templateOptions.color">' +
            '<input  ng-disabled="{{options.templateOptions.disabled}}" class="form-control input-box" type="{{options.templateOptions.type}}"  ng-class="options.templateOptions.class" name="{{options.templateOptions.id}}" id="{{options.templateOptions.id}}" ng-model="model[options.key]">' +
            '<label for="{{options.templateOptions.id}}">{{options.templateOptions.label}}</label>' +
            '</div>' +
            '</div>' +
            '</div>'+
            '</div>',

        link: function(scope) {
                // ID PROPERTY IS NEEDED FOR VALIDATE TO WORK
                if (scope.options.templateOptions) {
                    if (!scope.options.templateOptions.colSize) {
                        scope.options.templateOptions.colSize = 'col-xs-12';
                    }
                } //if


                if(!scope.model[scope.options.key]){
                    //Check if default value is given..
                    if(scope.to.default){
                        scope.model[scope.options.key] = scope.to.default;
                    }
                }

            } //link function..
    });



    formlyConfig.setType({
        name: 'textarea',
        template:'<div ng-if="options.templateOptions.display !== false" >'+ 
            '<div ng-class="{\'form-group\': !options.templateOptions.inline, \'inline-elements\': options.templateOptions.inline}">' +
            '<div ng-class="options.templateOptions.colSize">' +
            '<div class="form-material" ng-class="options.templateOptions.color">' +
            '<textarea ng-disabled="{{options.templateOptions.disabled}}" type="{{options.templateOptions.type}}" name="{{options.templateOptions.id}}" id="{{options.templateOptions.id}}" ng-class="options.templateOptions.class" class="form-control input-box" ng-model="model[options.key]" rows="{{options.templateOptions.row}}"></textarea>' +
            '<label for="{{options.templateOptions.id}}">{{options.templateOptions.label}}</label>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>',
        controller: ["$scope", function($scope) {
            //Set default value for label..
            if ($scope.options.templateOptions.row === undefined) {
                $scope.options.templateOptions.row = 3;
            }

            if ($scope.options.templateOptions.colSize === undefined) {
                $scope.options.templateOptions.colSize = "col-sm-12";
            }
        }]
    });




    formlyConfig.setType({
        name: 'select',
        /*
        * "model":{
              "model": "Model Name"
               "value": "id" //property name of value
               "name": "name" //property name of display select
               "filter":{} //filter to fetch the data..
           }
        * */
        template: '<div ng-if="options.templateOptions.display !== false" >'+ 
            '<div ng-class="{\'form-group\': !options.templateOptions.inline, \'inline-elements\': options.templateOptions.inline}">' +
            '<div ng-class="options.templateOptions.colSize">' +
            '<div class="form-material" ng-class="options.templateOptions.color">' +
            '<select ng-disabled="{{options.templateOptions.disabled}}" type="{{options.templateOptions.type}}" name="{{options.templateOptions.id}}" ng-class="options.templateOptions.class" id="{{options.templateOptions.id}}" ng-change="convertToString(model[options.key])" ng-model="model[options.key]" class="form-control input-box"  size="{{options.templateOptions.size}}">' +
            '<option value=""></option>' +
            '<option value="{{option.id}}" ng-repeat="option in options.templateOptions.options">{{option.name}}</option>' +
            '</select>' +
            '<label for="{{options.templateOptions.id}}">{{options.templateOptions.label}}</label>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>',
        controller: ["$scope", "$http", 'Database', function($scope, $http, Database) {
            //Set default value for label..
            if ($scope.options.templateOptions.size === undefined) {
                $scope.options.templateOptions.size = 1;
            }

            if ($scope.options.templateOptions.colSize === undefined) {
                $scope.options.templateOptions.colSize = "col-sm-12";
            }

            if($scope.options.templateOptions.model){
                if($scope.options.templateOptions.model.model){
                    var modelService = Database.loadDb($scope.options.templateOptions.model.model);
                    var filter = $scope.options.templateOptions.model.filter || {};
                    modelService.find({
                        filter: filter
                    }, function(values){
                        if(values){
                            $scope.options.templateOptions.options = $scope.options.templateOptions.options || [];
                            var valueKey = $scope.options.templateOptions.model.value;
                            var nameKey = $scope.options.templateOptions.model.name || valueKey;
                            if(valueKey){
                                values.forEach(function(value){
                                    if(value[valueKey] !== undefined && value[nameKey] !== undefined){
                                        $scope.options.templateOptions.options.push({
                                            id: value[valueKey],
                                            name: value[nameKey]
                                        });
                                    }
                                });
                            }

                        }
                    }, function(error){
                       console.error(error);
                    });
                }

            }


            if ($scope.options.templateOptions.get !== undefined) {
                //Run http to check the value..
                $http({
                    method: 'GET',
                    url: $scope.options.templateOptions.get
                }).then(function successCallback(response) {
                    //Select options downloaded successfully..
                    //Loading options..
                    $scope.options.templateOptions.options = response;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.error(response);
                });
            }


            $scope.$watch("model[options.key]",
                function() {
                    if($scope.model[$scope.options.key] !== undefined){
                        //console.log($scope.model);
                        $scope.model[$scope.options.key] = $scope.model[$scope.options.key].toString();
                    }
                }
            );
        }]
    });



    //For selecting string only .. previous for selecting object..
    formlyConfig.setType({
        name: 'selectString',
        template:
            '<div ng-if="options.templateOptions.display !== false" >'+  
            '<div ng-class="{\'form-group\': !options.templateOptions.inline, \'inline-elements\': options.templateOptions.inline}">' +
            '<div ng-class="options.templateOptions.colSize">' +
            '<div class="form-material" ng-class="options.templateOptions.color">' +
            '<select ng-disabled="{{options.templateOptions.disabled}}" type="{{options.templateOptions.type}}" name="{{options.templateOptions.id}}" ng-class="options.templateOptions.class" id="{{options.templateOptions.id}}"   ng-model="model[options.key]" class="form-control input-box"  size="{{options.templateOptions.size}}">' +
            '<option value=""></option>' +
            '<option value="{{option}}" ng-repeat="option in options.templateOptions.options">{{option | uppercase}}</option>' +
            '</select>' +
            '<label for="{{options.templateOptions.id}}">{{options.templateOptions.label}}</label>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>',
        controller: ["$scope", "$http", function($scope, $http) {
            //Set default value for label..
            if ($scope.options.templateOptions.size === undefined) {
                $scope.options.templateOptions.size = 1;
            }

            if ($scope.options.templateOptions.colSize === undefined) {
                $scope.options.templateOptions.colSize = "col-sm-12";
            }

            


            if ($scope.options.templateOptions.get !== undefined) {
                //Run http to check the value..
                $http({
                    method: 'GET',
                    url: $scope.options.templateOptions.get
                }).then(function successCallback(response) {
                    //Select options downloaded successfully..
                    //Loading options..
                    $scope.options.templateOptions.options = response;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    //console.error(response);
                });
            }

            $scope.$watch("model[options.key]",
                function() {
                    if($scope.model){
                        if($scope.model[$scope.options.key] !== undefined){
                            //console.log($scope.model);
                            $scope.model[$scope.options.key] = $scope.model[$scope.options.key].toString();
                        }else{
                            if($scope.to.default){
                                if(!$scope.model[$scope.options.key]){
                                    $scope.model[$scope.options.key] = $scope.to.default; 
                                }
                            }
                        }

                        if($scope.to.onSelect){
                            //Broadcast Event if present..
                            $rootScope.$broadcast($scope.to.onSelect, {
                                data: $scope.model[$scope.options.key],
                                model: $scope.model,
                                key: $scope.options.key
                            });
                        }
                    }
                }
            );

        }]

    });

}]); //End Run
