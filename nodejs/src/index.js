require('./db/mongoose')
const express = require('express');
const routerUser = require('./routers/user')
const routerCate = require('./routers/category')
const routerArticle = require('./routers/article')

const app = express();
const port = process.env.PORT || 3000;

//支持接收json数组
app.use(express.json())
app.use(routerUser)
app.use(routerCate)
app.use(routerArticle)

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})