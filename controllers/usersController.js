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
    ...validateUser,
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("createUser", {
          title: "Create User",
          errors: errors.array(),
        });
      }

      const { firstName, lastName } = req.body;
      try {
        usersStorage.addUsers({ firstName, lastName });
        res.redirect("/");
      } catch (storageError) {
        console.log("Error adding user to storage: ", storageError);
        return res
          .status(500)
          .render("error", { message: "Failed to add user" });
      }
    },
  ],

  usersUpdateGet: (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    if (user) {
      res.render("updateUser", { title: "Update User", user: user });
    } else {
      res.render("updateUser", {
        title: "Update User",
        errors: "Cannot Find User",
      });
    }
  },

  usersUpdatePost: [
    ...validateUser,
    (req, res) => {
      const id = req.params.id;
      const user = usersStorage.getUser(id);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("updateUser", {
          title: "Update User",
          user: user,
          errors: errors.array(),
        });
      }

      const { firstName, lastName } = req.body;
      usersStorage.updateUser(id, { firstName, lastName });
      res.redirect("/");
    },
  ],
};

module.exports = usersController;
