
var myModule = angular.module("myModule1", []);
var myController = myModule.controller("myController1", function ($scope, $http) {
    $scope.doFetchAll = function () {
        $http.get("/fetchallVehicleAngular?city=" + $scope.selcity + "&seat=" + $scope.selseats).then(okFx, notOkFx);
        function okFx(response) {

            $scope.jsonAry = response.data;
        }
        function notOkFx(response) {
            alert("couldn't fetch data");
        }

    }
    $scope.contactshow = function (uid) {

        $http.get("/fetchcontactdetails?x=" + uid).then(okFx, notOkFx);
        function okFx(response) {

            alert("contact : " + response.data[0].contact + "\naddress : " + response.data[0].address);
        }
        function notOkFx(response) {
            alert(JSON.stringify(response));
        }
    }
    $scope.getdetails = function (veharray) {
        $scope.vehdetails = veharray;
    }
    $scope.fetchcity = function () {
        $http.get("/fetchcityname").then(okFx, notOkFx);
        function okFx(response) {
            $scope.cityarray = response.data;

        }
        function notOkFx(response) {
            alert(JSON.stringify(response));
        }
    }
    $scope.fetchseats = function () {
        $http.get("/fetchseats").then(okFx, notOkFx);
        function okFx(response) {
            $scope.seatsarray = response.data;

        }
        function notOkFx(response) {
            alert(JSON.stringify(response));
        }
    }


})
