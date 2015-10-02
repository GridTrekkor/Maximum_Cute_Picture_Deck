$(function(){

    var pictureArray = [];
    var availableImageNumber = 0;

    var getImage = function (i, location) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/' + i,
            complete: function(){
            },success: function(data) {
                $(".results").append("<img class='pic' data-location='" + location + "' data-id='" + i + "' src=" + data + ">");
            }
        }
    )};

    var showPictures = function() {
        var pictureArray = [0, 1, 2, 3, 4, 5];
        var i = 0;

        shuffle(pictureArray);
        while (i < 5) {
            getImage(pictureArray[i], i);
            i++;
        }
        availableImageNumber = pictureArray[5];
    };

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    //Display initial 5 pictures
    showPictures();

    //click the shuffle pictures button
    $('#shufflePictures').on('click', function() {
        $(".results").empty();
        showPictures();
    });

    //click new image button
    $(document).on("click", ".pic", function() {

        var currentImageNumber = parseInt(($(this).attr('data-id')));

        var currentLocation = $(this);
        var aIN = availableImageNumber;
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/' + availableImageNumber,
            complete: function(){
            },success: function(data){
                currentLocation.attr("src", data);
                currentLocation.attr("data-id", aIN);
             }
        });

        availableImageNumber = currentImageNumber;

    });

});