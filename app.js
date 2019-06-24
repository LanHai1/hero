const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const port = 9999

// 数据
const db = require(path.join(__dirname, "./utils/dbs.js"))

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// 静态资源托管
.use(express.static('public'))

// 图片资源托管
.use(express.static('uploads'))

// 登陆
.post("/login", (req, res) => {
    const { username, password } = req.body
    if (username != "admin" || password != 123456) {
        res.json({
            msg: "用户名或密码错误",
            code: 400
        })
        return
    }
    res.json({
        msg: "登陆成功",
        code: 200
    })
})

// 英雄列表
.get("/list", (req, res) => {
    res.json({
        msg: "获取成功",
        code: 200,
        data: JSON.parse(db.getHeros())
    })
})

// 新增英雄
.post("/add", upload.single('icon'), (req, res) => {
    const { name, skill } = req.body
    const icon = `http://localhost:${port}/${req.file.filename}`
    const flag = db.addHero({ name, skill, icon })
    res.json({
        msg: flag ? "新增成功" : "参数错误",
        code: flag ? 201 : 400,
    })
})

// 删除英雄
.get("/delete", (req, res) => {
    const flag = db.deleteHero(req.query.id)
    res.json({
        msg: flag ? "删除成功" : "参数错误",
        code: flag ? 202 : 400,
    })
})

// 英雄查询
.get("/search", (req, res) => {
    const data = db.searchByIDHero(req.query.id)
    if (data) {
        res.json({
            msg: "查询成功",
            code: 200,
            data
        })
        return
    }
    res.json({
        msg: "参数错误",
        code: 400,
    })
})

// 英雄编辑
.post("/edit", upload.single('icon'), (req, res) => {
    const { id, name, skill } = req.body
    const icon = req.body.icon || `http://localhost:${port}/${req.file.filename}`
    const flag = db.updateHero({ id, name, skill, icon })
    res.json({
        msg: flag ? "修改成功" : "参数错误",
        code: flag ? 203 : 400,
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}/login.html`)
})