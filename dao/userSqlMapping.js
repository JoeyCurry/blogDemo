/**
 * CRUD SQL基本语句
 */

var user = {
    insert:'INSERT INTO user(user_id, user_name, password,deleted,register_time) VALUES (?,?,?,?,?)',
    update_name:'update user set user_name=?',
    delete:'update user set deleted = true',
    queryLastPk:'select pk from user',
    queryById:'select * from user where user_id=?',
    queryAll:'select * from user'
}

module.exports = user;
