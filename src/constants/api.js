const target= 'http://localhost:10055';
// const test = 'https://www.fastmock.site/mock/67fa6d4181628fd727a8a4c44d93dd5c/exam_system';

const APIS = {
    // 登录注册
    verificationCode: `${target}/users/createCode`,
    userRegister:`${target}/users/userRegister`,
    modifyUser: `${target}/users/updateUser`,
    login:`${target}/users/userLogin`,

    // 知识点管理
    getPoints: `${target}/point/selectPoint`,
    addPoint: `${target}/point/addPoint`,
    updatePoint: `${target}/point/updatePoint`,
    dropPoint: `${target}/point/dropPoint`,

    // 课程管理
    getSubjects: `${target}/subject/selectSubjectList`,
    addSubject: `${target}/subject/addSubject`,
    updateSubject: `${target}/subject/updateSubject`,
    dropSubject: `${target}/subject/dropSubject`,

    // 用户管理
    addUser: `${target}/userAdmin/adminAddUser`,
    getUser: `${target}/userAdmin/getUser`,
    forbidUser: `${target}/userAdmin/forbidUser`,
    getUserList:`${target}/userAdmin/getUserList`,

    // 题目管理
    addProblem: `${target}/problem/addProblem`,
    getProblemList: `${target}/problem/selectProblem`,
    viewProblem: `${target}/problem/viewProblem`,
    dropProblem: `${target}/problem/dropProblem`,
    modifyProblem: `${target}/problem/modifyProblem`,

    // 试卷管理
    automaticPaper: `${target}/paper/makePaper`,
    detailsPaper: `${target}/paper/paperDetails`,
    getpaperList: `${target}/paper/paperList`,
    dropPaper: `${target}/paper/dropPaper`,
    modifyPaper: `${target}/paper/modifyPaper`,

    // 首页
    home: `${target}/home/statistic`,
}
export default APIS;