const usersStorage = require("../storage/usersStorage");

const { body, validationResult } = require("express-validator");
const alphaErr = "must only contain letter";
const lengthErr = "must be between 1 - 10 characters";
const bioLengthErr = "must be between 1 - 10 characters";
const emailErr = "Invalid email format";
const numErr = "must be number from 18 to 120";

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
  body("email").trim().isEmail().withMessage(`emailErr`),
  body("age")
    .optional({ values: "falsy" })
    .trim()
    .isNumeric()
    .withMessage(`Age ${numErr}`),
  body("bio")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 0, mas: 200 })
    .withMessage(`Bio ${bioLengthErr}`),
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

      const { firstName, lastName, email, age, bio } = req.body;
      try {
        usersStorage.addUsers({ firstName, lastName, email, age, bio });
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

      const { firstName, lastName, email, age, bio } = req.body;
      usersStorage.updateUser(id, { firstName, lastName, email, age, bio });
      res.redirect("/");
    },
  ],

  userSearchGet: (req, res) => {
    const { query } = req.query;
    const users = usersStorage.findUserbyNameOrEmail(query);
    res.render("searchUser", { title: "Search User", users: users });
  },

  userDeletePost: (req, res) => {
    usersStorage.deleteUser(req.params.id);
    res.redirect("/");
  },
};

module.exports = usersController;
