var mysql = require('mysql')
var pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  database: 'person',
  user: 'root',
  password: 'root'
})
module.exports = function operateMysql (mysqlStr, params, callback) {
  pool.getConnection(function (err, connection) {
    connection.query(mysqlStr, params, function (err, result) {
      if (err) {
        console.log(err)
      }
      callback && callback(err, result)
      connection.release()
    })
  })
}
