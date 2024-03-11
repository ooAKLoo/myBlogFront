import React, { useState } from 'react';
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
  const [email, setEmail] = useState(''); // 用于存储输入的Email
  const intl = useIntl();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isloading, setIsLoading] = useState(false);

  // 更新Email状态
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // 验证Email格式
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // 将 uploadEmail 函数包装以包含防抖
  const debouncedUploadEmail = () => {

    if (!validateEmail(email)) {
      alert(intl.formatMessage({ id: 'invalidEmailError', defaultMessage: 'Please enter a valid email address.' }));
      return
    }
    setIsLoading(true)
    setIsSubmitting(true);
    uploadEmail() // 确保 uploadEmail 返回一个 Promise
      .then(() => {
        setIsLoading(false)
        // 成功后，等待5秒再恢复按钮状态
        setTimeout(() => {
          setIsSubmitting(false);
        }, 2000);
      })
      .catch(() => {
        setIsLoading(false)
        // 出现错误也等待5秒再恢复按钮状态
        setTimeout(() => {
          setIsSubmitting(false);
        }, 2000);
      });
  };



  // 上传Email到OBS
  const uploadEmail = () => {
    // 构造对象名，这里用Email地址作为文件名，并且确保它是URL安全的
    const objectName = encodeURIComponent(email);

    // 完整的预签名URL，包括对象名
    const preSignedUrl = `https://dongju-email.obs.cn-north-4.myhuaweicloud.com/${objectName}`;

    // 显式返回 fetch 调用的 Promise
    return fetch(preSignedUrl, {
      method: 'PUT',
      body: JSON.stringify({ email: email }),
    })
      .then(response => {
        if (response.ok) {
          alert(intl.formatMessage({ id: 'emailUploadSuccess', defaultMessage: 'Email uploaded successfully!' }));
          return Promise.resolve(); // 显式返回响应以保持链条的完整
        } else {
          // 使用 Promise.reject 来处理错误情况
          return response.text().then(text => Promise.reject(new Error(text)));
        }
      })
      .catch((error) => {
        alert(intl.formatMessage({ id: 'emailUploadError', defaultMessage: 'An error occurred while uploading the email.' }));
        // 抛出错误或返回拒绝的 Promise，以便可以在调用链的更高层处理错误
        return Promise.reject(error);
      });
  };



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
              value={email}
              onChange={handleEmailChange}
            />
            <button
              className={`bg-white ${isSubmitting ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:bg-slate-100 hover:border-transparent'} text-gray-700 rounded-full p-2 border ${isSubmitting ? 'border-gray-200' : 'border-slate-300'} ${isloading ? ' animate-spin' : ''}`}
              onClick={debouncedUploadEmail}
              disabled={isSubmitting} // 在提交期间禁用按钮
            >
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
