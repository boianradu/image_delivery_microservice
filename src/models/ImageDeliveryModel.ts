import {ConstantsOWNZONES} from "../config/constants";
var Jimp = require("jimp");
var mcache = require("memory-cache");
const fs = require('fs');


/*
    Image Model class to interact with image
    files and resource directory and serve response to
    the controller.
*/
export class ImageDeliveryModel {
    constructor(){}

    /*
        try to read directory for number of images inside it
    */
    numberOfImages(callback){
        fs.readdir(ConstantsOWNZONES.imgDirectory, (err, files) => {
            if (err) {
                console.log("Problem reading files directory. Err:", err)
                callback(null)
            } else {
                callback(files.length);
            }
          });
    }

    /*
        try to read the directory for requested image
    */
    downloadImage(myURL: string, filePath: string, width: number, height: number, callback){
        /*
            check if cached already
        */
        let cacheBody = mcache.get(myURL)
        if (cacheBody) { //cached
            console.log("Found in cache:", myURL)
            callback(cacheBody)
        } else { //not cached
            try{
                Jimp.read(filePath, (err, foundImage) => {
                    if (err) {
                        callback(null)
                    } else {
                        try {
                            if (width > 0 && height > 0){
                                foundImage.resize(width, height) // resize
                            }
                            foundImage.getBuffer(Jimp.MIME_JPEG,function(err, buffer){
                                if (err){
                                    callback(null)
                                } else {
                                    // Save the Wikipedia API response in Redis store
                                    mcache.put(myURL, buffer, ConstantsOWNZONES.timeCache*1000, function(key, value) {
                                        console.log("Delete from cache:" + myURL);
                                    }); // Time in ms // 3 seconds cache
                                    
                                    callback(buffer)
                                }
                            })
                        } catch (error) {
                            callback(null)
                        }
                    }
                });
            } catch(exceptionJimpRead){
                console.log("Error JIMP Read:", exceptionJimpRead)
                callback(null)
            }
        }
    }
}