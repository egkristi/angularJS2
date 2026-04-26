app.controller("mainController", ["$scope", "$http", function($scope, $http) {
    $scope.results = [];
    $scope.filterText = null;
    $scope.availableGenres = [];
    $scope.genreFilter = null;
    $scope.orderFields = ["Air Date", "Rating"];
    $scope.orderField = "Air Date";
    $scope.orderReverse = false;
    $scope.loading = true;
    $scope.error = null;

    function stripHtml(html) {
        if (!html) return '';
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    function formatDate(offset) {
        var d = new Date();
        d.setDate(d.getDate() + offset);
        return d.getFullYear() + '-' +
            ('0' + (d.getMonth() + 1)).slice(-2) + '-' +
            ('0' + d.getDate()).slice(-2);
    }

    function processEntry(entry, date) {
        if (!entry.show || !entry.show.name) return null;
        if (!entry.show.image) return null;

        var rating = (entry.show.rating && entry.show.rating.average) || 0;

        return {
            date: date,
            show: {
                title: entry.show.name,
                air_day: (entry.show.schedule && entry.show.schedule.days && entry.show.schedule.days[0]) || '',
                air_time: (entry.show.schedule && entry.show.schedule.time) || '',
                network: entry.show.network ? entry.show.network.name :
                         (entry.show.webChannel ? entry.show.webChannel.name : 'N/A'),
                genres: entry.show.genres || []
            },
            episode: {
                title: entry.name || 'TBA',
                season: entry.season || 1,
                number: entry.number || null,
                overview: stripHtml(entry.summary || entry.show.summary || ''),
                first_aired: entry.airstamp ? new Date(entry.airstamp).getTime() / 1000 : 0,
                images: {
                    screen: entry.show.image.medium
                },
                ratings: {
                    average: rating,
                    percentage: Math.round(rating * 10)
                }
            }
        };
    }

    function loadSchedule() {
        var dates = [formatDate(0), formatDate(1), formatDate(2)];
        var completed = 0;

        angular.forEach(dates, function(date) {
            $http.get('https://api.tvmaze.com/schedule?country=US&date=' + date)
                .then(function(response) {
                    angular.forEach(response.data, function(entry) {
                        var tvshow = processEntry(entry, date);
                        if (tvshow) {
                            $scope.results.push(tvshow);
                            angular.forEach(tvshow.show.genres, function(genre) {
                                if ($scope.availableGenres.indexOf(genre) === -1) {
                                    $scope.availableGenres.push(genre);
                                }
                            });
                        }
                    });
                })
                .catch(function() {
                    // silently handle individual date failures
                })
                .finally(function() {
                    completed++;
                    if (completed === dates.length) {
                        $scope.availableGenres.sort();
                        $scope.loading = false;
                        if ($scope.results.length === 0) {
                            $scope.error = 'Could not load TV schedule. Please try again later.';
                        }
                    }
                });
        });
    }

    $scope.setGenreFilter = function(genre) {
        $scope.genreFilter = genre;
    };

    $scope.customOrder = function(tvshow) {
        switch ($scope.orderField) {
            case "Air Date":
                return tvshow.episode.first_aired;
            case "Rating":
                return tvshow.episode.ratings.percentage;
        }
    };

    // Initialize
    loadSchedule();
}]);
