const Sequelize = require("sequelize");
const db = require("../config/config");

const Admin = db.define("admin", {
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        freezeTableName: true
    }
);
export default Admin
