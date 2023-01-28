const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false }))  // 解析 application/x-www-form-urlencoded 格式的表单数据的中间件

// 跨域
const cors = require('cors')
app.use(cors())

// 解析Token的中间件
const { expressjwt: expressJWT } = require("express-jwt");
const config = require('./config')
app.use(expressJWT({secret: config.jwtSecretKey, algorithms: ['HS256'],}).unless({path: [/^\/api/, /^\/public/, /^\/my\/homepage/]}))

// 注册路由
const userRouter = require('./router/user')
app.use('/api', userRouter)
const myRouter = require('./router/my')
app.use('/my', myRouter)

// 错误中间件
app.use(function(err, req, res, next) {
    if(err.name == 'UnauthorizedError') {
        return res.send({status: 1, msg: '身份认证失败！'})
    }
})

// 托管静态资源
app.use('/public', express.static('./public'))


app.listen(80, () => {
    console.log('express server running at http://127.0.0.1')
})