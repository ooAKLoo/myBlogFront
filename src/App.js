import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import About from './about/About';
import Header from './header/Header';
import Footer from './footer/Footer';
import Blog from './blog/Blog';
function App() {
  return (
    <Router>
      <div className="App">
      <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          {/* 如果有其他路由，也可以在这里添加 */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;