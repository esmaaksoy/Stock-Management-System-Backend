"use strict";

const router = require("express").Router();

const sale = require("../controllers/sale");
const permissions = require("../middlewares/permissions");

router
  .route("/")
  .get(permissions.isStaff, sale.list)
  .post(permissions.isAdmin, sale.create);

router
  .route("/:id")
  .get(permissions.isStaff, sale.read)
  .put(permissions.isAdmin, sale.update)
  .patch(permissions.isAdmin, sale.update)
  .delete(permissions.isAdmin, sale.delete);


module.exports = router;
