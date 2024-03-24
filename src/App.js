// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import HomePage from './HomePage';
import About from './about/About';
import Header from './header/Header';
import Footer from './footer/Footer';
import Blog from './blog/Blog';
import { messages } from './utils/messages'; // 确保这个路径正确
import ScrollToTop from './utils/ScrollToTop';
import BlogDetail from './blog/BlogDetail';
import { AuthProvider,useAuth } from './AuthContext';
import LoginPage from './admin/LoginPage';
import AdminPage from './admin/AdminPage';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const language = window.location.pathname.split('/')[1] || 'en'; // 获取URL中的语言代码
  const currentMessages = messages[language] || messages.en; // 防止未定义的语言代码导致错误

  return (
    <Router>
         <AuthProvider> 
      <ScrollToTop />
      <div className="App">
        <IntlProvider locale={language} messages={currentMessages}>
          <Header />
          <Routes>
          <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
              {/* 保持公开页面的路由不变 */}
            <Route path="/" element={<Navigate replace to={`/${language}/`} />} /> {/* 添加这行用于重定向 */}
            <Route path="/:lang/" element={<HomePage />} />
            <Route path="/:lang/about" element={<About />} />
            <Route path="/:lang/blog" element={<Blog />} />
            <Route path="/:lang/blog/:id" element={<BlogDetail />} />
            {/* 你可以根据需要添加更多路由 */}
          </Routes>
          <Footer />
        </IntlProvider>
      </div>
      </AuthProvider>
    </Router>
  );
};

export default App;


