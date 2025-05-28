const { Router } = require("express");
const router = Router();

const usersController = require("../controllers/usersController");

router.get("/", usersController.usersListGet);

router.get("/create", usersController.usersCreateGet);
router.post("/create", usersController.usersCreatePost);

router.get("/:id/update", usersController.usersUpdateGet);
router.post("/:id/update", usersController.usersUpdatePost);

module.exports = router;
