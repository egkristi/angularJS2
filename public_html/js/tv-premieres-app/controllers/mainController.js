app.controller("mainController", ["$scope", function($scope) {
    $scope.results = [];
    $scope.filterText = null;
    $scope.availableGenres = [];
    $scope.genreFilter = null;
    $scope.orderFields = ["Air Date", "Rating"];
    $scope.orderField = "Air Date";
    $scope.orderReverse = false;

    // Sample data (trakt.tv API v1 is no longer available)
    var sampleData = [
        {
            date: "2026-04-26",
            episodes: [
                {
                    show: { title: "Northern Lights", air_day: "Monday", air_time: "9:00pm", network: "NRK", genres: ["drama", "sci-fi"] },
                    episode: { title: "Pilot", season: 1, overview: "A mysterious aurora borealis event over Tromsø triggers unexplainable phenomena.", first_aired: 1745625600, images: { screen: "https://placehold.co/300x170/0074cd/white?text=Northern+Lights" }, ratings: { loved: 312, hated: 18, percentage: 87 } }
                },
                {
                    show: { title: "Codec", air_day: "Monday", air_time: "10:00pm", network: "HBO", genres: ["drama", "thriller"] },
                    episode: { title: "Zero Day", season: 1, overview: "A cryptographer discovers a hidden message embedded in internet traffic that predicts global events.", first_aired: 1745629200, images: { screen: "https://placehold.co/300x170/333/white?text=Codec" }, ratings: { loved: 540, hated: 45, percentage: 78 } }
                }
            ]
        },
        {
            date: "2026-04-27",
            episodes: [
                {
                    show: { title: "Frost & Fire", air_day: "Tuesday", air_time: "8:00pm", network: "Netflix", genres: ["fantasy", "adventure"] },
                    episode: { title: "The Awakening", season: 1, overview: "In a world where seasons last decades, a young woman discovers she can control both ice and flame.", first_aired: 1745712000, images: { screen: "https://placehold.co/300x170/e74c3c/white?text=Frost+%26+Fire" }, ratings: { loved: 892, hated: 67, percentage: 91 } }
                },
                {
                    show: { title: "Byte Me", air_day: "Tuesday", air_time: "9:30pm", network: "Comedy Central", genres: ["comedy"] },
                    episode: { title: "Hello World", season: 1, overview: "A group of developers at a failing startup accidentally create an AI that roasts their code.", first_aired: 1745717400, images: { screen: "https://placehold.co/300x170/2ecc71/white?text=Byte+Me" }, ratings: { loved: 1203, hated: 102, percentage: 85 } }
                }
            ]
        },
        {
            date: "2026-04-28",
            episodes: [
                {
                    show: { title: "The Deep Road", air_day: "Wednesday", air_time: "9:00pm", network: "Apple TV+", genres: ["thriller", "mystery"] },
                    episode: { title: "Descent", season: 1, overview: "An investigative journalist follows a cold case trail into an abandoned mining complex beneath the mountains.", first_aired: 1745798400, images: { screen: "https://placehold.co/300x170/8e44ad/white?text=The+Deep+Road" }, ratings: { loved: 445, hated: 32, percentage: 82 } }
                },
                {
                    show: { title: "Galactic Diner", air_day: "Wednesday", air_time: "8:00pm", network: "Disney+", genres: ["sci-fi", "comedy"] },
                    episode: { title: "Order Up", season: 1, overview: "A greasy spoon diner floating in deep space becomes the unlikely meeting point for alien diplomats.", first_aired: 1745794800, images: { screen: "https://placehold.co/300x170/f39c12/white?text=Galactic+Diner" }, ratings: { loved: 678, hated: 89, percentage: 72 } }
                },
                {
                    show: { title: "Stronghold", air_day: "Wednesday", air_time: "10:00pm", network: "Amazon Prime", genres: ["drama", "action"] },
                    episode: { title: "Foundation", season: 1, overview: "After a devastating earthquake, communities compete to build fortified settlements in the Norwegian wilderness.", first_aired: 1745805600, images: { screen: "https://placehold.co/300x170/1abc9c/white?text=Stronghold" }, ratings: { loved: 256, hated: 41, percentage: 65 } }
                }
            ]
        }
    ];

    function loadData(data) {
        angular.forEach(data, function(day) {
            angular.forEach(day.episodes, function(tvshow) {
                tvshow.date = day.date;
                $scope.results.push(tvshow);
                angular.forEach(tvshow.show.genres, function(genre) {
                    if ($scope.availableGenres.indexOf(genre) === -1) {
                        $scope.availableGenres.push(genre);
                    }
                });
            });
        });
        $scope.availableGenres.sort();
    }

    $scope.setGenreFilter = function(genre) {
        $scope.genreFilter = genre;
    };

    $scope.clearGenreFilter = function() {
        $scope.genreFilter = null;
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
    loadData(sampleData);
}]);
