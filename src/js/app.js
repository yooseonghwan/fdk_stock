// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','chart.js']);


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


    $http({
    method: 'GET' ,
    url: 'http://api.fixer.io/latest?base=USD',
   
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    }).success(function(response) {
        console.log('Success');
        console.log('response='+JSON.stringify(response));
        var currency_amt =response.rates.KRW;
        $scope.currency_amt = currency_amt;

    }).finally(function() {
        console.log('Complete');
    });

    //주식
      var username = "3b079ff3387899bfae4c599ce5ea14c9";
      var password = "a64d5125c63f9953384f5937ddbde822";
      //var auth = "Basic " + (username + ':' + password).toString('base64');
      var auth = "Basic " + btoa(username + ':' + password);

    $http({
    method: 'GET' ,
    url: 'https://api.intrinio.com/data_point?identifier=FDC&item=ask_price',
 
    headers: {
        "Authorization": auth
    }
    }).success(function(response) {
        console.log('Success');
        console.log('response='+JSON.stringify(response));
       var stock_amt =  response.value;
       $scope.stock_amt = stock_amt;
        
    }).finally(function() {
        console.log('Complete');
    });


    //일자별 
    $http({
      method: 'GET' ,
      url: 'https://api.intrinio.com/prices?identifier=FDC&start_date=2017-11-01&end_date=2017-12-13',
   
      headers: {
          "Authorization": auth
      }
      }).success(function(response) {
          console.log('Success');
      
          //그래프

           var data = response.data;

       //   console.log('response.data='+JSON.stringify(data));
          //  console.log('response.data.close='+JSON.stringify(response.data.close));
          var dateAry = new Array();
          var priceAry = new Array();

          for( var key in data ) {
            dateAry.push(data[key].date);
            priceAry.push(data[key].close);
         
           }
          
           priceAry =priceAry.reverse();
           $scope.labels = dateAry.reverse();
           $scope.data   = [priceAry,priceAry];

                   
          //  $scope.onClick = function (points, evt) {
          //  //  console.log(points, evt);
          //  };
           
           $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
           $scope.options = {
             scales: {
               yAxes: [
                 {
                   id: 'y-axis-1',
                   type: 'linear',
                   display: true,
                   position: 'left'
                 },
                 {
                   id: 'y-axis-2',
                   type: 'linear',
                   display: true,
                   position: 'right'
                 }
               ]
             }
           };

          
      }).finally(function() {
          console.log('Complete');
      });

    
      



   //과거 api 가지고 오기 
    //   // 환율 가지고 오기 
    //   var httpPromise = $http({
    //     "method":"get",      
    //    //  "url":"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%22http%3A%2F%2Ffinance.yahoo.com%2Fd%2Fquotes.csv%3Fe%3D.csv%26f%3Dc4l1%26s%3DUSDKRW%3DX%22%3B&format=json&diagnostics=true&callback="
    //      "url" :"http://api.fixer.io/latest?base=USD"
    //   });

    //   httpPromise.success(function(data,status,
    //     header,config) {

    //     var currency_amt = data.query.results.row.col1;
    //     $scope.currency_amt = currency_amt;
    //   });

    //   httpPromise.error(function(data,status,header,config){
    //       alert("환율 실패");
    //   });

    //   var username = "3b079ff3387899bfae4c599ce5ea14c9";
    //   var password = "a64d5125c63f9953384f5937ddbde822";
    //   var auth = "Basic " + (username + ':' + password) .toString('base64');
    // //주식 정보 가지고 오기 
    //   var httpPromise2 = $http({
    //     "method":"get",      
    //   //   "url":"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22FDC%22%20&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="
    //       "url":"https://api.intrinio.com/data_point?identifier=FDC&item=ask_price" ,
    

    // });

    //   //성공시 호출되는 콜백
    //   httpPromise2.success(function(data,status,
    //     header,config) {

    //     var stock_amt =  data.query.results.quote.LastTradePriceOnly;
    //     var Change =  data.query.results.quote.Change;
       
        
    //     $scope.stock_amt = stock_amt;
    //     $scope.Change = Change;
       
    //   });

    //   //실패시 호출되는 콜백
    //   httpPromise2.error(function(data,status,header,config){
    //      alert(errors);
    //       alert("주식 실패");
    //   });

  
}]);


app.controller('detailController', [
  '$scope',
  '$stateParams',
 function($scope,$stateParams){

  $scope.id = $stateParams.id;
  
}]);