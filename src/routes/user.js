"use strict"

const router = require('express').Router()
const user = require("../controllers/user")

router.route("/").get(user.list).post(user.create)

module.exports = router