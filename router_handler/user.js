
const db = require('../db/index')  // 导入mysql模块
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') // 导入生成token的包
const config = require('../config') // 导入全局配置文件
const fs = require('fs')
const { userInfo } = require('os')
const { dirname } = require('path')


// 访问首页的处理函数
exports.index = (req, res) => {
    console.log('用户访问首页！')
    fs.readFile('./views/index.html', (err, data) => {
        if(err) {
            return res.send({status: 1, msg: '读取文件失败'})
        }
        else {
            return res.send(data.toString())
        }
    })
}


// 注册用户的处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body

    if(!userinfo.username || !userinfo.password) {
        return res.send({status: 1, msg: '用户名或密码不能为空！'})
    }

    // 查询
    const sql = 'select * from blog_users where username= ?'
    db.query(sql, [userinfo.username], (err, results) => {
        // 执行sql语句失败
        if(err) {
            return res.send({status: 1, msg: err.message})
        }
        // 用户名已被占用
        if(results.length > 0) {
            return res.send({status: 1, msg: '用户名已被占用，请更换其他用户名！'})
        }
    })

    // 验证二次密码是否一致
    if(userinfo.password !== userinfo.repassword) {
        return res.send({status: 1, msg: '请再次确认密码！'})
    }

    // 用bcrypt对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    userinfo.repassword = userinfo.password
    console.log(userinfo)

    // 插入
    const sqlStr = 'insert into blog_users set ?'
    db.query(sqlStr, {username: userinfo.username, password: userinfo.password}, (err, results) => {
        if(err) {
            return res.send({status: 1, msg: err.message})
        }
        if(results.affectedRows !==1) {
            return res.send({status: 1, msg: '注册用户失败，请稍后再试！'})
        }
        else {
            console.log('用户注册成功！')
            res.send({status: 0, msg: '注册成功！'})
        }
    })
}



// 登录的处理函数
exports.login = (req, res) => {
    const userinfo = req.body

    if(!userinfo.username || !userinfo.password) {
        return res.send({status: 1, msg: '用户名或密码不能为空！'})
    }

    // 查询
    const sql = 'select * from blog_users where username = ?'
    db.query(sql, [userinfo.username], (err, results) => {
        if(err) {
            return res.send({status: 1, msg: err.message})
        }
        if(results.length !== 1) {
            return res.send({status: 1, msg: '用户不存在！'})
        }

        // 验证
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) {
            return res.send({ status: 1, msg: '登录失败！' })
        }

        // JWT（生成token）
        const user = {...results[0], password:''}  // 剔除密码的信息
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expire})
        console.log('用户登录成功！')
        res.send({
            status: 0,
            msg: '登录成功！',
            token: 'Bearer ' + tokenStr,
        })
    })
}
