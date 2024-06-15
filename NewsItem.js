// NewsList.js
import React from 'react';
import NewsItem from './NewsItem';

const NewsList = ({ newsData }) => {
  return (
    <div className="news-list">
      {newsData.map(news => (
        <NewsItem
          key={news.id_berita} // pastikan ada properti id_berita yang unik di setiap berita
          title={news.judul_berita}
          category={news.jenis_berita}
          description={news.ringkasan}
          keywords={news.keywords ? news.keywords.split(',') : []}
        />
      ))}
    </div>
  );
};

export default NewsList;