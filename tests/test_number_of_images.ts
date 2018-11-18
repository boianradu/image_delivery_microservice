import { expect } from 'chai';
import {ConstantsOWNZONES} from "./config/constants"
var http = require('http');

describe('Test number of images.', () =>  {
    it('should return number of images from server, >=0', function(done)  {
        this.timeout(15000);
        http.get({
            host: ConstantsOWNZONES.testingAddress,
            port: ConstantsOWNZONES.testingPort,
            path: '/number_images'
            }, function(response) {
                // Continuously update stream with data
                var body = '';
                response.on('data', function(data) {
                    body+=data
                });
                response.on('end', function() {
                    var statusCode = response.statusCode
                    expect(statusCode).to.equal(200);
                    var responseServer = JSON.parse(body)
                    expect(responseServer.number_of_files).to.be.an('number')
                    expect(responseServer.number_of_files).to.be.above(-1)
                    done()
            });
        });
    });
});