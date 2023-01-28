
const db = require('../db/index')  // 导入mysql模块
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') // 导入生成token的包
const config = require('../config') // 导入全局配置文件
const fs = require('fs')
const { userInfo } = require('os')
const { dirname } = require('path')

// 访问博客页面的处理函数
exports.myblog = (req, res) => {
    console.log('用户访问博客页面！')
    fs.readFile('./views/my/homepage.html', (err, data) => {
        if(err) {
            return res.send({status: 1, msg: '读取文件失败'})
        }
        else {
            return res.send(data.toString())
        }
    })
}

// 评论表单的处理函数
exports.mycomment = (req, res) => {
    const userinfo = req.body
    const id = req.auth.id
    console.log(userinfo)
    // console.log(req.auth)  // 解析token后得到的数据
    const sql = 'update blog_users set comment=?, comment_date=? where id = ?'
    db.query(sql, [userinfo.message, userinfo.date, id], (err, results) => {
        if(err) {
            return res.send({status: 1, msg: err.message})
        }
        if(results.affectedRows !== 1) {
            return res.send({status: 1, msg: '评论失败！'})
        }
        console.log('用户评论成功！')
        res.send({status: 0, msg: '评论成功！'})
    })
}