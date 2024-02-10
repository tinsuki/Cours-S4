const express = require('express')
const router = express.Router()

const {authByToken} = require('../middleware/auth')

const ArticleController = require('../controllers/articles')

router.get('/',ArticleController.getAllArticles)         
router.post('/',authByToken,ArticleController.createArticle)       
router.get('/:slug',ArticleController.getSingleArticleBySlug)       
router.patch('/:slug',authByToken,ArticleController.updateArticle)  
router.delete('/:slug',authByToken,ArticleController.deleteArticle) 

module.exports = router