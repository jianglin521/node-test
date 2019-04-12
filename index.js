var express = require("express");
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser'); // 用于处理 JSON, Raw, Text 和 URL 编码的数据。

app.use(bodyParser.json({limit: '1mb'}));  // 这里指定参数使用 json 格式
app.use(bodyParser.urlencoded({
  extended: true
}));

var connection = mysql.createConnection({ // 连接数据库的配置
  host: 'localhost', // 主机名称，一般是本机
  port: '3306', // 数据库的端口号，如果不设置，默认是3306
  user: 'root', // 创建数据库时设置用户名
  password: '123456', // 创建数据库时设置的密码
  database: 'express' // 创建的数据库
});

/*与数据库建立连接*/
connection.connect();

/*查询数据*/
app.get('/index', function (req, res) {
  // 获取get请求参数
  var params = req.query
  console.log(params,"params");
  // 查询语句
  var sql = 'select * from userinfo  where name= ? and age=?'
  var where_value = [params.name, params.age];
  console.log(where_value,"where_value");
  connection.query(sql, where_value, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]:', err.message);
    }
    console.log(result,"result");
    res.send(result) // 数据库查询结果返回到result中,把查询数据发送到客户端
  });
})

/*增加数据*/
app.post('/add', function (req, res) {
  // 查询参数解析
  var post = req.body
  // 查询语句
  var sql = 'insert into userinfo set name=? , age=?'
  var add_value = [post.name, post.age]
  console.log(post,"新增加数据");
  connection.query(sql, add_value, function (err, result) {
    if (err) {
      console.log('新增数据失败');
      res.send('新增数据失败') // 失败
    }else{
      console.log("成功");
      res.send('成功') // 成功
    }
  });
})

/*修改数据*/
app.put('/update', function (req, res) {
  // 查询参数解析
  var update = req.body
  console.log(update,"update");
  var sql = 'update userinfo  set  name=? , age=?  where id=?'
  var update_value = [update.name, update.age, update.id]
  connection.query(sql, update_value, function (err, result) {
    if (err) {
      console.log('修改数据失败', err.message);
    }
    res.send('修改数据成功') //   响应内容 修改数据成功
  });
})

/*删除数据*/
app.delete('/delete', function (req, res) {
  var del = req.query
  console.log(del,"del");
  var sql = 'delete from userinfo  where id= ?'
  var where_value = [del.id];
  connection.query(sql, where_value, function (err, result) {
    if (err) {
      console.log('删除失败', err.message);
      res.send('删除失败')
    }else{
      console.log('删除成功');
      res.send('删除成功')
    }
  });
})

app.listen(3000, function () {
  console.log('http://localhost:3000')
})

