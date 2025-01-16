var dbserver = require('../data/dbserver.js');

// 登录
exports.login = async function(req, res) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    console.log(name, pwd,'login');
    // 检查 name 是否为空
    if (!name) {
        return res.status(400).send({
            code: 1,
            msg: '用户名不能为空'
        });
    }
    // 将 name 和 pwd 合并成一个对象
    var userData = {
        name: name,
        pwd: pwd
    };
    // 调用 dbserver 中的 userMatch 方法进行验证
    dbserver.userMatch(userData, res);
};

