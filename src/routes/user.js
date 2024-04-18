"use strict";

const router = require("express").Router();
const user = require("../controllers/user");
const permissions = require("../middlewares/permissions");

// user.list içinde isAdmin kontrolü yaptığım için direk login kontrolü yapıyorum user listelemede:
router.route("/").get(permissions.isLogin, user.list).post(user.create);

router
  .route("/:id")
  .get(permissions.isLogin, user.read)
  .put(permissions.isLogin, user.update)
  .patch(permissions.isLogin, user.update)
  .delete(permissions.isAdmin, user.delete);

module.exports = router;
