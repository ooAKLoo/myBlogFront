// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './HomePage';
// import About from './about/About';
// import Header from './header/Header';
// import Footer from './footer/Footer';
// import Blog from './blog/Blog';
// function App() {
//   return (
//     <Router>
//       <div className="App">
//       <Header />
//         <Routes>
//           <Route exact path="/" element={<HomePage />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/blog" element={<Blog />} />
//           {/* 如果有其他路由，也可以在这里添加 */}
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }


// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import About from './about/About';
import Header from './header/Header';
import Footer from './footer/Footer';
import Blog from './blog/Blog';

function App() {
  // 定义语言状态，默认为英语
  const [language, setLanguage] = useState('en');

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          {/* 动态捕获语言代码的路由 */}
          <Route path="/:lang/" element={<HomePage setLanguage={setLanguage} />} />
          <Route path="/:lang/about" element={<About setLanguage={setLanguage} />} />
          <Route path="/:lang/blog" element={<Blog setLanguage={setLanguage} />} />
          {/* 如果有其他路由，也可以在这里添加 */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;