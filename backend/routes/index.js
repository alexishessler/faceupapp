var express = require('express');
var router = express.Router();

const fileUpload = require('express-fileupload');

router.use(fileUpload());

const cloudinary = require('cloudinary');
const request = require('request');

cloudinary.config({
  cloud_name: '',
  api_key: 'API KEY',
  api_secret: 'API KEY'
});

const subscriptionKey = 'YOUR API KEY';

var pictureModel = require('../models/picture');

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(pictureModel)
  res.render('index', { title: 'Express' });
});

router.get('/pictures', function(req, res, next){
  pictureModel.find(function(err, data){
    res.json({result: true, data})
  })
})


/* POST NEW PHOTO */
router.post('/upload', function(req, res, next) {
var randomName = Math.floor(Math.random() * 1000000)
var photoPath = `public/images/nomImageAChoisir-${randomName}.jpg`;
var filename = req.files.photo;

console.log(filename)
   filename.mv(photoPath, function(err) {
     if (err){
       return res.status(500).send(err);
     }

     cloudinary.v2.uploader.upload(photoPath,
         function(error, result){
           if(result){
             console.log(result)

             console.log("je suis ici")

             // API AI
             // const imageUrl = result.secure_url;
             // need to resize the img to share it with azure
            const imageUrl = 'https://res.cloudinary.com/da4pvqajx/image/upload/w_400,h_600/v1549892395/'+result.public_id+'.jpg'
             // https://res.cloudinary.com/demo/image/upload/w_400,h_700,c_crop/sample.jpg
             // https://res.cloudinary.com/da4pvqajx/image/upload/v1549891751/c1wf2almwuwvhnwocdrd.jpg

             // API AI
             // Request parameters.
             const params = {
                 'returnFaceId': 'true',
                 'returnFaceLandmarks': 'false',
                 'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
                     'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
             };

             // API AI
             const options = {
                 uri: uriBase,
                 qs: params,
                 body: '{"url": ' + '"' + imageUrl + '"}',
                 headers: {
                     'Content-Type': 'application/json',
                     'Ocp-Apim-Subscription-Key' : subscriptionKey
                 }
             };

             request.post(options, (error, response, body) => {
               if (error) {
                 console.log('Error: ', error);
                 return;
               }

               let jsonResponse = JSON.parse(body);
               console.log(jsonResponse);

               if (jsonResponse.length > 0) {
                 console.log("Face detected!")
                 var newPicture = new pictureModel({
                   url: result.secure_url,
                   name: result.original_filename,
                   age: jsonResponse[0].faceAttributes.age,
                   gender: jsonResponse[0].faceAttributes.gender
                 })

                 newPicture.save(function(error, picture){
                   console.log("PICTURE SAVED IN MLAB --> "+picture)
                   res.json({result: true, data: picture })
                 })
               } else {
                 console.log("No Face Detected")
                 res.json({result: false, data: "No face detected" })
               }

             });

           } else {
             console.log(error)
           }
         })
   })
})



module.exports = router;
