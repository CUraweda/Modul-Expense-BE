import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','username','nama','role']
        });
        res.json(users);
    } catch (error){
        console.log(error);
    }
}

export const Register = async (req, res) => {
    console.log(req.body);
    const { username, nama, role, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password tidak cocok" });
  
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
  
    try {
      // Memastikan bahwa username unik sebelum menambah pengguna
      const existingUser = await Users.findOne({ where: { username } });
      if (existingUser) return res.status(400).json({ msg: "Username sudah ada" });
  
      // Menyimpan pengguna ke database
      await Users.create({
        username,
        nama,
        role,
        password: hashPassword,
      });
  
      res.status(201).json({ msg: "Registrasi Berhasil!" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ msg: "Gagal menambahkan pengguna" });
    }
  };
  

export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                username: req.body.username
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg:"Password salah"});
        const userId= user[0].id;
        const username= user[0].username;
        const nama= user[0].nama;
        const role= user[0].role;
        const accessToken = jwt.sign({userId,username,nama,role}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '1h'
        });
        const refreshToken = jwt.sign({userId,username,nama,role}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token:refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000
            // secure:true
        });
        res.json({ accessToken, username, role });
    } catch (error) {
        res.status(404).json({msg:"Username tidak ditemukan"});
    }
}

export const Logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(204); // Tidak ada refreshToken, tidak ada yang perlu dihapus

        // Cari user berdasarkan refresh_token
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });

        if (!user) return res.sendStatus(204); // Tidak ada user dengan refresh token ini, sudah logout

        // Hapus refresh_token di database
        await Users.update({ refresh_token: null }, { where: { id: user.id } });

        // Hapus cookie refreshToken
        res.clearCookie('refreshToken');

        return res.sendStatus(200); // Berhasil logout
    } catch (error) {
        console.error('Logout Error:', error);
        return res.sendStatus(500); // Error pada server
    }
};

// Fungsi untuk menghapus pengguna
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Users.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

        await user.destroy();
        res.status(200).json({ message: 'User berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fungsi untuk memperbarui pengguna
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, nama, role, password } = req.body;

    try {
        const user = await Users.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

        user.username = username || user.username;
        user.nama = nama || user.nama;
        user.role = role || user.role;
        if (password) user.password = password;

        await user.save();
        res.status(200).json({ message: 'User berhasil diperbarui', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
