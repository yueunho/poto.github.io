 <style>
      table {
        width: 100%;
        border: 1px solid #333333;
      }
      td {
        padding: 10px;
        border: 1px solid #333333;
        text-align: center;
      }
</style>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-base64/2.0.5/angular-base64.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.13.1/js-yaml.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-base64/2.0.5/angular-base64.min.js"></script>
<script>

    var App = angular.module("four04App",['base64']);
 
    App.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('⸨');
        $interpolateProvider.endSymbol('⸩');
    });
      
    App.filter('matchesQuery', function(){
        return function(items, query){
            var alternate = query.replace(/ /g,"_").toLowerCase();
            var lcQuery = query.toLowerCase();
            var arrayToReturn = [];
            for (var i=0; i<items.length; i++){
                if (items[i].title.toLowerCase().indexOf(lcQuery) !== -1 || items[i].words.indexOf(alternate) !== -1) {
                    arrayToReturn.push(items[i]);
                }
            }
            return arrayToReturn;
        };
    });

    App.controller('PostListCtrl', ['$scope', '$http','$base64', function ($scope, $http, $base64) {
        // draft articles in _posts are hidden from public view, and begin 1970-01-01-
        // this allows me to copy/paste the file name direct to the browser for sharing of previews.
          $scope.comfile;   
          $scope.posts = [];
          $scope.test = "text";
        $http.get('https://api.github.com/repos/yueunho/poto.github.io/contents/_data/user.yml',{ access_token: '8460937fd278bd4f79e0b49576abab921ce08a31'}).success(function (data) {
          console.log("data",data);
            var decodedString =  decodeURIComponent(escape(window.atob( data.content )));
            $scope.comfile = decodedString;
          
            $scope.posts = jsyaml.load($scope.comfile);
              console.log( $scope.posts);
        });
        
      $scope.userDelectory = function() {
        console.log("진입완료")      
      };
       
    }]);

</script>
