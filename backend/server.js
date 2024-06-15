const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');
const express = require('express');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myprofile'
});

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Menghubungkan ke MySQL
db.connect(err => {
  if (err) {
    console.error('Kesalahan koneksi database:', err.stack);
    return;
  }
  console.log('Terhubung ke database.');
});

// Endpoint root untuk mengambil berita
app.get('/', (req, res) => {
  const sql = 'SELECT judul_berita, jenis_berita, ringkasan, keywords';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Kesalahan kueri database:', err);
      res.status(500).json({ error: 'Kesalahan Server Internal' });
      return;
    }
    res.json(results);
  });
});

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
