import { expect } from 'chai';
import {ConstantsOWNZONES} from "./config/constants"
var http = require('http');
var Jimp = require("jimp")

describe('Test get multiple images by dimensions.', () => {
    let images: string[] = ["ana.jpg", "allyouneed.png", "caprioara.jpg",
                        "cat_1.jpg", "dog_1.jpg", "dog_2.jpg", "dog_3.jpg",
                        "dog_4.jpg", "dog_5.jpg", "dog_6.jpg", "dog_7.jpg",
                        "lilpows.png", "pasari.jpg", "pasarici.jpg",
                        "perfect.jpg", "smileandwave.png"]
    let rightSizes = [  [400,600], 
                        [200,155], 
                        [322,900], 
                        [200,300], 
                        [16, 12], 
                        [200,300]
                    ]
    let wrongSizes = [  [0,-1], 
                        [null,0], 
                        [null,null]
                    ]

    for (let img of images)
    {

        /*
            test download every image by every size presented in above arrays
        */
        for (let size of rightSizes)
        {
            it('should download ' + img + ' and test size if match ' + size[0] + size[1], function(done)  {
                this.timeout(15000);
                    http.get({
                        host: ConstantsOWNZONES.testingAddress,
                        port: ConstantsOWNZONES.testingPort,
                        path: '/image/' + img + '?size=' + size[0] +'x' + size[1]
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
                                        expect(result[0]).to.be.equal(size[0]);
                                        expect(result[1]).to.be.equal(size[1]);
                                        done()
                        });
                    });
                });  
            });
        }

         /*
            test download every image by every wrong size presented in above arrays
        */
       for (let size of wrongSizes)
       {
           it('should download ' + img + ' wth wrong size  and not modify dimensions', function(done)  {
               this.timeout(15000);
                   http.get({
                       host: ConstantsOWNZONES.testingAddress,
                       port: ConstantsOWNZONES.testingPort,
                       path: '/image/' + img + '?size=' + size[0] +'x' + size[1]
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
                                       expect(result[0]).to.not.be.equal(size[0]);
                                       expect(result[1]).to.not.be.equal(size[1]);
                                       done()
                       });
                   });
               });  
           });
       }
    }
  
});