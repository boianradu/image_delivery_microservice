var http = require('http');
var Jimp = require("jimp");

function getImage(name, width, height) {
    var checkIfCorrectSize = function(oldWidth, oldHeight, newWidth, newHeight){
        if (oldWidth == newWidth && oldHeight == newHeight){
            return true
        } else {
            return false
        }
    }
    return http.get({
            host: "localhost",
            port: "4040",
            path: '/image/' + name + '?size=' + width +'x' + height
    }, function(response) {
        // Continuously update stream with data
        var body = [];
        response.on('data', function(d) {
            body.push(d)
        });
        response.on('end', function() {
            var statusCode = response.statusCode
            if (statusCode == 200) {
                var binary = Buffer.concat(body)
                Jimp.read(binary)
                    .then(image => {
                        if (checkIfCorrectSize(width, height, image.bitmap.width, image.bitmap.height)) {
                            console.log(name, width, height,"Downloaded OK.")
                            image.write(name.split(".")[0] + "_" + image.bitmap.width + "_" + image.bitmap.height + "." + name.split(".")[1]); // save    
                        } else {
                            console.log(name, width, height,"Error download.")
                        }          
                    })
                    .catch(err => {
                        console.log("Err JIMP:", err)
                    })
            } else {
                console.log("Err getting image from server. Status Code:", statusCode)
            }
        });
    });
}

getImage("ana.jpg", 400, 600)
getImage("ana.jpg", 200, 155)
getImage("ana.jpg", 322, 900)
getImage("ana.jpg", 200, 155)
getImage("ana.jpg", 322, 900)
getImage("ana.jpg", 16, 12)
getImage("ana.jpg", 0, -1)
getImage("ana.jpg", null, 0)
getImage("ana.jpg", null, null)