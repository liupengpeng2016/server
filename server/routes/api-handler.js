var operateMysql = require('../mysql/index.js')
module.exports = function (req, res, next) {
  const {url} = req
  operateMysql('select * from apilist where path=?', url, function (err, result) {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Headers': 'x-requested-with, content-type'
    })
    if (result.length) {
      let json;
      try {
        json = result[0].json
          .replace(/\u21b5\s*/g, '')
          .replace(/('|")?\s*([^'"{}:,\s]+)\s*('|")?/g, '"$2"')
        json = JSON.parse(json)
      } catch (err) {
        json = result[0].json
      }
      res.send(json)
    } else {
      next()
    }
  })
}
