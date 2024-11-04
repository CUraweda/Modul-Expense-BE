import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/index.js";
import userRoutes from './routes/userRoutes.js';
// import Category from "./models/CategoryModel.js";
// import Expense from "./models/ExpenseModel.js";
// import ExpenseReport from "./models/ExpenseReportModel.js";
dotenv.config();
// import Users from "./models/UserModel.js";
const app = express();

try {
    await db.authenticate();
    console.log('Database Connected...');
    // await Users.sync();
    // await Category.sync();
    // await Expense.sync();
    // await ExpenseReport.sync();
} catch (error) {
    console.error(error);
}

app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(userRoutes);

app.listen(5000,()=>console.log('Server running at port 5000'));