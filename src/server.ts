import app from "./app";
import {ConstantsOWNZONES} from "./config/constants";

/*
  Start server to listen on specified port on localhost.
*/
app.listen(ConstantsOWNZONES.serverPort, function() {
  console.log('OWNZONES Challenge server listening on port:', ConstantsOWNZONES.serverPort);
});