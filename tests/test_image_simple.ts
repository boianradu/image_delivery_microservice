import { expect } from 'chai';
import {ConstantsOWNZONES} from "./config/constants"
var http = require('http');
var Jimp = require("jimp")

describe('Image simple.', () => {
  it('should download ana.jpg image and test response and its size', function(done)  {
    this.timeout(15000);
    http.get({
        host: ConstantsOWNZONES.testingAddress,
        port: ConstantsOWNZONES.testingPort,
        path: '/image/ana.jpg'
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
  
});