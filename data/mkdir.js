const fs = require('fs').promises;
const path = require('path');

// 动态的生成文件夹
async function mkdirs(dirname) {
    
    try {
        await fs.mkdir(dirname, { recursive: true });
        console.log('文件夹创建成功');
    } catch (err) {
        console.error('创建文件夹时出错:', err);
    }
}

module.exports = mkdirs;
 