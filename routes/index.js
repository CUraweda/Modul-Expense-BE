import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
//expense//
import { addExpense, getExpenses, getTotalExpenses, getExpensesSummary, VerifyExpenses , UpdateExpenseStatus } from '../controllers/expenseController.js';

const router = express.Router();

router.get('/users',getUsers);
router.post('/users',Register);
router.post('/login',Login);
router.get('/token',refreshToken);
router.delete('/logout',Logout);

//expense//
// Tambahkan verifyToken untuk otorisasi
router.post('/expenses',addExpense);
router.get('/expenses', getExpenses);
router.get('/expenses/verif', VerifyExpenses);
router.get('/expenses/total', getTotalExpenses);
router.get('/expenses/summary', getExpensesSummary);
// Tambahkan route baru untuk update status
router.put('/expenses/update-status', UpdateExpenseStatus);


export default router;