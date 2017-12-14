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

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

app.controller('listController',['$scope','$http', function($scope,$http){

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

    var today = new Date('YYYY-MM-DD');
    $scope.today = today; 

    var endDay   = today;
    var startDay = today.setDate(today - 30);

    //일자별 
    $http({
      method: 'GET' ,
      url: 'https://api.intrinio.com/prices?identifier=FDC&start_date='+startDay+'&end_date='+endDay,
   
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

      $scope.change = function() {
            
        setCookie("count",$scope.get_stock,365);
      }
     

      var getCookie = getCookie("count");
      if(getCookie ==""){
        $scope.get_stock="300";
        $scope.get_stock_value="300";
      }else{
        $scope.get_stock= getCookie("count");
        $scope.get_stock_value= getCookie("count");
      }
     
    


}]);



app.controller('detailController', [
  '$scope',
  '$stateParams',
 function($scope,$stateParams){

  $scope.id = $stateParams.id;
  
}]);