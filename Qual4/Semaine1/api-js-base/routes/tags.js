const express = require('express')
const router = express.Router()
const TagController = require('../controllers/tags')

router.get('/',TagController.getAllTags) 

module.exports = router