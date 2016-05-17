var app = angular.module('myApp');

app.controller('mainCtrl', function ($scope) {

    $scope.callList = [
        {
            name: 'Sam Tailor',
            phone: '2189-3298',
            time: 1288323623006
        },
        {
            name: 'Tom',
            phone: '1189-3298',
            time: 1288323623002
        }
    ];
    $scope.render = function () {
        var localData = localStorage.getItem('list');
        if (localData) {
            $scope.callList = JSON.parse(localData);
            $scope.findNextCall();
        }
    }
    $scope.saveData = function (entry) {
        $scope.callList.push(entry);
        $scope.updateData();
    }
    $scope.removeItem = function (time) {
        // remove by time becouse it is unique for each data item
        _.remove($scope.callList, { 'time': time });
        $scope.updateData();
    };
    $scope.updateData = function () {
        localStorage.setItem('list', JSON.stringify($scope.callList));
        $scope.findNextCall();
    }
    $scope.nextCall = {};
    $scope.findNextCall = function () {
        var allData = $scope.callList,
            result,
            currentTime = new Date().getTime();

        result = _.sortBy(allData, 'time'); // firstly sort all data by time
        result = _.find(result, function (item) {  // then find first near future item
            return item.time >= currentTime;
        });

        $scope.nextCall = result;
    }

    function getFirstFutureEntryDate() {
        var futureData;
        futureData = data.filter(function (i) {
            if (i.inFuture == 1) return i;
        }).sort(function (a, b) {
            var dateA = new Date(a.fullTime),
                dateB = new Date(b.fullTime);
            return dateA - dateB;
        });

        return futureData[0];
    }

    // init app
    $scope.render();
});