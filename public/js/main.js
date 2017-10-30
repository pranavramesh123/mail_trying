var app = angular.module('app', ['ngRoute']);
//address line controls by angular
app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
}]);
app.controller('Ctrl', function ($scope, $http) {
    $http.get('http://localhost:8000/Mail').then(function successCallback(response) {
        $scope.myWelcome = response.data;
    }, function errorCallback(response) {
        console.log("Error!!!" + response.err);
    });
    //    http://localhost:8000/
    // get login of registered user and go tp pass-windos
    $('.nextBtn').on('click', function () {
        for (let i = 0; i < $scope.myWelcome.length; i++) {
            if (mail.value == $scope.myWelcome[i].nick && mail.value != '') {
                $('.sec1').animate({
                    left: '100%'
                }, 300);
                $('.sec2').animate({
                    left: '0'
                }, 300);
                $('.req1').css({
                    display: 'none'
                });
                $('.mail').css({
                    borderBottom: '1px solid lightgrey'
                });
                $('.usermail').text($scope.myWelcome[i].nick + '@gogol.com');
                $('.userName').text($scope.myWelcome[i].name);
                $('.mail').blur();
                break;
            }
            else if (mail.value == '') {
                $('.req1').css({
                    display: 'block'
                });
                $('.mail').css({
                    borderBottom: '1px solid red'
                });
            }
            else {
                if (i == $scope.myWelcome.length - 1) {
                    $('.req1').text('User undefined.');
                    $('.req1').css({
                        display: 'block'
                    });
                    $('.mail').css({
                        borderBottom: '1px solid red'
                    });
                }
            }
        }
    }); 
    //authorization
    $scope.auth = function () {
        for (let i = 0; i < $scope.myWelcome.length; i++) {
            if ($scope.myPass == $scope.myWelcome[i].pass) {
                $('.mailArea').css({
                    visibility: 'visible'
                });
                $('#req3').css({
                    visibility: 'hidden'
                });
                $('.passInput').css({
                    borderBottom: '1px solid lightgrey'
                });
                $scope.myForm4.$invalid = true;
            }
            else {
                $('#req3').css({
                    visibility: 'visible'
                });
                $('.passInput').css({
                    borderBottom: '1px solid red'
                });
            }
        }
    };
    //generate pass for sms verf
    $scope.createNew = function () {
        if ($scope.pass == $scope.rePass) {
            $('.sec4').css({
                visibility: 'visible'
            });
            $scope.code = Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000;
            var obj3 = {
                code: $scope.code
                , number: '+380' + $scope.phone
            };
            $http.post('http://localhost:8000/testtwilio', obj3).then(function successCallback(response) {}, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
        }
        else {
            document.getElementsByName('rePass')[0].value = '';
            document.getElementsByName('rePass')[0].placeholder = 'Pass not match.'
        }
    } 
    //if codes passes -> create new acc
    $scope.fCreate = function () {
            if ($scope.newCode == $scope.code) {
                $('.sec4').css({
                    visibility: 'hidden'
                });
                var obj = {
                    name: $scope.name
                    , nick: $scope.nick
                    , pass: $scope.pass
                    , gender: $scope.gender
                    , phone: $scope.phone
                };
                $http.post('http://localhost:8000/Mail', obj).then(function successCallback(response) {
                    console.log("Success!");
                    $('.sec1').animate({
                        left: '0'
                    }, 300);
                    $('.sec3').animate({
                        left: '100%'
                    }, 300);
                    $('.logo').css({
                        visibility: 'visible'
                    });
                    document.getElementsByClassName('usInf')[0].value = '';
                    document.getElementsByClassName('usInf')[1].value = '';
                    document.getElementsByClassName('usInf')[2].value = '';
                    document.getElementsByClassName('usInf')[3].value = '';
                    document.getElementsByClassName('usInf')[4].value = '';
                }, function errorCallback(response) {
                    console.log("Error!!!" + response.err);
                });
                $http.get('http://localhost:8000/Mail').then(function successCallback(response) {
                    $scope.myWelcome = response.data;
                }, function errorCallback(response) {
                    console.log("Error!!!" + response.err);
                });
            }
            else {
                document.getElementsByClassName('codeInp')[0].value = '';
                $('.codeInp').attr('placeholder', 'Wrong number.');
                console.log('wrong number');
            }
        }
        //    sending letter (FS)
    $scope.sendLetter = function () {
        let obj = {
            from: $scope.login
                //            + '(' + document.getElementsByClassName('usermail')[0].innerHTML + ')'
                
            , to: $scope.toUser
            , text: $scope.textUser
        , };
        $http.post('http://localhost:8000/send-mail', obj).then(function successCallback() {
            console.log("Sent!");
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
        $scope.myForm3.$invalid = true;
    };
    //    checking inmail
    $scope.check = function () {
        //        a=$scope.login+ '(' + document.getElementsByClassName('usermail')[0].innerHTML + ')'
        let obj = {
            login: $scope.login
        };
        $http.post('http://localhost:8000/check-mail', obj).then(function successCallback(response) {
            $scope.arr = response.data;
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
    };
    //    checking outmail
    $scope.check2 = function () {
        let obj = {
            login: $scope.login
        };
        $http.post('http://localhost:8000/check-mail2', obj).then(function successCallback(response) {
            $scope.arr2 = response.data;
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
    };
});