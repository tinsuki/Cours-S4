const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/comments')
const {authByToken} = require('../middleware/auth')

router.get('/:slug/comments',CommentController.getAllComments)                  
router.post('/:slug/comments',authByToken,CommentController.postNewComment)      
router.delete('/:slug/comments/:id',authByToken,CommentController.deleteComment) 

module.exports = router