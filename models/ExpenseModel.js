import { Sequelize } from "sequelize";
import db from "../config/database.js";
// import Users from './UserModel.js'; // Import User model untuk relasi
// import Category from './CategoryModel.js'; // Import Category model untuk relasi

const { DataTypes } = Sequelize;

const Expense = db.define('expense', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    cost: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    category: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Setuju', 'Ditolak'),
        defaultValue: 'Pending' // Nilai default
    },
    info: {
        type: DataTypes.TEXT, 
        allowNull: true
    },
    reporter: {
        type: DataTypes.STRING, 
        allowNull: true
    }
    
}, {
    freezeTableName: true
});



//unused script??//
// const Expense = db.define('expense', {
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     date: {
//         type: DataTypes.DATEONLY,
//         allowNull: false
//     },
//     description: {
//         type: DataTypes.TEXT,
//         allowNull: true
//     },
//     cost: {
//         type: DataTypes.DECIMAL,
//         allowNull: false
//     },
//     imageUrl: {
//         type: DataTypes.STRING, // Untuk menyimpan URL gambar (jika ada)
//         allowNull: true
//     }
// }, {
//     freezeTableName: true
// });

// Relasi antara Expense, Users, dan Category
// Expense.belongsTo(Users, { foreignKey: 'id' });  // Setiap pengeluaran terkait dengan user yang login
// Expense.belongsTo(Category, { foreignKey: 'id' });  // Setiap pengeluaran punya kategori

export default Expense;
