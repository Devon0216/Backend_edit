const express = require('express')
const router = express.Router()
const miroController = require('../controllers/miroController')

router.route('/')
    .get(miroController.redirectToMiro)

module.exports = router