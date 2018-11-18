import * as ImageDeliveryModel from '../models/ImageDeliveryModel';
import { Request, Response } from 'express';
import {ConstantsOWNZONES} from "../config/constants";
var path = require('path');
const imageDelivery: ImageDeliveryModel.ImageDeliveryModel = new ImageDeliveryModel.ImageDeliveryModel();

/*
    Image Controller class to handle routes and 
    deliver responses to client.
*/
export class ImageDeliveryController{

    constructor(){}

    /*
        endpoint route to check for number of images 
        in resource folder on the server
    */
    public numberImages(req: Request, res: Response) {   
        imageDelivery.numberOfImages(function(number){
            if (number == null) {
                res.writeHead(404, {
                    "message": 'Problem processing.'
                });
                res.end();
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                });

                res.write(JSON.stringify({
                    "number_of_files": number   
                }));
                res.end()
            }
        })
    }

    /*
        endpoint route to download images

        Parse URL and check for eventual parameters/query
    */
    public downloadImage(req,res) {
        var URL = require("url")
        const querystring = require('querystring');
        const myURL = req.originalUrl;
        let parsedUrl = URL.parse(myURL);  
        let parsedQs = querystring.parse(parsedUrl.query);
        let paths = parsedUrl.pathname.split("/")
        let fileName: string = paths[paths.length-1]
        let filePath: string = path.join(ConstantsOWNZONES.imgDirectory, fileName)
        let width: number = 0
        let height: number = 0
        if (parsedQs.size) {
            /*
                query parameters on URL
                Check if it wants to resize.
            */
            try {
                let splitQuery = parsedQs.size.split("x")
                let newWidth: number = Number(splitQuery[0])
                let newHeight: number = Number(splitQuery[1])
                if (newWidth > 0 && newHeight > 0) {
                    width = newWidth
                    height = newHeight
                }
            } catch (e) {
                // no size parameters
                console.log("Exception deliver image: ", e)
            }
        }
        imageDelivery.downloadImage(myURL, filePath, width, height, function(image){
            /*
                Get controller returned value and send the response to the client.
            */
            if (image == null) { //image not found
                res.writeHead(404, {
                    "Content-Type": "application/octet-stream",
                    "Content-Disposition": "attachment; filename=" + fileName,
                    "message": 'Problem processing.'
                });
                res.end();
            } else { 
                res.writeHead(200, {
                    "Content-Type": "application/octet-stream",
                    "Content-Disposition": "attachment; filename=" + fileName
                });
                res.write(image,"binary");
                res.end();
            }
        });
    }
}