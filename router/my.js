// 创建路由对象
const express = require('express')
const router = express.Router()
const myHandler = require('../router_handler/my')

// 访问博客页面
router.get('/homepage', myHandler.myblog)

// 评论表单提交
router.post('/comment', myHandler.mycomment)

module.exports = router