# Boian Radu #
## Ownzones Node.js Challenge ##

### Image Delivery Microservice ###
* Docker
* Typescript
* **expressJs framework**
* **jimp** package for image manipulation
* **memory-cache** to cache requests data
* Other source images can be added in folder at any time while the service is running
* Include automated tests written using Mocha and Chai
* Designed for performance
* Cached requested images (some resized) for 30 seconds.
* Expose stats about the number of original files.

### Functionalities ###
The microservice is based on NodeJS, express, Typescript.
The server listens on port 4040 with configuration present in './src/config/constants.ts'
Server enables a route logic between the app and the components structured by route-controller-model.
The service calls for specific file inside folder on each request and does not require images to be stored inside a variable. So far so good, that means it can send images that were not present on the server at start and they were **added while running**.


### API ###
* each call on the server is catched by a Middleware, then parsed by specified route
* routes:
* "/" - route request which only responds with 200 StatusCode
* "/image*" - which handle image downloads from './resources' directory
    it accepts calls like:
        /image/<name_image><extension_image>
        /image/<name_image><extension_image><width>**x**<height>
* "/number_images" - which returns the number of files presented in './resources' directory

### Tests ###
#### The application tests are structured in multiple **.ts** files. ####
* test_get_multiple_dimensions.ts - iterate an array of hard-coded images known as legitimate on server and test if they can be downloaded with different sizes to check those sizes (possible and not possible ones)
* test_get_multiple_images.ts - iterate an array of hard-coded images known as legitimate on server and test if they can be downloaded.
* test_image_simple.ts - test if an image can be downloaded and verify the resulted object.
* test_number_of_images.ts - test if the path './number_images' works correctly.
* test_wrong_image_simple.ts - test if a non-existent image on server can crash it and what it returns.
As the service is fed with some custom images. The tests can run either by adding new ones inside the directory.

The applications tests contains a directory named **client_download** that has two javascript files. One can download and store the images downloaded from the server inside the directory they were executed. The other one can request number of files presented inside ./resources directory from server. 

## RUN ##
Tested on Ubuntu 18.04
--
unzip project.
cd project

--
* docker build -t radu.boian/ownzones_challenge -f Dockerfile.production .
* docker build -t radu.boian/ownzones_challenge_test -f Dockerfile.test .
--
* docker network create ownzones
* docker container run --rm --name ownzones -d -P --network=ownzones radu.boian/ownzones_challenge
* docker container run --rm --name ownzones_test  --network=ownzones radu.boian/ownzones_challenge_test

To run the test on local machine.
Tested on Windows 10.
Change constant variable **testingAddress** inside ./tests/config/constants.js to **localhost**