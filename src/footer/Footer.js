import React from 'react';
import { useIntl } from 'react-intl';
import tiktokIcon from '../assets/icons/tiktok.png';
import youtubeIcon from '../assets/icons/youtube.png';
import xiaohongshuIcon from '../assets/icons/xiaohongshu.png';
import bilibiliIcon from '../assets/icons/bilibili.png';
import github from '../assets/icons/github.png'
const Icon = ({ src, alt, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity duration-150">
    <img src={src} alt={alt} className="h-6 w-6" />
  </a>
);

const Footer = () => {
  const intl = useIntl();

  return (
    <footer className="w-full bg-white text-gray-700 p-8">
      <div className="flex flex-wrap justify-between">
        <div className="w-full flex flex-col items-left justify-center lg:w-2/3 mb-4 lg:mb-0  lg:text-left">
          <h2 className="text-2xl font-semibold mb-4">
            {intl.formatMessage({ id: 'footerTitle' })}
          </h2>
          <p className="mb-4 text-sm">
            {intl.formatMessage({ id: 'footerDescription' })}
          </p>
          <div className="flex justify-center lg:justify-start items-center">
            <input
              type="email"
              placeholder="E-mail"
              className="p-2 mr-4 rounded-md bg-slate-100 text-gray-700 focus:outline-none focus:border-none w-full lg:w-auto"
            />
            <button className="bg-white hover:bg-slate-100 hover:border-transparent text-gray-700 rounded-full p-2 border border-slate-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div className="w-full bg-slate-100 rounded-xl lg:w-1/3 flex flex-col items-center justify-center py-8 lg:py-0">
          <div className="flex space-x-5 text-gray-500 mb-4">
            <Icon src={tiktokIcon} alt="TikTok" link="https://www.tiktok.com/@user5757841605063" />
            <Icon src={youtubeIcon} alt="YouTube" link="https://www.youtube.com/channel/UCRCjs622BRMHknf4Cg0czTw" />
            <Icon src={xiaohongshuIcon} alt="Xiaohongshu" link="https://www.xiaohongshu.com/user/profile/5e4125ff00000000010064fd" />
            <Icon src={bilibiliIcon} alt="Bilibili" link="https://space.bilibili.com/22541325/video" />
            <Icon src={github} alt="Bilibili" link="https://github.com/ooAKLoo" />
          </div>
          <p className="text-xs">
            {intl.formatMessage({ id: 'footerCopyright' })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
