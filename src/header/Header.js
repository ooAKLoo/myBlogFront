// Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../assets/logo.svg'; // 确保 logo 图片在 src/assets 目录下

const emojis = ['^_^', '^o^', '^ω^', '∩_∩','>▽<']; // 定义不同的表情符号

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [emoji, setEmoji] = useState(emojis[0]); // 默认显示第一个表情

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const contentHeight = docHeight - winHeight;
      const scrollRatio = offset / contentHeight;
      const emojiIndex = Math.min(Math.floor(scrollRatio * emojis.length), emojis.length - 1);

      setIsScrolled(offset > 80);
      setEmoji(emojis[emojiIndex]);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`w-full sticky  top-0 z-50 p-6 flex items-center justify-between transition duration-300 ${isScrolled ? 'bg-transparent backdrop-blur-md' : 'bg-white shadow-lg' }`}>
      <div className="flex justify-start">
        <img src={logo} alt="Logo" className="h-4 sm:h-8 mr-4" />
      </div>
  <nav className="absolute text-xl font-semibold left-1/2 transform -translate-x-1/2">
        <Link to="/" className="text-black px-4 hover:text-slate-200 transition duration-300">Home</Link>
        <Link to="/blog" className="text-black px-4 hover:text-slate-200 transition duration-300">Blog</Link>
        <Link to="/about" className="text-black px-4 hover:text-slate-200 transition duration-300">About</Link>
      </nav>
      <div className="flex justify-end">
        {emoji} {/* 显示当前的表情符号 */}
      </div>
    </div>
  );
};

export default Header;
