"use strict";

const router = require("express").Router();

const { isAdmin } = require("../middlewares/permissions");
const token = require("../controllers/token");

router.use(isAdmin);

router.route("/").get(token.list).post(token.create);

router
  .route("/:id")
  .get(token.read)
  .put(token.update)
  .patch(token.update)
  .delete(token.delete);
  
module.exports = router;
