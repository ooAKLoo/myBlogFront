// HomePage.js
import React from 'react';
import MainContent from './maincontent/MainContent'; // 确保路径正确
// import Footer from './footer/Footer'; // 确保路径正确
// import Header from './header/Header';
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <MainContent />
      </div>
    </div>
  );
}
