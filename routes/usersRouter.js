const { Router } = require("express");
const router = Router();

const usersController = require("../controllers/usersController");

router.get("/", usersController.usersListGet);
router.get("/create", usersController.usersCreateGet);
router.post("/create", usersController.usersCreatePost);

module.exports = router;
