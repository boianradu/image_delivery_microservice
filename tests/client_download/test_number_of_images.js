var http = require('http');
var Jimp = require("jimp")
function getNumberImages() {
    return http.get({
        host: "localhost",
        port: "4040",
            path: '/number_images'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(data) {
            body+=data
        });
        response.on('end', function() {
            var statusCode = response.statusCode
            console.log("Status Code:", statusCode)
            if (statusCode == 200){
                var responseServer = JSON.parse(body)
                console.log(responseServer.number_of_files)
            } else {
                console.log("Server error. Status code:", statusCode)
            }
        });
    });
}
getNumberImages();