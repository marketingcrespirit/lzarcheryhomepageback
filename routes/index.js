const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");

router.get("/users", indexController.getUsers);

router.post("/user", indexController.postUser);

router.post("/homepageUser", indexController.postHomepageUser);



module.exports = router;