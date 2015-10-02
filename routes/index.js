var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var jsonquery = require('json-query');


var fileLocation = path.join(__dirname, '../model/data.json');

console.log("fileLocation: ",fileLocation);
console.log("__dirname: : ", __dirname);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../views/index.html"))
});

router.get('/:id?', function(req, res, next){
        var id = req.params.id;
        console.log("router get id: ", id);

        if (id != "favicon.ico") {



        fs.readFile(fileLocation, function (err, data) {


            var obj = JSON.parse(data);
            //console.log(obj[id].link);
            //console.log(id);


            var query = getJsonQueryString('id', id);


            if (id) {
                var picture = jsonquery(query, {data: obj});

                var pictureNumber = id;
                console.log("pictureNumber: ", pictureNumber);
                res.json(obj[pictureNumber].link);
                //var worker = obj[id];
                //res.json(picture);
            } else {
                res.json(obj);
            }

        })
    }

});

function getJsonQueryString(key, value){
    var queryString = '[' + key + '=' + value + ']';
    //console.log('Generate query string: ' + queryString);
    return queryString;
}



module.exports = router;
