"use strict"

const router = require('express').Router()

// auth:
router.use('/auth', require('./auth'))

// user:
router.use('/users', require('./user'))

// token:
router.use('/tokens', require('./token'))

// brand:
router.use('/brands', require('./brand'))

// category:
router.use('/categories', require('./category'))

// firm:
router.use('/firms', require('./firm'))

// product:
router.use('/products', require('./product'))

// purchase:
router.use('/purchases', require('./purchase'))

// sale:
router.use('/sales', require('./sale'))

// document:
router.use('/documents', require('./document'))

module.exports = router