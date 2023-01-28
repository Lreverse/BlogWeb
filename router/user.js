// 创建路由对象
const express = require('express')
const router = express.Router()
const userHandler = require('../router_handler/user')

// 访问首页
router.get('/', userHandler.index)

// 注册
router.post('/register', userHandler.regUser)

// 登录
router.post('/login', userHandler.login)


module.exports = router