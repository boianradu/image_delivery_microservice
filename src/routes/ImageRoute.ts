import {Request, Response} from "express";
import {ImageDeliveryController} from "../controllers/ImageDeliveryController";


/*
    Server Routing calls.
*/
export class ImageRoute { 
    constructor(){}
    
    public imageDeliveryController: ImageDeliveryController = new ImageDeliveryController() 
    
    public routes(app): void {   

        /*
            Middleware for each call.
        */
        app.get('*', function(req, res, next) {
            // console.log("Original URL", req.originalUrl)
            next()
        });
        app.route('/')
            .get((req: Request, res: Response, next) => {            
                res.status(200).send({
                    message: 'Get on root.'
                })
                next()
        })
        
        // any image request 
        app.route('/image*')
            .get(this.imageDeliveryController.downloadImage)
        // image number request
        app.route('/number_images')
            .get(this.imageDeliveryController.numberImages)
    }
}