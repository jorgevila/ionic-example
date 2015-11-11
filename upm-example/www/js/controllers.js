angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    pass: true
  };
})

.controller('HelpCtrl', function($scope) {
})

.controller('ExpedienteCtrl', ["$scope", "$state", "$ionicModal", "LoginService", "Expediente", 
  function($scope, $state, $ionicModal, LoginService, Expediente) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    Expediente.all(LoginService.getToken()).then(function(response){
        $scope.asignaturas = response;

        if (response.error) {
          //alert("Error:"+response.error);
          $scope.error=response.error;
          $scope.openModal();
        }

        return asignaturas;
      }, function(err) {
        //alert('ERR', err);
        // err.status will contain the status code
        asignaturas = "No ha sido posible mostrar las asignaturas"
        return asignaturas
      });
  });
  
  $scope.remove = function(asignatura) {
    Expediente.remove(asignatura);
  };

  $ionicModal.fromTemplateUrl('templates/error.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })  

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $state.go("login");
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

}])

.controller('AsignaturaCtrl', function($scope, $stateParams, Expediente) {
  $scope.asignatura = Expediente.get($stateParams.cod_asignatura);
})

.controller('LoginCtrl', ['$scope', 'LoginService', '$ionicPopup', '$state', function($scope, LoginService, $ionicPopup, $state) {
    $scope.user = {};
    $scope.login = function() {
        LoginService.loginUser($scope.user.username, $scope.user.password).success(function(token) {
          $scope.token = token;
          var alertPopup = $ionicPopup.alert({
                title: 'Login',
                template: "Bienvenido "+$scope.user.username+"!"
          });
          $state.go('tab.avisos');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'No pudo ser!',
                template: 'Inténtalo de nuevo.'
            });
        });
    }
}])
