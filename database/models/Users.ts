const Sequelize = require("sequelize");
const db = require("../config/config");

const Users = db.define("user", {
    id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
});
export default Users;
