var operateMysql = require('../mysql/index')
var express = require('express')
var router = express.Router()
function saveHandler(req, res, next) {
  const {json, path} = req.body
  const {tooken} = req.cookies
  operateMysql('select * from user where tooken=?', tooken, function (err, result1) {
    if (result1.length) {
      const {name} = result1[0]
      operateMysql('insert into apilist set ?', {json, path, name}, function (err, result2) {
        if (err) {
          res.send({code: 500, msg: '该路径已被占用'})
        } else {
          res.send({code: 200, msg: '插入成功'})
        }
      })
    }
  })
}
function registerHandler(req, res, next) {
  const {name, password} = req.body;
  operateMysql('select * from user where name=?', [name], function (err, result) {
    if (result.length) {
      res.send({code: -1, msg: '用户名已注册'})
    } else {
      const tooken = Math.random().toString(36).slice(2);
      operateMysql('insert into user set ?', {name, password, tooken}, function (err, result) {
        res.cookie('tooken', tooken, {maxAge: 9000000})
        res.status(200).send({code: 200, data: {user: {name}}, msg: ''})
      })
    }
  })
}
function loginHandler (req, res, next) {
  const {name, password} = req.body
  const {tooken} = req.cookies
  operateMysql('select * from user where name=? and password=?', [name, password], function (err, result) {
    if (err) {
      res.send(500, {code: 500, msg: 'err'})
    } else {
      if (result.length) {
        const newtooken = Math.random().toString(36).slice(2);
        operateMysql('update user set tooken=? where name=?', [newtooken, name], function (err, result2) {
          res.cookie('tooken', newtooken, {maxAge: 99999999})
          res.send({code: 200, data: result[0], msg: ''})
        })
      } else {
        res.send({code: 404, data: {}, msg: '用户名或密码错误'})
      }
    }
  })
}
function apiListHandler (req, res, next) {
  const {tooken} = req.cookies
  operateMysql('select * from user where tooken=?', [tooken], function (err, result) {
      if (result.length) {
        const {name} = result[0]
        operateMysql('select * from apilist where name=?', name, function (err, list) {
          const resData = list.map(function ({path, json}) {
            return {path, json}
          })
          res.status(200).send({code: 200, data: resData, msg: ''})
        })
      }
  })
}
function userInfoHandler (req, res, next) {
  const {tooken} = req.cookies
  operateMysql('select * from user where tooken=?', [tooken], function (err, result) {
    if (result.length) {
      const {name} = result[0]
      res.status(200).send({code: 200, data: {name}, msg: ''})
    } else {
      res.status(200).send({code: 404, data: {}, msg: '请重新登录'})
    }
  })
}
function editorHandler (req, res, next) {
  const {json, path} = req.body
  operateMysql('update apilist set json=? where path=?', [json, path],  function (err, result) {
    if (err) {
      res.send(200, {code: -1, msg: '操作失败'})
    } else {
      res.send(200, {code: 200, msg: '操作成功'})
    }
  })
}
function delHandler (req, res, next) {
  const {path} = req.body
  operateMysql('delete from apilist where path=?', [path], function (err, result) {
    if (err) {
      res.send(200, {code: -1, msg: '操作失败'})
    } else {
      res.send(200, {code: 200, msg: '操作成功'})
    }
  })
}

router.post('/saveapi', saveHandler)
router.post('/delapi', delHandler)
router.post('/editorapi', editorHandler)
router.post('/apilist', apiListHandler)
router.post('/register', registerHandler)
router.post('/login', loginHandler)
router.get('/userInfo', userInfoHandler)
module.exports = router
