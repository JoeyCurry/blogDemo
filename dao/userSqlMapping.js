/**
 * CRUD SQL基本语句
 */

var user = {
    insert:'INSERT INTO user(user_id, user_name, password,deleted,register_time,nickname) VALUES (?,?,?,?,?,?)',
    update_name:'update user set user_name=?',
    delete:'update user set deleted = true',
    queryLastPk:'SELECT pk FROM user order by pk desc',
    queryById:'select * from user where user_id=?',
    queryAll:'select * from user'
}

module.exports = user;
