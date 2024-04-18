"use strict";

const router = require("express").Router();

const firm = require("../controllers/firm");
const permissions = require("../middlewares/permissions");

router
  .route("/")
  .get(permissions.isStaff, firm.list)
  .post(permissions.isAdmin, firm.create);

router
  .route("/:id")
  .get(permissions.isStaff, firm.read)
  .put(permissions.isAdmin, firm.update)
  .patch(permissions.isAdmin, firm.update)
  .delete(permissions.isAdmin, firm.delete);

module.exports = router;
