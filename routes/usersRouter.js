const { Router } = require("express");
const router = Router();

const usersController = require("../controllers/usersController");

router.get("/", usersController.usersListGet);

router.get("/create", usersController.usersCreateGet);
router.post("/create", usersController.usersCreatePost);

router.get("/:id/update", usersController.usersUpdateGet);
router.post("/:id/update", usersController.usersUpdatePost);

router.get("/search", usersController.userSearchGet);

router.post("/:id/delete", usersController.userDeletePost);

module.exports = router;
