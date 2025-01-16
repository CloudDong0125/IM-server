var dbmodel = require('../model/dbmodel');
// var User = dbmodel.model('User');
var User = dbmodel.User;

module.exports = {
  findUserByName: async function (name) {
    console.log(name);
    try {
      return await User.findOne({ name: name });
    } catch (error) {
      console.error('Error finding user by name:', error);
      throw error;
    }
  },
  buildUser: async function (userData) {
    if (!userData.name || userData.name === null || userData.name.trim() === '') {
      throw new Error('用户名不能为空');
    }

    // 确保 username 不为 null
    if (userData.name === null) {
      throw new Error('用户名不能为 null');
    }

    const existingUser = await this.findUserByName(userData.name);
    if (existingUser) {
      throw new Error('用户名已存在');
    }

    const newUser = new User(userData);
    try {
      return await newUser.save();
    } catch (error) {
      console.error('Error saving new user:', error);
      throw error;
    }
  }
};

