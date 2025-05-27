const usersStorage = require("../storage/usersStorage");

const { body, validationResult } = require("express-validator");
const alphaErr = "must only contain letter";
const lengthErr = "must be between 1 - 10 characters";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First Name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First Name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last Name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last Name ${lengthErr}`),
];

const usersController = {
  usersListGet: (req, res) => {
    res.render("index", { title: "User List", users: usersStorage.getUsers() });
  },
  usersCreateGet: (req, res) => {
    res.render("createUser", { title: " Create User" });
  },
  usersCreatePost: [
    validateUser,
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("createUser", {
          title: "Create User",
          errors: errors.array(),
        });
      }

      const { firstName, lastName } = req.body;
      usersStorage.addUsers({ firstName, lastName });
      res.redirect("/");
    },
  ],
};

module.exports = usersController;
