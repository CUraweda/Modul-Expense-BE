import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // Memastikan token ada dan mengikuti skema 'Bearer'
    const token = authHeader && authHeader.startsWith('Bearer ') && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);  // Jika tidak ada token, kembalikan status 401 Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);  // Jika token tidak valid, kembalikan status 403 Forbidden
        
        // Menyimpan informasi penting dari token ke dalam request untuk digunakan pada middleware selanjutnya
        req.userId = decoded.userId;  // Pastikan token menyimpan 'userId'
        req.username = decoded.username;  // Menyimpan username juga jika diperlukan
        
        next();  // Lanjutkan ke middleware berikutnya
    });
};
