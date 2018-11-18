import * as express from "express";
import * as bodyParser from "body-parser";
import {ImageRoute} from "./routes/ImageRoute";


/*
    App Class used by the server to initialise
    its component and start listening on specified port.
*/
class App {
    public app: express.Application;
    public routeString: ImageRoute;

    constructor() {
        this.app = express();
        this.routeString = new ImageRoute();
        this.config();
        this.routeString.routes(this.app)
    }
    
    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    }

}

export default new App().app;