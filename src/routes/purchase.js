"use strict";

const router = require("express").Router();

const purchase = require("../controllers/purchase");
const permissions = require("../middlewares/permissions");

router
  .route("/")
  .get(permissions.isStaff, purchase.list)
  .post(permissions.isAdmin, purchase.create);

router
  .route("/:id")
  .get(permissions.isStaff, purchase.read)
  .put(permissions.isAdmin, purchase.update)
  .patch(permissions.isAdmin, purchase.update)
  .delete(permissions.isAdmin, purchase.delete);

module.exports = router;
