import React, { useState, useEffect } from 'react';
import NewsList from './NewsList';
import './App.css';

const App = () => {
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/berita')
      .then(response => response.json())
      .then(data => {
        console.log('Data fetched from API:', data);
        setNewsData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNews = newsData.filter(news => {
    const judul = news.judul_berita ? news.judul_berita.toLowerCase() : '';
    const kategori = news.jenis_berita ? news.jenis_berita.toLowerCase() : '';
    const deskripsi = news.ringkasan ? news.ringkasan.toLowerCase() : '';
    const keywords = news.keywords ? news.keywords.toLowerCase().split(',') : [];

    const search = searchTerm.toLowerCase();

    return (
      judul.includes(search) ||
      kategori.includes(search) ||
      deskripsi.includes(search) ||
      keywords.some(keyword => keyword.includes(search))
    );
  });

  return (
    <div className="App">
      <h1>Daftar Berita</h1>
      <input
        type="text"
        placeholder="Cari berita..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <NewsList newsData={filteredNews} />
    </div>
  );
};

export default App;