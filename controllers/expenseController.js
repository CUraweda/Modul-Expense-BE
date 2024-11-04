import Expense from '../models/ExpenseModel.js';
import { Op } from 'sequelize';
import sequelize from 'sequelize';

export const addExpense = async(req,res) => {
    const { title, reporter, date, description, cost, type, category } = req.body;

    try {
        await Expense.create({
            title:title,
            reporter:reporter,
            date:date,
            description:description,
            cost:cost,
            type:type,
            category:category,
        });
        res.json({msg:"Pencatatan Berhasil Didata!"});
    } catch (error) {
        console.log(error);
    }
}


//unused script??//
// Fungsi untuk menambah pengeluaran
// export const addExpense = async (req, res) => {
//     const { title, date, description, cost, imageUrl, jenis, categoryId, userId } = req.body;
    
//     try {
//         // Validasi jika ada field yang kosong
//         if (!title || !date || !cost || !jenis || !categoryId || !userId) {
//             return res.status(400).json({ message: 'Mohon isi semua field yang dibutuhkan' });
//         }

        // Menambahkan data pengeluaran
//         const newExpense = await Expense.create({
//             title,
//             date,
//             description,
//             cost,
//             imageUrl,
//             jenis,
//             categoryId,
//             userId
//         });

//         res.status(201).json(newExpense);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };





// Fungsi untuk menampilkan semua pengeluaran
// export const getExpenses = async (req, res) => {
//     try {
//         const expenses = await Expense.findAll({
//             include: ['category', 'user'],  // Relasi dengan kategori dan user
//             order: [['date', 'DESC']]  // Urutkan berdasarkan tanggal terbaru
//         });
//         res.status(200).json(expenses);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const getExpenses = async(req, res) => {
    try {
        const expenses = await Expense.findAll({
            attributes:['title','date','type','category','cost','status'],
        });
        res.status(200).json(expenses);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

export const VerifyExpenses = async(req, res) => {
  try {
      const expenses = await Expense.findAll({
          attributes:['id','title','date','type','reporter','cost','status'],
      });
      res.status(200).json(expenses);
  } catch (error){
      res.status(500).json({ message: error.message });
  }
}

// Update status pada laporan pengeluaran
// Controller untuk memperbarui status dan komentar laporan
export const UpdateExpenseStatus = async (req, res) => {
  try {
    const { id, status, komentar } = req.body; // Ambil id dari body request

    // Update data pada database berdasarkan ID
    const updated = await Expense.update(
      { status: status, komentar: komentar },
      { where: { id: id } }
    );

    // Periksa apakah ada baris yang di-update
    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Laporan tidak ditemukan' });
    }

    res.status(200).json({ message: 'Status berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






// Fungsi untuk menampilkan total biaya pengeluaran
// export const getTotalExpenses = async (req, res) => {
//     try {
//         const total = await Expense.sum('cost');  // Menghitung total biaya
//         res.status(200).json({ total });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const getTotalExpenses = async (req, res) => {
  const { filter } = req.query;

  let whereClause = { status: 'Setuju' }; // Tambahkan filter status "Setuju"

  if (filter === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      whereClause.date = { [Op.gte]: today }; // Filter hari ini
  } else if (filter === 'lastWeek') {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      whereClause.date = { [Op.gte]: lastWeek }; // Filter minggu lalu
  } else if (filter === 'lastMonth') {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      whereClause.date = { [Op.gte]: lastMonth }; // Filter bulan lalu
  }

  try {
      const total = await Expense.sum('cost', { where: whereClause });
      res.status(200).json({ total });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Fungsi untuk menampilkan ringkasan pengeluaran bulanan
export const getExpensesSummary = async (req, res) => {
  const { year } = req.query; // Ambil tahun dari query parameter

  try {
      const expenses = await Expense.findAll({
          attributes: [
              [sequelize.fn('MONTH', sequelize.col('date')), 'month'], 
              [sequelize.fn('SUM', sequelize.col('cost')), 'totalCost'], 
          ],
          where: {
              date: {
                  [Op.between]: [new Date(`${year}-01-01`), new Date(`${year}-12-31`)], 
              },
              status: 'Setuju' // Tambahkan kondisi status "Setuju"
          },
          group: [sequelize.fn('MONTH', sequelize.col('date'))],
          order: [[sequelize.fn('MONTH', sequelize.col('date')), 'ASC']],
      });
      
      console.log(expenses); // Tambahkan log ini untuk melihat hasil query

      // Format response untuk Chart.js
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      const data = Array(12).fill(0); // Array untuk biaya per bulan

      // Isi data berdasarkan hasil dari query
      expenses.forEach((expense) => {
          const monthIndex = expense.dataValues.month - 1;
          data[monthIndex] = expense.dataValues.totalCost;
      });

      res.status(200).json({
          months,
          costs: data
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
