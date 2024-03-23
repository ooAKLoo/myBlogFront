import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import logo from '../assets/logo.svg';
import searchIcon from '../assets/search.svg'; // 确保有搜索图标的图片

const emojis = ['^_^', '^o^', '^ω^', '∩_∩', '>▽<'];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [emoji, setEmoji] = useState(emojis[0]);
  const [showSearchInput, setShowSearchInput] = useState(false); // 新状态用于控制搜索输入框的显示
  const intl = useIntl();
  const location = useLocation();
  const languageCode = window.location.pathname.split('/')[1] || 'en';
  const searchInputRef = useRef(null); // 用于引用搜索输入框的DOM节点

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

    // 监听全局点击事件，用于判断点击是否发生在输入框外部
    const handleClickOutside = (event) => {
      if (showSearchInput && searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSearchInput(false); // 如果点击发生在输入框外部，则隐藏搜索输入框
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchInput]);

  const isBlogPage = location.pathname.includes(`/${languageCode}/blog`);

  // 处理搜索图标点击事件
  const handleSearchIconClick = () => {
    setShowSearchInput(true); // 显示搜索输入框
  };

  return (
    <div className={`w-full sticky top-0 z-50 p-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-transparent backdrop-blur-md' : 'bg-white shadow-lg'}`} style={{ height: '6vh' }}>
      <div className={`absolute w-full flex justify-center items-center transition-all duration-500 ease-out ${showSearchInput ? 'top-6 opacity-100' : '-top-full opacity-0'}`} style={{ transitionProperty: 'top, opacity', zIndex: showSearchInput ? 10 : -1 }}>
        <
          input ref={searchInputRef} type="text" className="form-input w-full text-base md:text-xl font-semibold focus:outline-none"
          placeholder={'$ grep . . . ' }
        />
      </div>
      <div className={`flex justify-between w-full ${showSearchInput ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 ease-out`}>
        <div className="flex justify-start">
          <img src={logo} alt="Logo" className="h-4 sm:h-8 mr-4" />
        </div>
        <nav className="text-base md:text-xl font-semibold">
          <Link to={`/${languageCode}`} className="text-black px-4 hover:text-slate-200 transition duration-300">
            {intl.formatMessage({ id: 'home' })}
          </Link>
          <Link to={`/${languageCode}/blog`} className="text-black px-4 hover:text-slate-200 transition duration-300">
            {intl.formatMessage({ id: 'blog' })}
          </Link>
          <Link to={`/${languageCode}/about`} className="text-black px-4 hover:text-slate-200 transition duration-300">
            {intl.formatMessage({ id: 'about' })}
          </Link>
        </nav>
        <div className="flex justify-end items-center">
          {isBlogPage ? <img src={searchIcon} alt="Search" className="h-4 sm:h-6 cursor-pointer" onClick={handleSearchIconClick} /> : emoji}
        </div>
      </div>
    </div>
  );


};

export default Header;
