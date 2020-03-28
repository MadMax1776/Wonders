const app = angular.module('WonderApp', []);

app.controller('MyController',['$http', function($http){
  this.name = null;
  this.description = null;
  this.latitude = null;
  this.longitude = null;
  this.indexOfWonder = null;

  this.wonders = [];
  this.wonder = '';

  this.loggedInUser = false;
  ////changing between true and false determines what will be on the page.

  const controller = this;

  this.signup = function(){
    $http({
      url: '/users',
      method: 'POST',
      data: {
        username: this.signupUsername,
        password: this.signupPassword
      }
    }).then(function(response){
      controller.loggedInUser = response.data;
    })
  };

  this.closeForm = function() {
    controller.indexOfEditFormToShow = null;
  }

  this.login = function() {
    $http({
      url:'/session',
      method:'POST',
      data: {
        username: this.loginUsername,
        password: this.loginPassword
      }
    }).then(function(response){
      if(response.data.username){
        controller.loggedInUser = response.data;
      } else {
        controller.loginUsername = null;
        controller.loginPassword = null;
        controller.signupUsername = null;

        ////these two lines clear out the form if it's wrong
      }
    })
  };

  this.moveMap = function(wonder) {
    map.panTo({lat: wonder.latitude, lng: wonder.longitude});
    panorama.setPosition({lat: wonder.latitude, lng: wonder.longitude})
    let maps = document.getElementById('maps-div');
    maps.style.left = 0;
    controller.wonderSelect(wonder);
  };

  this.closeDetails = function() {
    document.getElementById('maps-div').style.left = "-1000px";
  }

  this.createWonder = function() {
    $http({
      method: 'POST',
      data: this.createForm,
      url:'/wonder/'
    }).then(
      (response) => {
        controller.wonders.push(response.data);
        controller.createForm.name ='';
      },  (error) => console.log(error)
    )};

    this.getWonder = function() {
      $http({
        method: 'GET',
        url: '/wonder/'
      }).then(
        function(response){
          controller.wonders = response.data;
        },
        function (error) {
          console.log(error);
        }
      )
    };
    this.getWonder();

    this.editWonder = function(wonder) {
      $http({
        method:'PUT',
        url: '/wonder/' + wonder._id,
        data: {
          name: this.updatedName || wonder.name,
          description: this.updatedDescription || wonder.description,
          country: this.updatedCountry || wonder.country,
          latitude: this.updatedLatitude || wonder.latitude,
          longitude: this.updatedLongitude || wonder.longitude
        }
      }).then(
        function(response){
          controller.updatedName = null;
          controller.getWonder();
        },
        function(error){
          console.log(error);
        }
      )};


      this.deleteWonder = function(wonder) {
        $http({
          method:'DELETE',
          url: '/wonder/' + wonder._id
        }).then(
          function(){
            controller.getWonder();
          },
          function(error){

          }
        )
      }

      this.logout = function(){
        $http({
          url:'/session',
          method:'DELETE'
        }).then(function(){
          controller.signupUsername= null
          controller.signupPassword= null
          controller.loginInUsername = null;
          controller.loginPassword = null;
          controller.loggedInUser = false;
          // controller.signupPassword =null;

        })
      };

      $http({
        method:'GET',
        url:'/session'
      }).then(function(response) {
        if (response.data.username) {
          controller.loggedInUser = response.data
        }
      });

      this.wonderSelect = (wonder) => {
        this.wonder = wonder;
      };

      document.querySelector('[ng-class]');

    }]);
