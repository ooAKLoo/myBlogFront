// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import HomePage from './HomePage';
import About from './about/About';
import Header from './header/Header';
import Footer from './footer/Footer';
import Blog from './blog/Blog';
import { messages } from './utils/messages'; // 确保这个路径正确

const App = () => {
  const language = window.location.pathname.split('/')[1] || 'en'; // 获取URL中的语言代码
  const currentMessages = messages[language] || messages.en; // 防止未定义的语言代码导致错误

  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <IntlProvider locale={language} messages={currentMessages}>
        <Header />
          <Routes>
          <Route path="/" element={<Navigate replace to="/en/" />} /> {/* 添加这行用于重定向 */}
            <Route path="/:lang/" element={<HomePage />} />
            <Route path="/:lang/about" element={<About />} />
            <Route path="/:lang/blog" element={<Blog />} />
            {/* 你可以根据需要添加更多路由 */}
          </Routes>
          <Footer />
        </IntlProvider>
      </div>
    </Router>
  );
};

export default App;


