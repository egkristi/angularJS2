app.filter('isGenre', function() {
    return function(input, genre) {
        if (!genre) {
            return input;
        }
        var out = [];
        for (var i = 0; i < input.length; i++) {
            if (input[i].show.genres.indexOf(genre) !== -1) {
                out.push(input[i]);
            }
        }
        return out;
    };
});