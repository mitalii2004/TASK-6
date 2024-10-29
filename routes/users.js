var express = require('express');
var router = express.Router();
const upload = require('../helpers/upload')


const controllers = require("../controllers/index");

router.post("/register", upload.single('profilePic'), controllers.userController.register);
 router.get("/mail", controllers.sendMailer.sendMail);


module.exports = router;