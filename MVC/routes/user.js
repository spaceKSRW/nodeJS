const express = require("express");
const router = express.Router();

const {
  handleGetAllUsers,
  getUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser)

router.route("/:id")
  .get(getUserById)
  .delete(handleDeleteUserById);

router.patch("/:id/:edit", handleUpdateUserById);

module.exports = router;
