import { expect } from 'chai';
import {ConstantsOWNZONES} from "./config/constants"
var http = require('http');

describe('Image simple wrong.', () =>  {
    it('should return error \'404\' on download image that does not exist', function(done)  {
        this.timeout(15000);
        http.get({
            host: ConstantsOWNZONES.testingAddress,
            port: ConstantsOWNZONES.testingPort,
            path: '/image/DOESNOTEXIST.jpg'
            }, function(response) {
                // Continuously update stream with data
                var body: any = [];
                response.on('data', function(d) {
                    body.push(d)
                });
                response.on('end', function() {
                    var statusCode = response.statusCode
                    expect(statusCode).to.equal(404);
                    done()
                });
            });  
    });
});