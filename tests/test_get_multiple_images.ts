import { expect } from 'chai';
import {ConstantsOWNZONES} from "./config/constants"
var http = require('http');
var Jimp = require("jimp")

describe('Test get multiple images.', () => {
    let images: string[] = ["ana.jpg", "allyouneed.png", "caprioara.jpg",
                        "cat_1.jpg", "dog_1.jpg", "dog_2.jpg", "dog_3.jpg",
                        "dog_4.jpg", "dog_5.jpg", "dog_6.jpg", "dog_7.jpg",
                        "lilpows.png", "pasari.jpg", "pasarici.jpg",
                        "perfect.jpg", "smileandwave.png"]
    for (let img of images)
    {
        it('should download ' + img + ' image and test response and its size', function(done)  {
            this.timeout(15000);
                http.get({
                    host: ConstantsOWNZONES.testingAddress,
                    port: ConstantsOWNZONES.testingPort,
                    path: '/image/' + img
                    }, function(response) {
                        // Continuously update stream with data
                        var body: any = [];
                        response.on('data', function(d) {
                            body.push(d)
                        });
                        response.on('end', function() {
                            var binary = Buffer.concat(body)
                            var statusCode = response.statusCode
                            expect(statusCode).to.equal(200);
                            Jimp.read(binary)
                                .then(image => {
                                    return [image.bitmap.width,image.bitmap.height]                  
                                })
                                .then(result =>{
                                    expect(result[0]).to.be.an('number')
                                    expect(result[1]).to.be.an('number')
                                    expect(result[0]).to.be.above(0);
                                    expect(result[1]).to.be.above(0);
                                    done()
                        });
                    });
                });  
        });
    }
  
});