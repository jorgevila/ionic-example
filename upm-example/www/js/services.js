angular.module('starter.services', [])

.factory('Expediente', [ '$http', '$state', function($http, $state) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var asignaturas = [];

  return {
    all: function(token) {
      //console.log("http://149.202.115.63/expediente?token="+token);
      return $http.get("http://149.202.115.63/expediente?token="+token).then(function(response){
        asignaturas = response.data;
        return asignaturas;
      }, function(err) {
        //alert('ERR', err.status);
        // err.status will contain the status code
        asignaturas = [];
        $state.go("error");
        return asignaturas
      });
        
    },
    remove: function(asign) {
      asignaturas.splice(asignaturas.indexOf(asign), 1);
    },
    get: function(asign_id) {
      for (var i = 0; i < asignaturas.length; i++) {
        if (parseInt(asignaturas[i].cod_asignatura) === parseInt(asign_id)) {
          return asignaturas[i];
        }
      }
      return null;
    }
  };
}])

.factory('LoginService', [ '$http', '$q',  function($http, $q) {
    var token;
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            $http.get("http://149.202.115.63/login?user="+name+"&pass="+ pw).then(function(response){
                if ('token' in response.data) {
                  deferred.resolve(response.data.token);
                  token=response.data.token;
                  return response;
                } else {
                  deferred.reject('No pudo ser.... no había token');
                  return null;
                }
              }, function(err) {
                deferred.reject('No pudo ser....');
                console.log('ERR='+ err.status);
                return null
              });


            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        getToken: function() {
          return token;
        }
    }
}])

;

