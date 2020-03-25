const app = angular.module('WonderApp', []);


 app.controller('MyController',['$http', function($http){
  this.name = null;
  this.loggedInUser = false;
  ////changing between true and false determines what will be on the page.
  this.indexOfEditFormToShow = null;

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
  }

  this.login = function(){
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
      }

  this.createWonder = function() {
      $http({
          method: 'POST',
          url:'/wonder',
          data: {
            name: this.name,
          	description: this.description,
          	country: this.country,
          	latitude: this.latitude,
          	longitude: this.longitude
          }
      }).then(
          function(response) {
              controller.getWonder();
          },
          function(error) {
              console.log(error);
          }
      )
  };

  this.getWonder = function(){
    $http({
      method: 'GET',
      url: '/wonder'
    }).then(
      function(response){
         console.log(response.data);
        // console.log(this);
        // console.log(controller);
        controller.wwe = response.data;

      },
      function (error) {

      }
    )
  };

  this.editWonder = function(wonder){
    $http({
        method:'PUT',
        url: '/wonder/' + wonder._id,
        data: {
            title: this.updatedTitle || wonder.title
        }
}).then(
    function(response){
        controller.updatedTitle = null;
        controller.getWonder();
    },
function(error){
    console.log(error);
}
);
};

this.logout = function(){
$http({
    url:'/session',
    method:'DELETE'
}).then(function(){
    controller.loggedInUser = false;
    controller.loginUsername = null;
    controller.loginPassword = null;
    controller.signupPassword =null;

})
}

$http({
  method:'GET',
  url:'/session'
}).then(function(response){
  // console.log(response);
  if(response.data.username){
  controller.loggedInUser = response.data
  }
});


this.getWonder();

}]);
