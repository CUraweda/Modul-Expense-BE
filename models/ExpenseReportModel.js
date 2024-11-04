import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from './UserModel.js'; // Import User model untuk relasi
import Expense from './ExpenseModel.js'; // Import Expense model untuk relasi

const { DataTypes } = Sequelize;

const ExpenseReport = db.define('expenseReport', {
    totalAmount: {
        type: DataTypes.DECIMAL,
        defaultValue: 0.0
    }
}, {
    freezeTableName: true
});

// Relasi antara ExpenseReport dan Users
ExpenseReport.belongsTo(Users, { foreignKey: 'userId' });  // Laporan terkait dengan user
ExpenseReport.hasMany(Expense, { foreignKey: 'reportId' });  // Laporan bisa punya banyak pengeluaran

export default ExpenseReport;
