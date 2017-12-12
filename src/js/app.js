// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

function Emoticon(name,profile,id,img) {
  this.name = name;
  this.profile = profile;
  this.id = id;
  this.img = img;
}


app.controller('listController',['$scope','$http', function($scope,$http){
  

    var today = new Date();
    $scope.today = today; 

   // $scope.startAjax = function(){

      // 환율 가지고 오기 
      var httpPromise = $http({
        "method":"get",      
       //  "url":"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%22http%3A%2F%2Ffinance.yahoo.com%2Fd%2Fquotes.csv%3Fe%3D.csv%26f%3Dc4l1%26s%3DUSDKRW%3DX%22%3B&format=json&diagnostics=true&callback="
         "url" :"http://api.fixer.io/latest?base=USD"
      });

      httpPromise.success(function(data,status,
        header,config) {

        var currency_amt = data.query.results.row.col1;
        $scope.currency_amt = currency_amt;
      });

      httpPromise.error(function(data,status,header,config){
          alert("환율 실패");
      });

      var username = "3b079ff3387899bfae4c599ce5ea14c9";
      var password = "a64d5125c63f9953384f5937ddbde822";
      var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
    //주식 정보 가지고 오기 
      var httpPromise2 = $https({
        "method":"get",      
      //   "url":"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22FDC%22%20&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="
          "url":"https://api.intrinio.com/data_point?identifier=FDC&item=ask_price" ,
          "Authorization": auth

    });

      //성공시 호출되는 콜백
      httpPromise2.success(function(data,status,
        header,config) {

        var stock_amt =  data.query.results.quote.LastTradePriceOnly;
        var Change =  data.query.results.quote.Change;
       
        
        $scope.stock_amt = stock_amt;
        $scope.Change = Change;
       
      });

      //실패시 호출되는 콜백
      httpPromise2.error(function(data,status,header,config){
          alert("주식 실패");
      });

  
}]);


app.controller('detailController', [
  '$scope',
  '$stateParams',
 function($scope,$stateParams){

  $scope.id = $stateParams.id;
  
}]);