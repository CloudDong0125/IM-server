var dbserver = require('../data/dbserver.js');

// 用户注册
exports.buildUser = async function(req, res) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    console.log(name, pwd, 'signup');

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

    try {
        // 检查用户名是否已经存在
        const existingUser = await dbserver.findUserByName(name);
        if (existingUser) {
            return res.status(400).send({
                code: 1,
                msg: '用户名已存在'
            });
        }

        // 调用 dbserver.buildUser 处理注册
        const success = await dbserver.buildUser(userData);
        if (success) {
            res.status(200).send({
                code: 0,
                msg: '注册成功'
            });
        } else {
            console.error('注册失败，但未返回错误信息');
            res.status(500).send({
                code: 1,
                msg: '服务器错误，注册失败'
            });
        }
    } catch (error) {
        console.error('注册失败:', error);
        res.status(500).send({
            code: 1,
            msg: '注册失败'
        });
    }
}

