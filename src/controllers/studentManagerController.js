const path = require('path');
//导出返回学生列表的页面
exports.getStudentListPage = (req, res) => {
    // res.send("orange cc hello")
    res.sendFile(path.join(__dirname,"../views/list.html"));
}