const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Buat koneksi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myprofile'
});

// Connect ke database
db.connect(err => {
    if (err) {
        console.error('Kesalahan koneksi database:', err.stack);
        return;
    }
    console.log('Terhubung ke database.');
});

// Endpoint untuk mendapatkan semua berita
app.get('/', (req, res) => {
    const sql = 'SELECT id_berita, judul_berita, ringkasan, keywords, nama_kategori FROM berita INNER JOIN kategori ON berita.id_kategori = kategori.id_kategori';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Kesalahan kueri database:', err);
            res.status(500).json({ error: 'Kesalahan Server Internal' });
            return;
        }
        res.json(results);
    });
});

// Endpoint untuk favicon.ico
app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // No content response for favicon.ico
});

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});

module.exports = app;
