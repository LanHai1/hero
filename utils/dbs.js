// 数据操作
const fs = require('fs')
const path = require('path')

// 文件路径
const pathFile = path.join(__dirname, "data", "hero.json")

const readFileHeros = () => fs.readFileSync(pathFile, "utf8")

module.exports = {
    // 获取所有的英雄数据
    getHeros() {
        // console.log(readFileHeros())
        // let list = JSON.parse(readFileHeros())
        // for (let i = 0; i < list.length; i++) {
        //     if (list[i].isDelete) {
        //         console.log(list[i])
        //         list[i] = JSON.parse(JSON.stringify(list[i]).splice(i, 1))
        //     }
        // }
        // 模版引擎处理删除
        return readFileHeros()
    },
    // 新增英雄
    addHero({ name, skill, icon }) {
        const list = JSON.parse(readFileHeros())
        list.unshift({
            id: JSON.parse(readFileHeros()).length + 1,
            name: name,
            skill,
            icon,
            "isDelete": false
        })

        // 保存数据
        if (!fs.writeFileSync(pathFile, JSON.stringify(list))) {
            return true
        } else {
            return false
        }
    },
    // 删除英雄
    deleteHero(id) {
        const list = JSON.parse(readFileHeros())
        let flag = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                list[i].isDelete = true
                flag = true
                break
            }
        }
        if (flag) {
            fs.writeFileSync(pathFile, JSON.stringify(list))
            return true
        }
        return false
    },
    // 查询一条英雄
    searchByIDHero(id) {
        const list = JSON.parse(readFileHeros())
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                return list[i]
            }
        }
        return false
    },
    // 修改英雄信息
    updateHero({ id, name, skill, icon }) {
        const list = JSON.parse(readFileHeros())
        let flag = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                list[i].name = name
                list[i].skill = skill
                list[i].icon = icon
                flag = true
                break
            }
        }
        if (flag) {
            fs.writeFileSync(pathFile, JSON.stringify(list))
            return true
        }
        return false
    }
}