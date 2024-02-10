const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const {notFound,errorHandler} = require('./middleware/errorHandler')
const sequelize = require('./dbConnection')

const User = require('./models/User')
const Article = require('./models/Article')
const Tag = require('./models/Tag')
const Comment = require('./models/Comments')

const userRoute = require('./routes/users')
const articleRoute = require('./routes/articles')
const commentRoute = require('./routes/comments')
const tagRoute = require('./routes/tags')


const app = express()

//CORS
app.use(cors({credentials: true, origin: true})) 



//RELATIONS:

User.hasMany(Article,{
    onDelete: 'CASCADE'
})
Article.belongsTo(User)

Article.belongsToMany(Tag,{through: 'TagList',uniqueKey:false,timestamps:false})
Tag.belongsToMany(Article,{through: 'TagList',uniqueKey:false,timestamps:false})

Article.hasMany(Comment,{onDelete: 'CASCADE'})
Comment.belongsTo(Article)

User.hasMany(Comment,{onDelete: 'CASCADE'})
Comment.belongsTo(User)




const sync = async () => await sequelize.sync({alter:true})
sync()

app.use(express.json())
app.use(morgan('tiny'))

app.get('/',(req,res) => {
    res.json({status:"API is running"});
})
app.use('/api',userRoute)
app.use('/api/articles',articleRoute)
app.use('/api/articles',commentRoute)
app.use('/api/tags',tagRoute)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.listen(PORT,() => {
    console.log(`Server running on http://localhost:8080`);
})