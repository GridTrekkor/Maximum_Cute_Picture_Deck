$(function(){

    var availableImageNumber = 0;

    // get full image set
    var getImage = function (i, location) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/' + i,
            complete: function(){
            }, success: function(data) {
                $(".results").append("<img class='pic' data-location='" + location + "' data-id='" + i + "' src=" + data + ">");
            }
        }
    )};

    var showPictures = function() {
        // set initial array of picture numbers to use
        var pictureArray = [0, 1, 2, 3, 4, 5];
        var i = 0;
        // shuffle picture number array before displaying pictures
        shuffle(pictureArray);
        while (i < 5) {
            getImage(pictureArray[i], i);
            i++;
        }
        // set first available (on-bench) image to the last picture number (which is unused) in array
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
        // clear all pictures before showing new set
        $(".results").empty();
        showPictures();
    });

    //click new image button
    $(document).on("click", ".pic", function() {

        // get image number of picture user clicked on
        var currentImageNumber = parseInt($(this).attr('data-id'));
        // get document location of that picture
        var currentLocation = $(this);
        // create new var to make availableImageNumber available to ajax call
        var aIN = availableImageNumber;

        // make ajax call for new (single) image
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/' + availableImageNumber,
            complete: function(){
            }, success: function(data) {
                currentLocation.attr("src", data);
                currentLocation.attr("data-id", aIN);
            }
        });

        // set new available image number to the image number we swapped out
        availableImageNumber = currentImageNumber;

    });

});