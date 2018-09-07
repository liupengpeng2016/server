var operateMysql = require('../mysql/index.js')
module.exports = function (req, res, next) {
  const {url} = req
  console.log(url)
  operateMysql('select * from apilist where path=?', url, function (err, result) {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Headers': 'x-requested-with, content-type'
    })
    if (err) console.log(err)
    if (result.length) {
      let json = result[0].json;
      try {
        json = JSON.parse(json)
      } catch (err) {
        try {
          json = json
            .replace(/\s*\u21b5\s*/g, '')
            .replace(/('|")([^'"]+)('|")/g, '"$2"')
          json = JSON.parse(json)
        } catch (err) {
          json = result[0].json
        }
      }
      res.send(json)
    } else {
      res.send('未找到对应页面或接口！')
    }
  })
}
